import { OptiEndpoints, OptiQueryParams, buildUrl, inEditMode, OptiContentMode } from './util';
import { DefaultConfig, validateConfig } from './config';
import { Website as WebsiteUtils, ContentReference as ContentLinkService } from '../util';
import fetch from 'cross-fetch';
import { NetworkError } from './NetworkError';
export const OptiEditQueryParams = [
    OptiQueryParams.CommonDrafts,
    OptiQueryParams.EditMode,
    OptiQueryParams.Project,
    OptiQueryParams.Channel,
    OptiQueryParams.VisitorGroup
];
export const DefaultRequestConfig = {
    addDefaultParams: true,
    timeOut: 5
};
export class ContentDeliveryAPI {
    constructor(config) {
        this._customHeaders = {};
        this._config = { ...DefaultConfig, ...config };
        if (!validateConfig(this._config))
            throw new Error("Invalid Content Delivery API Configuration");
        this._baseUrl = new URL(this._config.apiUrl);
        this._frontendUrl = this._config.frontendUrl ? new URL(this._config.frontendUrl ?? '/', this._baseUrl) : this._baseUrl;
        //this._config.debug = true;
    }
    setHeader(header, value) {
        this._customHeaders[header] = value;
    }
    async login(username, password, client_id = "Default") {
        const request_data = { client_id, grant_type: "password", username, password };
        const request_body = this.convertToUrlEncoded(request_data);
        const response = await this.doRequest(OptiEndpoints.OAuth, {
            method: 'POST',
            body: request_body,
            addDefaultParams: false,
            editMode: false,
            headers: {
                "accept": "application/json",
                "content-type": "application/x-www-form-urlencoded",
                "cookie": ""
            }
        });
        return { ...response, ".expires": new Date(response[".expires"]), ".issued": new Date(response[".issued"]) };
    }
    async refresh(refresh_token, client_id = "Default") {
        const request_data = { client_id, grant_type: "refresh_token", refresh_token };
        const request_body = this.convertToUrlEncoded(request_data);
        const response = await this.doRequest(OptiEndpoints.OAuth, {
            method: 'POST',
            body: request_body,
            addDefaultParams: false,
            editMode: false,
            headers: {
                "accept": "application/json",
                "content-type": "application/x-www-form-urlencoded"
            }
        });
        return { ...response, ".expires": new Date(response[".expires"]), ".issued": new Date(response[".issued"]) };
    }
    setAccessToken(newToken) {
        this._accessToken = newToken;
    }
    hasAccessToken() {
        return this._accessToken ? true : false;
    }
    async getWebsites() {
        if (this._config.debug)
            console.groupCollapsed("ContentDeliveryAPI: Get Websites");
        const websites = await this.doRequest(OptiEndpoints.Site).catch(() => []);
        if (this._config.debug)
            console.groupEnd();
        return websites;
    }
    async getWebsite(hostname) {
        if (this._config.debug) {
            console.groupCollapsed("ContentDeliveryAPI: Get Website");
            console.log("Hostname", hostname);
        }
        let processedHost = '';
        switch (typeof (hostname)) {
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
        if (this._config.debug)
            console.log(`Normalized hostname: ${processedHost}`);
        const website = this.getWebsites().then(websites => {
            const website = websites.filter(w => WebsiteUtils.hostnameFilter(w, processedHost, undefined, false)).shift();
            const starWebsite = websites.filter(w => WebsiteUtils.hostnameFilter(w, '*', undefined, false)).shift();
            const outValue = website || starWebsite;
            if (this._config.debug)
                console.log(`Resolved website:`, outValue);
            return outValue;
        }).catch(() => undefined);
        if (this._config.debug)
            console.groupEnd();
        return website;
    }
    async resolveRoute(path, config) {
        const resolvablePath = new URL(path, this._frontendUrl);
        if (this._config.debug) {
            console.groupCollapsed("ContentDeliveryAPI: Resolve route");
            console.log("Route", resolvablePath.href);
        }
        const req = { ...config, urlParams: { ...config.urlParams, ContentUrl: resolvablePath.href, MatchExact: 'true' } };
        const list = await this.doRequest(OptiEndpoints.Content, req);
        if (this._config.debug) {
            console.log(`Received ${list?.length ?? 0} content items for ${path}`);
            console.groupEnd();
        }
        if (list && list.length === 1)
            return list[0];
        return undefined;
    }
    getContent(id, config) {
        return this.getContentBase(id, OptiEndpoints.Content, config);
    }
    async getContents(ids, config) {
        // Just return an empty array if we don't have ids
        if (ids == undefined || ids == null || ids.length == 0)
            return [];
        const forEditMode = config?.editMode ?? false;
        if (this._config.debug) {
            console.groupCollapsed(`ContentDeliveryAPI: Retrieve content (multiple)`);
            console.debug("Content items", ids);
            console.debug("Edit mode", forEditMode);
        }
        const references = [];
        const guids = [];
        ids?.forEach(id => {
            const apiId = ContentLinkService.createApiId(id, true, forEditMode);
            if (ContentLinkService.contentApiIdIsGuid(apiId))
                guids.push(apiId);
            else
                references.push(apiId);
        });
        if (this._config.debug)
            console.log("Content identifiers (guids, references)", guids, references);
        let response = [];
        if (forEditMode) {
            console.log("Fetching multiple for edit mode");
            const byGuids = await Promise.all(guids.map(g => this.getContent(g, config)));
            const byRefs = await Promise.all(references.map(r => this.getContent(r, config)));
            response = byGuids.concat(byRefs);
        }
        else {
            const specficParams = {};
            if (references)
                specficParams['references'] = references.join(',');
            if (guids)
                specficParams['guids'] = guids.join(',');
            const reqConfig = { ...config, urlParams: { ...config?.urlParams, ...specficParams } };
            response = await this.doRequest(OptiEndpoints.Content, reqConfig);
        }
        if (this._config.debug)
            console.groupEnd();
        return response;
    }
    async basicSearch(query, orderBy, skip, top, personalized, config) {
        if (this._config.debug) {
            console.groupCollapsed(`ContentDeliveryAPI: Search content (basic)`);
            console.debug("Arguments (Query, OrderBy, Skip, Take, Personalized)", query, orderBy, skip, top, personalized);
        }
        const specficParams = {};
        specficParams['query'] = query;
        if (orderBy)
            specficParams['orderBy'] = orderBy;
        if (skip)
            specficParams['skip'] = skip.toString();
        if (top)
            specficParams['top'] = top.toString();
        if (personalized)
            specficParams['personalize'] = 'true';
        const reqConfig = { ...config, urlParams: { ...config?.urlParams, ...specficParams } };
        reqConfig.editMode = false;
        const response = await this.doRequest(OptiEndpoints.Search, reqConfig);
        if (!response.results)
            response.results = [];
        if (this._config.debug)
            console.groupEnd();
        return response;
    }
    async search(query, filter, orderBy, skip, top, personalized, config) {
        if (this._config.debug) {
            console.groupCollapsed(`ContentDeliveryAPI: Search content`);
            console.debug("Arguments (Query, Filter, OrderBy, Skip, Take, Personalized)", query, filter, orderBy, skip, top, personalized);
        }
        const specficParams = {};
        if (query)
            specficParams['query'] = query;
        if (filter)
            specficParams['filter'] = filter;
        if (orderBy)
            specficParams['orderBy'] = orderBy;
        if (skip)
            specficParams['skip'] = skip.toString();
        if (top)
            specficParams['top'] = top.toString();
        if (personalized)
            specficParams['personalize'] = 'true';
        const reqConfig = { ...config, urlParams: { ...config?.urlParams, ...specficParams } };
        reqConfig.editMode = false;
        const response = await this.doRequest(OptiEndpoints.Search, reqConfig);
        if (this._config.debug)
            console.groupEnd();
        if (response) {
            response.results = response.results ?? [];
            return response;
        }
        else
            return { results: [], totalMatching: 0 };
    }
    getAncestors(id, config) {
        return this.getContentBase(id, OptiEndpoints.Ancestors, config);
    }
    getChildren(id, config) {
        return this.getContentBase(id, OptiEndpoints.Children, config);
    }
    raw(url, options) {
        if (this._config.debug) {
            console.group("RAW API Call");
            console.log("URL:", url);
            console.log("Options", options);
        }
        const opts = this.resolveRequestOptions(options);
        const endpoint = buildUrl(this._baseUrl, url, { contentMode: opts.editMode ? OptiContentMode.Edit : OptiContentMode.Delivery, ...opts.urlParams });
        const response = this.getResponse(endpoint, opts);
        if (this._config.debug)
            console.groupEnd();
        return response;
    }
    async getContentBase(id, method, config) {
        if (this._config.debug) {
            console.groupCollapsed(`ContentDeliveryAPI: Retrieve content`);
            console.debug('Endpoint', method);
            console.debug("Content item", id);
        }
        const contentId = ContentLinkService.createApiId(id, true);
        if (this._config.debug)
            console.log("Content identifier: ", contentId);
        const req = { ...config, urlParams: { ...config?.urlParams, contentId } };
        const response = await this.doRequest(method, req);
        if (this._config.debug)
            console.groupEnd();
        return response;
    }
    doRequest(service, options) {
        // Create URL
        if (this._config.debug)
            console.debug("Request configuration", options);
        const opts = this.resolveRequestOptions(options);
        if (this._config.debug)
            console.debug("Processed request configuration", opts);
        const url = buildUrl(this._baseUrl, service, { contentMode: opts.editMode ? OptiContentMode.Edit : OptiContentMode.Delivery, ...opts.urlParams });
        if (this._config.debug)
            console.log("Request URL", url.href);
        return this.getResponse(url, opts);
    }
    /**
     * Send the request to the Endpoint API, using the URL and Options specified
     *
     * @param url       The URL to send the message to
     * @param options   The Options of the request
     * @returns         The response
     */
    async getResponse(url, options) {
        const reqInit = await this.getRequestConfig(url.pathname, options);
        if (this._config.debug)
            console.debug("Request configuration", url.href, reqInit);
        const timeOut = (typeof (options?.timeOut) == 'number' && options?.timeOut > 0 ? options.timeOut : DefaultRequestConfig.timeOut) * 1000;
        const abortController = new AbortController();
        const timeoutId = setTimeout(() => {
            console.warn(`Request to ${url.href} timed out`);
            abortController.abort();
        }, timeOut);
        const response = await fetch(url.href, { ...reqInit, signal: abortController.signal }).then(response => {
            if (this._config.debug)
                console.log(`Response received: HTTP Status ${response.status}: ${response.statusText}`);
            clearTimeout(timeoutId);
            if (!response.ok)
                throw new NetworkError(`HTTP Error ${response.status}: ${response.statusText} for ${url.href}`, response);
            return response.json();
        }).then(data => {
            if (this._config.debug)
                console.debug('Response received: Data', data);
            return data;
        });
        return response;
    }
    /**
     * Build the Fetch configuration object to be given to the fetch implementation
     * currently in use
     *
     * @param   path    The path to be invoked by fetch
     * @param   config  The configuration for the current request
     * @returns The configuration for the fetch request
     */
    async getRequestConfig(path, config) {
        const reqInit = {
            method: config?.method?.toUpperCase() ?? "GET",
            credentials: 'include',
            headers: await this.getHeaders(path, config),
        };
        if (config?.body)
            reqInit.body = config.body;
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
    async getHeaders(path, config) {
        const defaultHeaders = {
            'Accept': 'application/json',
            'Content-Type': 'application/json', // Request data format
        };
        // Add Authorization if needed
        if (this._config.getAccessToken) {
            defaultHeaders["Authorization"] = `Bearer ${await this._config.getAccessToken(path)}`;
        }
        else if (this._accessToken) {
            defaultHeaders["Authorization"] = `Bearer ${this._accessToken}`;
        }
        // Set language
        if (config?.branch) {
            defaultHeaders["Accept-Language"] = config.branch;
            defaultHeaders["X-IContent-Language"] = config.branch;
        }
        else if (this._config.defaultBranch) {
            defaultHeaders["Accept-Language"] = this._config.defaultBranch;
            defaultHeaders["X-IContent-Language"] = this._config.defaultBranch;
        }
        if (config?.editMode) {
            defaultHeaders["X-PreviewMode"] = "edit";
        }
        const requestHeaders = { ...defaultHeaders, ...this._customHeaders, ...config?.headers };
        //console.log("Request Headers", requestHeaders)
        return requestHeaders;
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
    resolveRequestOptions(options) {
        const output = { ...DefaultRequestConfig, ...options };
        // Propagate the Optimizely Edit Mode Query Parameters configurations
        try {
            const windowSearchParams = new URLSearchParams(window?.location?.search);
            const urlParams = output.urlParams ?? {};
            OptiEditQueryParams.forEach(param => {
                if (!urlParams[param] && windowSearchParams.has(param)) {
                    urlParams[param] = windowSearchParams.get(param);
                }
            });
            output.urlParams = urlParams;
        }
        catch (e) {
            output.urlParams = output.urlParams ?? {};
        }
        // Process select parameter
        if (!output.urlParams['select'])
            if (options?.select)
                if (options.select[0] !== '*')
                    output.urlParams['select'] = options.select.join(',');
                else if (this._config.selectAllProperties === false)
                    output.urlParams['select'] = '-';
        // Process expand parameter
        if (!output.urlParams['expand'])
            if (options?.expand)
                output.urlParams['expand'] = options.expand.join(',');
            else if (this._config.expandAllProperties === true)
                output.urlParams['expand'] = '*';
        // Enforce edit mode propagation, if we're in edit mode
        if (inEditMode(false)) {
            output.urlParams['epieditmode'] = 'true';
            output.urlParams['cb'] = (new Date()).getTime().toString();
        }
        // Add branch into URL to simplify caching
        const branch = options?.branch || this._config.defaultBranch;
        if (branch)
            output.urlParams['epibranch'] = branch;
        return output;
    }
    convertToUrlEncoded(input, namespace) {
        return Object.entries(input).map(x => {
            const val = x[1];
            const key = namespace ? `${namespace}.${x[0]}` : x[0];
            if (Array.isArray(val))
                return val.map(y => `${encodeURIComponent(key)}[]=${encodeURIComponent(y)}`).join('&');
            if (typeof (val) === 'object' && val !== null)
                return this.convertToUrlEncoded(val, key);
            return `${encodeURIComponent(key)}=${encodeURIComponent(val)}`;
        }).join('&');
    }
}
export default ContentDeliveryAPI;
//# sourceMappingURL=content-delivery-api.js.map