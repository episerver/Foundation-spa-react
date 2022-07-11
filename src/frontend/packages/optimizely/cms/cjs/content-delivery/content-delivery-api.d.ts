import type { IContentDeliveryAPI, ContentRequest, ContentSearchResult, BaseType, RequestConfig, FetchRequest, IContentIfOther } from './icontent-delivery-api';
import type { Config } from './config';
import type { IContent, ContentReference, Website, WebsiteList, AuthResponse } from '../models';
import { OptiEndpoints, OptiQueryParams } from './util';
export declare const OptiEditQueryParams: OptiQueryParams[];
export declare const DefaultRequestConfig: RequestConfig;
export declare class ContentDeliveryAPI implements IContentDeliveryAPI {
    protected readonly _config: Config;
    protected readonly _baseUrl: URL;
    protected _accessToken?: string;
    constructor(config: Partial<Config>);
    login(username: string, password: string, client_id?: "Default"): Promise<AuthResponse>;
    refresh(refresh_token: string, client_id?: "Default"): Promise<AuthResponse>;
    setAccessToken(newToken: string | undefined): void;
    hasAccessToken(): boolean;
    getWebsites(): Promise<WebsiteList>;
    getWebsite(hostname?: string | URL): Promise<Website | undefined>;
    resolveRoute<C extends IContent = IContent>(path: string, config: ContentRequest<C>): Promise<C | undefined>;
    getContent<C extends IContent = IContent>(id: ContentReference, config?: ContentRequest<C>): Promise<C>;
    getContents<C extends IContent[] = IContent[]>(ids: ContentReference[], config?: ContentRequest<BaseType<C>>): Promise<C>;
    basicSearch<C extends IContent = IContent>(query: string, orderBy?: string, skip?: number, top?: number, personalized?: boolean, config?: ContentRequest<C>): Promise<ContentSearchResult<C>>;
    search<C extends IContent = IContent>(query?: string, filter?: string, orderBy?: string, skip?: number, top?: number, personalized?: boolean, config?: ContentRequest<C>): Promise<ContentSearchResult<C>>;
    getAncestors<C extends IContent = IContent>(id: ContentReference, config?: ContentRequest<C>): Promise<C[]>;
    getChildren<C extends IContent = IContent>(id: ContentReference, config?: ContentRequest<C>): Promise<C[]>;
    raw<T>(url: string, options?: RequestConfig<IContentIfOther<BaseType<T>>>): Promise<T>;
    protected getContentBase<C extends IContent | IContent[] = IContent>(id: ContentReference, method: OptiEndpoints, config?: ContentRequest<BaseType<C>>): Promise<C>;
    private doRequest;
    /**
     * Send the request to the Endpoint API, using the URL and Options specified
     *
     * @param url       The URL to send the message to
     * @param options   The Options of the request
     * @returns         The response
     */
    protected getResponse<T>(url: URL, options?: RequestConfig<IContentIfOther<BaseType<T>>>): Promise<T>;
    /**
     * Build the Fetch configuration object to be given to the fetch implementation
     * currently in use
     *
     * @param   path    The path to be invoked by fetch
     * @param   config  The configuration for the current request
     * @returns The configuration for the fetch request
     */
    protected getRequestConfig<T extends IContent>(path: string, config?: RequestConfig<T>): Promise<FetchRequest>;
    /**
     * Construct the full set of headers for the request against the
     * Optimizely ContentDelivery API
     *
     *
     * @param   path    The path to be invoked by fetch
     * @param   config  The configuration for the current request
     * @returns The Request Headers
     */
    protected getHeaders<T extends IContent>(path: string, config?: RequestConfig<T>): Promise<FetchRequest['headers']>;
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
    protected resolveRequestOptions<T extends IContent>(options?: RequestConfig<T>): RequestConfig<T>;
    protected convertToUrlEncoded(input: Record<string, any>, namespace?: string): string;
}
export default ContentDeliveryAPI;
