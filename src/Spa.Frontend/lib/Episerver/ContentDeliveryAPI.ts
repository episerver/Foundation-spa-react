import AppConfig from './AppConfig';
import IContent from './Models/IContent';
import ContentLink, { ContentReference, ContentLinkService } from './Models/ContentLink';
import ActionResponse, { ResponseType } from './Models/ActionResponse';
import WebsiteList from './Models/WebsiteList';
import Website from './Models/Website';
import PathProvider from './PathProvider';
import EpiContext from './Spa';
import Property from './Property';

export type PathResponse = IContent | ActionResponse<any>;

export interface NetworkErrorData extends IContent {
    error: Property<any>
}

export function PathResponseIsIContent(iContent: PathResponse) : iContent is IContent
{
    if ((iContent as ActionResponse<any>).actionName) {
        return false;
    }
    return true;
}

export default class ContentDeliveryAPI
{
    protected config: AppConfig = null;
    protected componentService: string = "/api/episerver/v2.0/content/";
    protected websiteService: string = "/api/episerver/v3/site/";
    protected methodService: string = "/api/episerver/v3/action/";
    protected pricingService: string = "/api/episerver/v2.0/pricing/";
    protected inventoryService: string = "/api/episerver/v2.0/inventory/";
    protected warehouseService: string = "/api/episerver/v2.0/warehouse/";
    protected debug: boolean = false;
    protected pathProvider: PathProvider = null;

    /**
     * Marker to keep if we're in edit mode
     */
    protected inEditMode: boolean = false;

    /**
     * Internal cache of the websites retrieved from the ContentDelivery API
     * 
     * @private
     */
    private websites: WebsiteList = null;

    /**
     * Internal cache of the current website, as retrieved from the ContentDelivery API
     * 
     * @private
     */
    private website: Website = null;

    constructor(pathProvider: PathProvider, config?: AppConfig)
    {
        this.pathProvider = pathProvider;
        this.config = config ? config : EpiContext.config();
        this.debug = this.config.enableDebug === true;
    }

    public isInEditMode() : boolean
    {
        return this.inEditMode;
    }

    public setInEditMode(editMode : boolean) : ContentDeliveryAPI
    {
        this.inEditMode = editMode === true;
        return this;
    }

    public isDisabled() : boolean
    {
        return this.config.noAjax === true
    }

    /**
     * Invoke an ASP.Net MVC controller method using the generic content API. This is intended
     * to be used only when attaching a SPA to an existing code-base.
     * 
     * @param content The content for which the controller must be loaded
     * @param method  The (case sensitive) method name to invoke on the controller
     * @param verb    The HTTP verb to use when invoking the controller
     * @param data    The data (if any) to send to the controller for the method
     */
    public async invokeControllerMethod(content: ContentLink, method: string, verb?: string, data?: object) : Promise<any>
    {
        let options : RequestInit = this.getRequestSettings(verb, data);
        return await this.doRequest<any>(this.getMethodServiceUrl(content, method), options);
    }

    /**
     * Strongly typed variant of invokeControllerMethod
     * 
     * @see   invokeControllerMethod()
     * @param content The content for which the controller must be loaded
     * @param method  The (case sensitive) method name to invoke on the controller
     * @param verb    The HTTP verb to use when invoking the controller
     * @param data    The data (if any) to send to the controller for the method
     */
    public async invokeTypedControllerMethod<TypeOut, TypeIn>(content: ContentLink, method: string, verb?: string, data?: TypeIn) : Promise<ActionResponse<TypeOut>>
    {
        let options : RequestInit = this.getRequestSettings(verb, data);
        return await this.doRequest<ActionResponse<TypeOut>>(this.getMethodServiceUrl(content, method), options);
    }

    /**
     * Retrieve a list of all websites registered within Episerver
     */
    public async getWebsites(): Promise<WebsiteList> {
        if (!this.websites) {
            this.websites = await this.doRequest<WebsiteList>(this.config.epiBaseUrl + this.websiteService);
        }
        return this.websites; 
    }

    /**
     * Retrieve the first website registered within Episerver
     */
    public async getWebsite() : Promise<Website> {
        const list = await this.getWebsites();
        return list[0];
    }
    
    public async getContent(content: ContentLink, forceGuid: boolean = false) : Promise<IContent>
    {
        if (!(content && (content.guidValue || content.url))) {
            if (this.config.enableDebug) {
                console.warn('Loading content for an empty reference ',content);
            }
            return null;
        }
        let useGuid = content.guidValue ? this.config.preferGuid || forceGuid : false;
        let serviceUrl : URL;
        if (useGuid) {
            serviceUrl = new URL(this.config.epiBaseUrl + this.componentService + content.guidValue);
        } else {
            try {
                serviceUrl = new URL(this.config.epiBaseUrl + (content.url ? content.url : this.componentService + ContentLinkService.createApiId(content)));
            } catch (e) {
                serviceUrl = new URL(this.config.epiBaseUrl + this.componentService + ContentLinkService.createApiId(content));
            }
        }
        serviceUrl.searchParams.append("currentPageUrl", this.pathProvider.getCurrentPath());
        if (this.config.autoExpandRequests) {
            serviceUrl.searchParams.append("expand", "*");
        }
        return this.doRequest<IContent>(serviceUrl.href).catch(r => { return this.buildNetworkError(r); });
    }

    public async getContentsByRefs(refs: Array<string>) : Promise<Array<IContent>>
    {
        if (!refs || refs.length == 0) {
            return Promise.resolve<Array<IContent>>([]);
        }
        let serviceUrl : URL = new URL(this.config.epiBaseUrl + this.componentService);
        serviceUrl.searchParams.append("references", refs.join(","));
        if (this.config.autoExpandRequests) {
            serviceUrl.searchParams.append("expand", "*");
        }
        return this.doRequest<Array<IContent>>(serviceUrl.href).catch(r => {return [];});
    }

    public async getContentByRef(ref: string): Promise<IContent>
    {
        let serviceUrl : URL = new URL(this.config.epiBaseUrl + this.componentService + ref);
        if (this.config.autoExpandRequests) {
            serviceUrl.searchParams.append("expand", "*");
        }
        return this.doRequest<IContent>(serviceUrl.href).catch(r => { return this.buildNetworkError(r); });
    }

    public async getContentByPath(path: string): Promise<PathResponse>
    {
        let serviceUrl : URL = new URL(this.config.epiBaseUrl + path);
        if (this.config.autoExpandRequests) {
            serviceUrl.searchParams.append("expand", "*");
        }
        serviceUrl.searchParams.append("currentPageUrl", this.pathProvider.getCurrentPath());
        return this.doRequest<PathResponse>(serviceUrl.href).catch(r => { return this.buildNetworkError(r, path); });
    }

    public async getContentChildren<T extends IContent>(id: ContentReference): Promise<Array<T>>
    {
        let itemId : string = ContentLinkService.createApiId(id);
        let serviceUrl : URL = new URL(this.config.epiBaseUrl + this.componentService + itemId + '/children');
        if (this.config.autoExpandRequests) {
            serviceUrl.searchParams.append("expand", "*");
        }
        return this.doRequest<Array<T>>(serviceUrl.href).catch(r => {return [];});
    }

    public async getContentAncestors(link: ContentReference) : Promise<Array<IContent>>
    {
        let itemId : string = ContentLinkService.createApiId(link);
        let serviceUrl : URL = new URL(`${ this.config.epiBaseUrl }${ this.componentService }${ itemId }/ancestors`);
        if (this.config.autoExpandRequests) {
            serviceUrl.searchParams.append("expand", "*");
        }
        return this.doRequest<Array<IContent>>(serviceUrl.href).catch(r => {return [];});
    }

    /**
     * Perform the actual request
     * 
     * @param url The URL to request the data from
     * @param options The Request options to use
     */
    protected async doRequest<T>(url: string, options?: RequestInit): Promise<T | undefined>
    {
        if (this.isDisabled()) {
            return null;
        }
        if (this.isInEditMode())
        {
            let urlObj = new URL(url);
            urlObj.searchParams.append('epieditmode','True');
            //Add channel...
            //Add project...
            urlObj.searchParams.append('preventCache', Math.round(Math.random() * 100000000).toString());
            url = urlObj.href
        }

        options = options ? options : this.getRequestSettings();
        if (this.debug) console.debug('Requesting: ' + url);
        const response : Response = await fetch(url, options).catch(reason => {
            if (this.debug) console.error(`Response from ${url}: HTTP Fetch error `, reason);
            return undefined;
        });
        if (!response.ok) {
            if (this.debug) console.error(`Response from ${url}: HTTP ${response.status}: ${response.statusText}`);
            return Promise.reject<any>(`HTTP ${response.status}: ${response.statusText}`);
        }
        if (this.debug) {
            let data : any = await response.json();
            if (this.debug) {
                console.debug(`Response from ${url}:`, data);
            }
            return data;
        }
        return response.json();
    }

    protected getMethodServiceUrl(content: ContentLink, method: string) : string
    {
        let contentUrl : string = this.config.epiBaseUrl;
        contentUrl = contentUrl + this.methodService;
        contentUrl = contentUrl + content.guidValue + "/" + method;
        return contentUrl;
    }

    protected getRequestSettings(verb?: string, data?: any) : RequestInit
    {
        let options: RequestInit = {
            method: verb ? verb : 'get',
            referrer: this.config.epiBaseUrl,
            mode: "cors",
            credentials: "include"
        }
        if (data) {
            options.body = JSON.stringify(data);
            options.headers = {
                ...this.getHeaders({
                    'Content-Type': 'application/json'
                })
            };
        } else {
            options.headers = {
                ...this.getHeaders()
            };
        }
        return options;
    }

    protected getHeaders(customHeaders?: object): object
    {
        let defaultHeaders = {
            'Accept': 'application/json',
            'Accept-Language': this.config.defaultLanguage, //@ToDo: Convert to context call, with default
        }
        if (!customHeaders) return defaultHeaders;

        return {
            ...defaultHeaders,
            ...customHeaders
        };
    }

    public static IsActionResponse(response: PathResponse) : response is ActionResponse<any>
    {
        if (response && (response as ActionResponse<any>).responseType && (response as ActionResponse<any>).responseType == ResponseType.ActionResult) {
            return true;
        }
        return false;
    }

    private counter : number = 0;

    protected buildNetworkError(reason: any, path: string = null) : NetworkErrorData
    {
        const errorId = ++this.counter;
        return {
            name: {
                propertyDataType: 'String', 
                value: 'Error'
            },
            contentType: ["Errors","NetworkError"],
            contentLink: {
                guidValue: null,
                id: errorId,
                providerName: 'ContentDeliveryAPI_Errors',
                url: path,
                workId: 0
            },
            error: {
                propertyDataType: "Unknown",
                value: reason
            }
        };
    }
}