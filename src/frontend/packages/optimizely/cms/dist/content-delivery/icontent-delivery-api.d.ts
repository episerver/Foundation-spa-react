import type { IContent, Website, WebsiteList, ContentReference, AuthResponse, IContentData } from '../models';
import type { Config } from './config';
import fetch from 'cross-fetch';
/**
 * Interface describing additional request parameters
 * for requesting content.
 */
export type ContentRequest<ContentType extends IContent = IContentData> = {
    /**
     * Language of the content to request, will keep the browser
     * default if not set explicitly
     */
    branch?: string;
    /**
     * Properties to include in the response.
     * All by default, unless configured differently.
     */
    select?: (keyof ContentType)[] | ['*'] | ['-'];
    /**
     * Properties to expand in the response.
     * None by default, unless configured differently.
     */
    expand?: (keyof ContentType)[] | ['*'];
    /**
     * Additional URL Parameters to include in the
     * request
     */
    urlParams?: {
        [paramName: string]: string;
    };
    /**
     * Additional Headers to include in the request
     */
    headers?: {
        [headerName: string]: string;
    };
    /**
     * If set to true, switches over to the content
     * management api, when enabled
     */
    editMode?: boolean;
};
export type Fetch = typeof fetch extends Promise<infer R> ? R : typeof fetch;
export type FetchRequest = Required<Parameters<Fetch>>[1];
export type RequestConfig<T extends IContent = IContent> = ContentRequest<T> & {
    /**
     * The Request Method
     */
    method?: FetchRequest['method'];
    /**
     * The Request Body
     */
    body?: FetchRequest['body'];
    /**
     * Set to true to have the default parameters to be added to the request,
     * false to ensure only explicitly defined parameters will be added.
     */
    addDefaultParams?: boolean;
    /**
     * Override the default timeout (in seconds) for the request
     */
    timeOut?: number;
};
export type ContentSearchResult<T extends IContent = IContentData> = {
    totalMatching: number;
    results: T[];
};
/**
 * Get the base type, if the given type is an array, otherwise return the
 * input type
 */
export type BaseType<T> = T extends (infer X)[] ? X : T;
/**
 * Ensure that the given type is (a descendant) of IContent, if not
 * return IContent.
 *
 * Usefull for generic parameter types that require an IContent as generic
 * parameter, whilest the function allows other types to be provided as well
 */
export type IContentIfOther<T> = T extends IContent ? T : IContent;
export type IContentDeliveryAPIStatic = {
    new (config: Config): IContentDeliveryAPI;
};
/**
 * Service definition for the Optimizely CMS Content Delivery API. This is a
 * straight wrapper for the ContentDeliveryAPI and does not implement any
 * form of Client Side caching, that should be added at a higher level.
 *
 * If desired it is possible to override the AxiosAdapter to add low-level
 * request/response caching, however that may or may not be desired for your
 * use case.
 */
export type IContentDeliveryAPI = {
    /**
     * Set a query parameter for all outgoing requests through the ContentDeliveryAPI
     *
     * @param   header      The name of the header to set
     * @param   value       The value of the header
     */
    setQueryParam(paramName: string, paramValue: string): void;
    getQueryParam(paramName: string): string | undefined;
    /**
     * Set a header for all outgoing requests through the ContentDeliveryAPI
     *
     * @param   header      The name of the header to set
     * @param   value       The value of the header
     */
    setHeader(header: string, value: string): void;
    getHeader(headerName: string): string | undefined;
    /**
     * Perform a login call against the OAuth endpoint of the ContentDeliveryAPI
     * V2
     *
     * @param   username        The username of the user authenticating
     * @param   password        The password of the user authenticating
     * @param   clientId        The clientId, if non-standard of the current application
     * @deprecated              Intended for CMS11 OAuth Only, use a standard OIDC client with CMS12
     * @throws  "Not supported" when the selected version doesn't support this OAuth call
     */
    login(username: string, password: string, clientId?: string): Promise<AuthResponse>;
    /**
     * Perform a login call against the OAuth endpoint of the ContentDeliveryAPI
     * V2
     *
     * @param   token           The token to refresh
     * @param   clientId        The clientId, if non-standard of the current application
     * @deprecated              Intended for CMS11 OAuth Only, use a standard OIDC client with CMS12
     * @throws  "Not supported" when the selected version doesn't support this OAuth call
     */
    refresh(token: string, clientId?: string): Promise<AuthResponse>;
    /**
     * Update the default access token to the provided value, this value should be ignored
     * by the implementation when the getAccessToken method of the configuration object has
     * been set.
     *
     * @param   newToken        The token to use for future calls
     */
    setAccessToken: (newToken: string) => void;
    /**
     * Verify if the current ContentDelivery API instance has an access token configured,
     * if a token is provided it will also validate if that token is used.
     */
    hasAccessToken: (token?: string) => boolean;
    /**
     * Retrieve the list of all websites registered within Optimizely CMS CMS
     */
    getWebsites(): Promise<WebsiteList>;
    /**
     * Get the website for the specified host
     *
     * @param { string | URL } hostname The hostname to get the website for
     * @returns { Promise<Website | undefined> }
     */
    getWebsite(hostname?: string | URL): Promise<Website | undefined>;
    /**
     * Execute a routing request to resolve a path to IContent item
     *
     * @param { string } path The path to resolve to an IContent item
     * @param { string[] } select The fields that are needed in the response, defaults to all if not provided
     * @param { string[] } expand The list of fields that need to be expanded, defaults to none if not provided, set to ['*'] for all
     * @returns { Promise<IContent | undefined> } The referenced IContent item, or undefined if not found
     */
    resolveRoute<C extends IContent = IContentData>(path: string, request?: ContentRequest<C>): Promise<C | undefined>;
    /**
     * Perform a basic search by either a single keyword/phrase or a query string encoded set of constraints.
     *
     * @param { string }    query         Keyword/Phrase or query string
     * @param { string }    orderBy
     * @param { number }    skip
     * @param { number }    top
     * @param { boolean }   personalized  Wether or not personalized results must be returned
     * @param { string }    select
     * @param { string }    expand
     * @returns The search results
     */
    basicSearch<C extends IContent = IContentData>(query: string, orderBy?: string, skip?: number, top?: number, personalized?: boolean, request?: ContentRequest<C>): Promise<ContentSearchResult<C>>;
    /**
     * Perform an advanced search by an OData Query
     *
     * @param { string }    query         Keyword/Phrase or query string
     * @param { string }    orderBy
     * @param { number }    skip
     * @param { number }    top
     * @param { boolean }   personalized  Wether or not personalized results must be returned
     * @param { string }    select
     * @param { string }    expand
     * @returns The search results
     */
    search<C extends IContent = IContentData>(query?: string, fitler?: string, orderBy?: string, skip?: number, top?: number, personalized?: boolean, request?: ContentRequest<C>): Promise<ContentSearchResult<C>>;
    /**
     * Retrieve a single piece of content from Optimizely CMS
     *
     * @param id The content to fetch from Optimizely CMS
     * @param request The request configuration
     * @returns The referenced IContent item, or undefined if not found
     */
    getContent<C extends IContent = IContentData>(id: ContentReference, request?: ContentRequest<C>): Promise<C | undefined>;
    /**
     * Retrieve a list content-items from Optimizely CMS in one round-trip
     *
     * @param ids The content items to fetch from Optimizely CMS
     * @param request The request configuration
     * @returns The referenced IContent items
     */
    getContents<C extends IContent[] = IContentData[]>(ids: ContentReference[], request?: ContentRequest<BaseType<C>>): Promise<C>;
    /**
     * Retrieve the parents in the Optimizely CMS content tree for the referenced
     * content item
     *
     * @param id The content to fetch from Optimizely CMS
     * @param request The request configuration
     * @returns The parents of the referenced IContent item
     */
    getAncestors<C extends IContent = IContentData>(id: ContentReference, request?: ContentRequest<C>): Promise<C[]>;
    /**
     * Retrieve the children in the Optimizely CMS content tree for the referenced
     * content item
     *
     * @param id The content to fetch from Optimizely CMS
     * @param request The request configuration
     * @returns The children of the referenced IContent item
     */
    getChildren<C extends IContent = IContentData>(id: ContentReference, request?: ContentRequest<C>): Promise<C[]>;
    /**
     * Perform a raw call to the DXP
     *
     * @param url The RAW URL to invoke, relative to the DXP URL
     * @param options The options for the request
     */
    raw<T>(url: string, options?: RequestConfig<IContentIfOther<BaseType<T>>>): Promise<T>;
};
export default IContentDeliveryAPI;
