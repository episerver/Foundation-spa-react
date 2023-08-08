import type { IContentDeliveryAPI, ContentRequest, ContentSearchResult, BaseType, RequestConfig, FetchRequest, IContentIfOther } from './icontent-delivery-api'
import type { Config } from './config'
import type { IContent, ContentReference, Website, WebsiteList, AuthResponse, AuthApiResponse, AuthRequest } from '../models'
import { OptiEndpoints, OptiQueryParams, buildUrl, inEditMode, OptiContentMode } from './util'
import { DefaultConfig, validateConfig } from './config'
import { Website as WebsiteUtils, ContentReference as ContentLinkService } from '../util'
import fetch from 'cross-fetch'
import { NetworkError } from './NetworkError'

export const OptiEditQueryParams = [ 
    OptiQueryParams.CommonDrafts, 
    OptiQueryParams.EditMode, 
    OptiQueryParams.Project, 
    OptiQueryParams.Channel, 
    OptiQueryParams.VisitorGroup
];

export const DefaultRequestConfig : RequestConfig = {
    addDefaultParams: true,
    timeOut: 5
}

export class ContentDeliveryAPI implements IContentDeliveryAPI
{

    protected readonly _config : Config
    protected readonly _baseUrl : URL
    protected readonly _frontendUrl: URL
    protected _accessToken ?: string
    protected readonly _customHeaders : Record<string, string> = {}
    protected readonly _customQuery : Record<string, string> = {}

    public constructor(config : Partial<Config>)
    {
        this._config = { ...DefaultConfig, ...config }
        if (!validateConfig(this._config))
            throw new Error("Invalid Content Delivery API Configuration")
        this._baseUrl = new URL(this._config.apiUrl)
        this._frontendUrl = this._config.frontendUrl ? new URL(this._config.frontendUrl ?? '/', this._baseUrl) : this._baseUrl
        //this._config.debug = true;
    }

    public setHeader(header: string, value: string): void {
        this._customHeaders[header] = value
    }

    public getHeader(headerName: string): string | undefined
    {
        return this._customHeaders[headerName]
    }

    public setQueryParam(paramName: string, paramValue: string) : void
    {
        this._customQuery[paramName] = paramValue
    }

    public getQueryParam(paramName: string): string | undefined
    {
        return this._customQuery[paramName]
    }

    public async login(username: string, password: string, client_id: "Default" = "Default") : Promise<AuthResponse>
    {
        const request_data : AuthRequest = { client_id, grant_type: "password", username, password }
        const request_body = this.convertToUrlEncoded(request_data)
        const response = await this.doRequest<AuthApiResponse>(OptiEndpoints.OAuth, {
            method: 'POST',
            body: request_body,
            addDefaultParams: false,
            editMode: false,
            headers: {
                "accept": "application/json",
                "content-type": "application/x-www-form-urlencoded",
                "cookie": ""
            }
        })
        return { ...response, ".expires": new Date(response[".expires"]), ".issued": new Date(response[".issued"]) }
    }

    public async refresh(refresh_token: string, client_id: "Default" = "Default") : Promise<AuthResponse>
    {
        const request_data : AuthRequest = { client_id, grant_type: "refresh_token", refresh_token }
        const request_body = this.convertToUrlEncoded(request_data)
        const response = await this.doRequest<AuthApiResponse>(OptiEndpoints.OAuth, {
            method: 'POST',
            body: request_body,
            addDefaultParams: false,
            editMode: false,
            headers: {
                "accept": "application/json",
                "content-type": "application/x-www-form-urlencoded"
            }
        })
        return { ...response, ".expires": new Date(response[".expires"]), ".issued": new Date(response[".issued"]) }
    }

    public setAccessToken(newToken: string | undefined): void
    {
        this._accessToken = newToken
    }

    public hasAccessToken(token?: string) : boolean 
    {
        if (!this._accessToken)
            return false
        
        return token ? token == this._accessToken : true
    }

    public async getWebsites() : Promise<WebsiteList>
    {
        if (this._config.debug) console.groupCollapsed("ContentDeliveryAPI: Get Websites")
        const websites = await this.doRequest<WebsiteList>(OptiEndpoints.Site).catch(() => [])
        if (this._config.debug) console.groupEnd()
        return websites
    }

    public async getWebsite(hostname ?: string | URL) : Promise<Website | undefined>
    {
        if (this._config.debug) {
            console.groupCollapsed("ContentDeliveryAPI: Get Website")
            console.log("Hostname", hostname)
        }
        let processedHost = '';
        switch (typeof(hostname)) {
            case 'undefined':
                processedHost = '';
                break;
            case 'string':
                processedHost = hostname;
                break;
            default:
                processedHost = hostname.host;
                break;
        }
        if (this._config.debug) console.log(`Normalized hostname: ${ processedHost }`);
        const website = this.getWebsites().then(websites => {
            const website: Website | undefined = websites.filter(w => WebsiteUtils.hostnameFilter(w, processedHost, undefined, false)).shift();
            const starWebsite: Website | undefined = websites.filter(w => WebsiteUtils.hostnameFilter(w, '*', undefined, false)).shift();
            const outValue = website || starWebsite;
            if (this._config.debug) console.log(`Resolved website:`, outValue);
            return outValue;
        }).catch(() => undefined);
        if (this._config.debug)  console.groupEnd()
        return website
    }

    public async resolveRoute<C extends IContent = IContent>(path : string, config: ContentRequest<C>) : Promise<C | undefined>
    {
        const resolvablePath = new URL(path, this._frontendUrl);
        if (this._config.debug) {
            console.groupCollapsed("ContentDeliveryAPI: Resolve route")
            console.log("Route", resolvablePath.href)
        }
        const req : RequestConfig<C> = { ...config, urlParams: { ...config.urlParams, ContentUrl: resolvablePath.href, MatchExact: 'true' } }
        const list = await this.doRequest<C[]>(OptiEndpoints.Content, req as RequestConfig<IContentIfOther<C>>)

        if (this._config.debug) {
            console.log(`Received ${ list?.length ?? 0 } content items for ${ path }`)
            console.groupEnd()
        }
        if (list && list.length === 1) return list[0]
        return undefined
    }

    public getContent<C extends IContent = IContent>(id : ContentReference, config ?: ContentRequest<C>) : Promise<C> {
        return this.getContentBase<C>(id, OptiEndpoints.Content, config as ContentRequest<BaseType<C>>)
    }

    public async getContents<C extends IContent[] = IContent[]>(ids : ContentReference[], config ?: ContentRequest<BaseType<C>>) : Promise<C> {
        // Just return an empty array if we don't have ids
        if (ids == undefined || ids == null || ids.length == 0)
            return [] as unknown as C

        const forEditMode = config?.editMode ?? false
        if (this._config.debug) {
            console.groupCollapsed(`ContentDeliveryAPI: Retrieve content (multiple)`)
            console.debug("Content items", ids)
            console.debug("Edit mode", forEditMode)
        }
        const references : string[] = []
        const guids : string[] = []
        ids?.forEach(id => {
            const apiId = ContentLinkService.createApiId(id, true, forEditMode);
            if (ContentLinkService.contentApiIdIsGuid(apiId))
                guids.push(apiId)
            else
                references.push(apiId)
        })
        if (this._config.debug)
            console.log("Content identifiers (guids, references)", guids, references)

        let response : IContent[] = []

        if (forEditMode) {
            console.log("Fetching multiple for edit mode")
            const byGuids = await Promise.all(guids.map(g => this.getContent(g, config)))
            const byRefs = await Promise.all(references.map(r => this.getContent(r, config)))
            response = byGuids.concat(byRefs) as IContent[]
        } else {
            const specficParams : RequestConfig<BaseType<C>>['urlParams'] = {}
            if (references)   specficParams['references'] = references.join(',')
            if (guids)        specficParams['guids'] =      guids.join(',')
            const reqConfig : RequestConfig<BaseType<C>> = { ...config, urlParams: { ...config?.urlParams, ...specficParams }}
            response = await this.doRequest<C>(OptiEndpoints.Content, reqConfig as RequestConfig<IContentIfOther<BaseType<C>>>);
        }
        
        if (this._config.debug)
            console.groupEnd()

        return response as C;
    }

    public async basicSearch<C extends IContent = IContent>(query: string, orderBy?: string, skip ?: number, top ?: number, personalized?: boolean, config ?: ContentRequest<C>) : Promise<ContentSearchResult<C>>
    {
        if (this._config.debug) {
            console.groupCollapsed(`ContentDeliveryAPI: Search content (basic)`)
            console.debug("Arguments (Query, OrderBy, Skip, Take, Personalized)", query, orderBy, skip, top, personalized)
        }

        const specficParams : RequestConfig<BaseType<C>>['urlParams'] = {}
        specficParams['query'] = query
        if (orderBy)      specficParams['orderBy'] = orderBy
        if (skip)         specficParams['skip'] = skip.toString()
        if (top)          specficParams['top'] = top.toString()
        if (personalized) specficParams['personalize'] = 'true'
        const reqConfig : RequestConfig<C> = { ...config, urlParams: { ...config?.urlParams, ...specficParams }}
        reqConfig.editMode = false

        const response = await this.doRequest<ContentSearchResult<C>>(OptiEndpoints.Search, reqConfig as RequestConfig<IContent>)
        if (!response.results)
            response.results = []
        
        if (this._config.debug)
            console.groupEnd()

        return response;
    }

    public async search<C extends IContent = IContent>(query?: string, filter?: string, orderBy?: string, skip ?: number, top ?: number, personalized?: boolean, config ?: ContentRequest<C>) : Promise<ContentSearchResult<C>>
    {
        if (this._config.debug) {
            console.groupCollapsed(`ContentDeliveryAPI: Search content`)
            console.debug("Arguments (Query, Filter, OrderBy, Skip, Take, Personalized)", query, filter, orderBy, skip, top, personalized)
        }

        const specficParams : RequestConfig<BaseType<C>>['urlParams'] = {}
        if (query)        specficParams['query'] = query
        if (filter)       specficParams['filter'] = filter
        if (orderBy)      specficParams['orderBy'] = orderBy
        if (skip)         specficParams['skip'] = skip.toString()
        if (top)          specficParams['top'] = top.toString()
        if (personalized) specficParams['personalize'] = 'true'
        const reqConfig : RequestConfig<C> = { ...config, urlParams: { ...config?.urlParams, ...specficParams }}
        reqConfig.editMode = false

        const response = await this.doRequest<ContentSearchResult<C>>(OptiEndpoints.Search, reqConfig as RequestConfig<IContent>)
        
        if (this._config.debug)
            console.groupEnd()

        if (response) {
            response.results = response.results ?? []
            return response
        } else
            return { results: [], totalMatching: 0 }
    }

    public getAncestors<C extends IContent = IContent>(id : ContentReference, config?: ContentRequest<C>) : Promise<C[]>
    {
        return this.getContentBase<C[]>(id, OptiEndpoints.Ancestors, config)
    }

    public getChildren<C extends IContent = IContent>(id : ContentReference, config?: ContentRequest<C>) : Promise<C[]>
    {
        return this.getContentBase<C[]>(id, OptiEndpoints.Children, config)
    }

    public raw<T>(url: string, options?: RequestConfig<IContentIfOther<BaseType<T>>>): Promise<T> {
        if (this._config.debug) {
            console.group("RAW API Call")
            console.log("URL:", url)
            console.log("Options", options)
        }
        const opts = this.resolveRequestOptions(options)
        const endpoint = buildUrl(this._baseUrl, url, { contentMode: opts.editMode ? OptiContentMode.Edit : OptiContentMode.Delivery, ...opts.urlParams })
        const response = this.getResponse<T>(endpoint, opts)
        if (this._config.debug)
            console.groupEnd()
        return response
    }

    protected async getContentBase<C extends IContent | IContent[] = IContent>(id : ContentReference, method: OptiEndpoints, config?: ContentRequest<BaseType<C>>) : Promise<C>
    {
        if (this._config.debug) {
            console.groupCollapsed(`ContentDeliveryAPI: Retrieve content`)
            console.debug('Endpoint', method)
            console.debug("Content item", id)
        }
        const contentId = ContentLinkService.createApiId(id, true)
        if (this._config.debug) console.log("Content identifier: ", contentId)
        const req : RequestConfig<BaseType<C>> = { ...config, urlParams: { ...config?.urlParams, contentId } }

        const response = await this.doRequest<C>(method, req as RequestConfig<IContentIfOther<BaseType<C>>>)
        if (this._config.debug) console.groupEnd()
        return response
    }
    
    private doRequest<T>(service: OptiEndpoints, options?: RequestConfig<IContentIfOther<BaseType<T>>>) : Promise<T>
    {
        // Create URL
        if (this._config.debug) console.debug("Request configuration", options)
        const opts = this.resolveRequestOptions(options)
        if (this._config.debug) console.debug("Processed request configuration", opts)
        
        const url = buildUrl(this._baseUrl, service, { contentMode: opts.editMode ? OptiContentMode.Edit : OptiContentMode.Delivery, ...this._customQuery, ...opts.urlParams })
        if (this._config.debug) console.log("Request URL", url.href)

        return this.getResponse(url, opts)
    }

    /**
     * Send the request to the Endpoint API, using the URL and Options specified
     * 
     * @param url       The URL to send the message to
     * @param options   The Options of the request
     * @returns         The response
     */
    protected async getResponse<T>(url: URL, options?: RequestConfig<IContentIfOther<BaseType<T>>>) : Promise<T>
    {
        const reqInit = await this.getRequestConfig(url.pathname, options)
        if (this._config.debug) console.debug("Request configuration", url.href, reqInit)

        const timeOut = ((typeof(options?.timeOut) == 'number' && options?.timeOut > 0 ? options.timeOut : DefaultRequestConfig.timeOut) as number) * 1000
        const abortController = new AbortController()
        const timeoutId = setTimeout(() => {
            console.warn(`Request to ${ url.href } timed out`)
            abortController.abort()
        }, timeOut);

        const response = await fetch(url.href, { ...reqInit, signal: abortController.signal }).then(response => {
            if (this._config.debug) console.log(`Response received: HTTP Status ${ response.status }: ${ response.statusText }`)
            clearTimeout(timeoutId)
            if (!response.ok)
                throw new NetworkError(`HTTP Error ${ response.status }: ${ response.statusText } for ${ url.href }`, response)
            return response.json() as Promise<T>
        }).then(data => {
            if (this._config.debug) console.debug('Response received: Data', data)
            return data
        })
        return response as T
    }

    /**
     * Build the Fetch configuration object to be given to the fetch implementation
     * currently in use
     * 
     * @param   path    The path to be invoked by fetch
     * @param   config  The configuration for the current request
     * @returns The configuration for the fetch request
     */
    protected async getRequestConfig<T extends IContent>(path: string, config?: RequestConfig<T>) : Promise<FetchRequest>
    {
        const reqInit : FetchRequest = {

            method: config?.method?.toUpperCase() ?? "GET",
            credentials: 'include',
            headers: await this.getHeaders(path, config),
        };
        if (config?.body)
            reqInit.body = config.body
        return reqInit;
    }

    /**
     * Construct the full set of headers for the request against the
     * Optimizely ContentDelivery API
     * 
     * 
     * @param   path    The path to be invoked by fetch
     * @param   config  The configuration for the current request
     * @returns The Request Headers
     */
    protected async getHeaders<T extends IContent>(path: string, config?: RequestConfig<T>): Promise<FetchRequest['headers']> {
        const defaultHeaders : RequestConfig['headers'] = {
            'Accept': 'application/json',        // Requested response data format
            'Content-Type': 'application/json',  // Request data format
        };

        // Add Authorization if needed
        if (this._config.getAccessToken) {
            defaultHeaders["Authorization"] = `Bearer ${ await this._config.getAccessToken(path) }`
        } else if (this._accessToken) {
            defaultHeaders["Authorization"] = `Bearer ${ this._accessToken }`
        }

        // Set language
        if (config?.branch) {
            defaultHeaders["Accept-Language"] = config.branch
            defaultHeaders["X-IContent-Language"] = config.branch
        } else if (this._config.defaultBranch) {
            defaultHeaders["Accept-Language"] = this._config.defaultBranch
            defaultHeaders["X-IContent-Language"] = this._config.defaultBranch
        }

        if(config?.editMode) {
            defaultHeaders["X-PreviewMode"] = "edit"
            defaultHeaders["Cookie"] = ""
        }

        const requestHeaders = { ...defaultHeaders, ...this._customHeaders, ...config?.headers }
        //console.log("Request Headers", requestHeaders)
        return requestHeaders
    }

    /**
     * Process a RequestConfiguration object to ensure it has the appropriate values to
     * execute a request against the Optimizely Content Delivery API. This takes a few
     * steps:
     * - Propagate the current window (if exists) query variables to the ContentDelivery API
     * - Ensure the proper edit mode is propagated
     * - Resolve the select & expand parameters based upon the configuration
     * 
     * @param       options     The original configuration
     * @returns     The updated configuration
     */
    protected resolveRequestOptions<T extends IContent>(options ?: RequestConfig<T>) : RequestConfig<T>
    {
        const output = { ...DefaultRequestConfig, ...options }
        
        // Propagate the Optimizely Edit Mode Query Parameters configurations
        try {
            const windowSearchParams = new URLSearchParams(window?.location?.search);
            const urlParams = output.urlParams ?? {}
            OptiEditQueryParams.forEach(param => {
                if (!urlParams[param] && windowSearchParams.has(param)) {
                    urlParams[param] = windowSearchParams.get(param) as string;
                }
            });
            output.urlParams = urlParams
        } catch (e) {
            output.urlParams = output.urlParams ?? {}
        }

        // Process select parameter
        if (!output.urlParams['select'])
            if (options?.select)
                if (options.select[0] !== '*')
                    output.urlParams['select'] = options.select.join(',')
            else if (this._config.selectAllProperties === false)
                output.urlParams['select'] = '-'

        // Process expand parameter
        if (!output.urlParams['expand'])
            if (options?.expand)
                output.urlParams['expand'] = options.expand.join(',')
            else if (this._config.expandAllProperties === true)
                output.urlParams['expand'] = '*'
            
        // Enforce edit mode propagation, if we're in edit mode
        if (inEditMode(false)) {
            output.urlParams['epieditmode'] = 'true'
            output.urlParams['cb'] = (new Date()).getTime().toString()
        }

        // Add branch into URL to simplify caching
        const branch = options?.branch || this._config.defaultBranch
        if (branch)
            output.urlParams['epibranch'] = branch

        return output as RequestConfig
    }

    protected convertToUrlEncoded(input: Record<string, any>, namespace?: string) : string
    {
        return Object.entries(input).map(x => {
            const val = x[1]
            const key = namespace ? `${namespace}.${x[0]}` : x[0]
            if (Array.isArray(val))
                return val.map(y => `${encodeURIComponent(key)}[]=${encodeURIComponent(y as string)}`).join('&')
            if (typeof(val) === 'object' && val !== null)
                return this.convertToUrlEncoded(val, key)
            return `${encodeURIComponent(key)}=${encodeURIComponent(val as string)}`
        }).join('&')
    }

    
}

export default ContentDeliveryAPI