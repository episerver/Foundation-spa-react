"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentDeliveryAPI = exports.DefaultRequestConfig = exports.OptiEditQueryParams = void 0;
const tslib_1 = require("tslib");
const util_1 = require("./util");
const config_1 = require("./config");
const util_2 = require("../util");
const cross_fetch_1 = tslib_1.__importDefault(require("cross-fetch"));
const NetworkError_1 = require("./NetworkError");
exports.OptiEditQueryParams = [
    "commondrafts" /* OptiQueryParams.CommonDrafts */,
    "epieditmode" /* OptiQueryParams.EditMode */,
    "epiprojects" /* OptiQueryParams.Project */,
    "epichannel" /* OptiQueryParams.Channel */,
    "visitorgroupsByID" /* OptiQueryParams.VisitorGroup */
];
exports.DefaultRequestConfig = {
    addDefaultParams: true,
    timeOut: 5
};
class ContentDeliveryAPI {
    constructor(config) {
        this._config = Object.assign(Object.assign({}, config_1.DefaultConfig), config);
        if (!(0, config_1.validateConfig)(this._config))
            throw new Error("Invalid Content Delivery API Configuration");
        this._baseUrl = new URL(this._config.apiUrl);
        //this._config.debug = true;
    }
    login(username, password, client_id = "Default") {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const request_data = { client_id, grant_type: "password", username, password };
            const request_body = this.convertToUrlEncoded(request_data);
            const response = yield this.doRequest("api/episerver/auth/token" /* OptiEndpoints.OAuth */, {
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
            return Object.assign(Object.assign({}, response), { ".expires": new Date(response[".expires"]), ".issued": new Date(response[".issued"]) });
        });
    }
    refresh(refresh_token, client_id = "Default") {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const request_data = { client_id, grant_type: "refresh_token", refresh_token };
            const request_body = this.convertToUrlEncoded(request_data);
            const response = yield this.doRequest("api/episerver/auth/token" /* OptiEndpoints.OAuth */, {
                method: 'POST',
                body: request_body,
                addDefaultParams: false,
                editMode: false,
                headers: {
                    "accept": "application/json",
                    "content-type": "application/x-www-form-urlencoded"
                }
            });
            return Object.assign(Object.assign({}, response), { ".expires": new Date(response[".expires"]), ".issued": new Date(response[".issued"]) });
        });
    }
    setAccessToken(newToken) {
        this._accessToken = newToken;
    }
    hasAccessToken() {
        return this._accessToken ? true : false;
    }
    getWebsites() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this._config.debug)
                console.groupCollapsed("ContentDeliveryAPI: Get Websites");
            const websites = yield this.doRequest("api/episerver/v{ $version }/site/{ $siteId }" /* OptiEndpoints.Site */).catch(() => []);
            if (this._config.debug)
                console.groupEnd();
            return websites;
        });
    }
    getWebsite(hostname) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
                const website = websites.filter(w => util_2.Website.hostnameFilter(w, processedHost, undefined, false)).shift();
                const starWebsite = websites.filter(w => util_2.Website.hostnameFilter(w, '*', undefined, false)).shift();
                const outValue = website || starWebsite;
                if (this._config.debug)
                    console.log(`Resolved website:`, outValue);
                return outValue;
            }).catch(() => undefined);
            if (this._config.debug)
                console.groupEnd();
            return website;
        });
    }
    resolveRoute(path, config) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this._config.debug) {
                console.groupCollapsed("ContentDeliveryAPI: Resolve route");
                console.log("Route", path);
            }
            const req = Object.assign(Object.assign({}, config), { urlParams: Object.assign(Object.assign({}, config.urlParams), { ContentUrl: path, MatchExact: 'true' }) });
            const list = yield this.doRequest("api/episerver/v{ $version }/content/{ $contentId }" /* OptiEndpoints.Content */, req);
            if (this._config.debug) {
                console.log(`Received ${(_a = list === null || list === void 0 ? void 0 : list.length) !== null && _a !== void 0 ? _a : 0} content items for ${path}`);
                console.groupEnd();
            }
            if (list && list.length === 1)
                return list[0];
            return undefined;
        });
    }
    getContent(id, config) {
        return this.getContentBase(id, "api/episerver/v{ $version }/content/{ $contentId }" /* OptiEndpoints.Content */, config);
    }
    getContents(ids, config) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // Just return an empty array if we don't have ids
            if (ids == undefined || ids == null || ids.length == 0)
                return [];
            const forEditMode = (_a = config === null || config === void 0 ? void 0 : config.editMode) !== null && _a !== void 0 ? _a : false;
            if (this._config.debug) {
                console.groupCollapsed(`ContentDeliveryAPI: Retrieve content (multiple)`);
                console.debug("Content items", ids);
                console.debug("Edit mode", forEditMode);
            }
            const references = [];
            const guids = [];
            ids === null || ids === void 0 ? void 0 : ids.forEach(id => {
                const apiId = util_2.ContentReference.createApiId(id, true, forEditMode);
                if (util_2.ContentReference.contentApiIdIsGuid(apiId))
                    guids.push(apiId);
                else
                    references.push(apiId);
            });
            if (this._config.debug)
                console.log("Content identifiers (guids, references)", guids, references);
            let response = [];
            if (forEditMode) {
                console.log("Fetching multiple for edit mode");
                const byGuids = yield Promise.all(guids.map(g => this.getContent(g, config)));
                const byRefs = yield Promise.all(references.map(r => this.getContent(r, config)));
                response = byGuids.concat(byRefs);
            }
            else {
                const specficParams = {};
                if (references)
                    specficParams['references'] = references.join(',');
                if (guids)
                    specficParams['guids'] = guids.join(',');
                const reqConfig = Object.assign(Object.assign({}, config), { urlParams: Object.assign(Object.assign({}, config === null || config === void 0 ? void 0 : config.urlParams), specficParams) });
                response = yield this.doRequest("api/episerver/v{ $version }/content/{ $contentId }" /* OptiEndpoints.Content */, reqConfig);
            }
            if (this._config.debug)
                console.groupEnd();
            return response;
        });
    }
    basicSearch(query, orderBy, skip, top, personalized, config) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
            const reqConfig = Object.assign(Object.assign({}, config), { urlParams: Object.assign(Object.assign({}, config === null || config === void 0 ? void 0 : config.urlParams), specficParams) });
            reqConfig.editMode = false;
            const response = yield this.doRequest("api/episerver/v{ $version }/search/content/" /* OptiEndpoints.Search */, reqConfig);
            if (!response.results)
                response.results = [];
            if (this._config.debug)
                console.groupEnd();
            return response;
        });
    }
    search(query, filter, orderBy, skip, top, personalized, config) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
            const reqConfig = Object.assign(Object.assign({}, config), { urlParams: Object.assign(Object.assign({}, config === null || config === void 0 ? void 0 : config.urlParams), specficParams) });
            reqConfig.editMode = false;
            const response = yield this.doRequest("api/episerver/v{ $version }/search/content/" /* OptiEndpoints.Search */, reqConfig);
            if (this._config.debug)
                console.groupEnd();
            if (response) {
                response.results = (_a = response.results) !== null && _a !== void 0 ? _a : [];
                return response;
            }
            else
                return { results: [], totalMatching: 0 };
        });
    }
    getAncestors(id, config) {
        return this.getContentBase(id, "api/episerver/v{ $version }/content/{ $contentId }/ancestors" /* OptiEndpoints.Ancestors */, config);
    }
    getChildren(id, config) {
        return this.getContentBase(id, "api/episerver/v{ $version }/content/{ $contentId }/children" /* OptiEndpoints.Children */, config);
    }
    raw(url, options) {
        if (this._config.debug) {
            console.group("RAW API Call");
            console.log("URL:", url);
            console.log("Options", options);
        }
        const opts = this.resolveRequestOptions(options);
        const endpoint = (0, util_1.buildUrl)(this._baseUrl, url, Object.assign({ contentMode: opts.editMode ? "contentmanagement" /* OptiContentMode.Edit */ : "content" /* OptiContentMode.Delivery */ }, opts.urlParams));
        const response = this.getResponse(endpoint, opts);
        if (this._config.debug)
            console.groupEnd();
        return response;
    }
    getContentBase(id, method, config) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this._config.debug) {
                console.groupCollapsed(`ContentDeliveryAPI: Retrieve content`);
                console.debug('Endpoint', method);
                console.debug("Content item", id);
            }
            const contentId = util_2.ContentReference.createApiId(id, true);
            if (this._config.debug)
                console.log("Content identifier: ", contentId);
            const req = Object.assign(Object.assign({}, config), { urlParams: Object.assign(Object.assign({}, config === null || config === void 0 ? void 0 : config.urlParams), { contentId }) });
            const response = yield this.doRequest(method, req);
            if (this._config.debug)
                console.groupEnd();
            return response;
        });
    }
    doRequest(service, options) {
        // Create URL
        if (this._config.debug)
            console.debug("Request configuration", options);
        const opts = this.resolveRequestOptions(options);
        if (this._config.debug)
            console.debug("Processed request configuration", opts);
        const url = (0, util_1.buildUrl)(this._baseUrl, service, Object.assign({ contentMode: opts.editMode ? "contentmanagement" /* OptiContentMode.Edit */ : "content" /* OptiContentMode.Delivery */ }, opts.urlParams));
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
    getResponse(url, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const reqInit = yield this.getRequestConfig(url.pathname, options);
            if (this._config.debug)
                console.debug("Request configuration", url.href, reqInit);
            const timeOut = (typeof (options === null || options === void 0 ? void 0 : options.timeOut) == 'number' && (options === null || options === void 0 ? void 0 : options.timeOut) > 0 ? options.timeOut : exports.DefaultRequestConfig.timeOut) * 1000;
            const abortController = new AbortController();
            const timeoutId = setTimeout(() => {
                console.warn(`Request to ${url.href} timed out`);
                abortController.abort();
            }, timeOut);
            const response = yield (0, cross_fetch_1.default)(url.href, Object.assign(Object.assign({}, reqInit), { signal: abortController.signal })).then(response => {
                if (this._config.debug)
                    console.log(`Response received: HTTP Status ${response.status}: ${response.statusText}`);
                clearTimeout(timeoutId);
                if (!response.ok)
                    throw new NetworkError_1.NetworkError(`HTTP Error ${response.status}: ${response.statusText} for ${url.href}`, response);
                return response.json();
            }).then(data => {
                if (this._config.debug)
                    console.debug('Response received: Data', data);
                return data;
            });
            return response;
        });
    }
    /**
     * Build the Fetch configuration object to be given to the fetch implementation
     * currently in use
     *
     * @param   path    The path to be invoked by fetch
     * @param   config  The configuration for the current request
     * @returns The configuration for the fetch request
     */
    getRequestConfig(path, config) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const reqInit = {
                method: (_b = (_a = config === null || config === void 0 ? void 0 : config.method) === null || _a === void 0 ? void 0 : _a.toUpperCase()) !== null && _b !== void 0 ? _b : "GET",
                credentials: 'include',
                headers: yield this.getHeaders(path, config),
            };
            if (config === null || config === void 0 ? void 0 : config.body)
                reqInit.body = config.body;
            return reqInit;
        });
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
    getHeaders(path, config) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const defaultHeaders = {
                'Accept': 'application/json',
                'Content-Type': 'application/json', // Request data format
            };
            // Add Authorization if needed
            if (this._config.getAccessToken) {
                defaultHeaders["Authorization"] = `Bearer ${yield this._config.getAccessToken(path)}`;
            }
            else if (this._accessToken) {
                defaultHeaders["Authorization"] = `Bearer ${this._accessToken}`;
            }
            // Set language
            if (config === null || config === void 0 ? void 0 : config.branch) {
                defaultHeaders["Accept-Language"] = config.branch;
                defaultHeaders["X-IContent-Language"] = config.branch;
            }
            else if (this._config.defaultBranch) {
                defaultHeaders["Accept-Language"] = this._config.defaultBranch;
                defaultHeaders["X-IContent-Language"] = this._config.defaultBranch;
            }
            if (config === null || config === void 0 ? void 0 : config.editMode) {
                defaultHeaders["X-PreviewMode"] = "edit";
            }
            const requestHeaders = Object.assign(Object.assign({}, defaultHeaders), config === null || config === void 0 ? void 0 : config.headers);
            //console.log("Request Headers", requestHeaders)
            return requestHeaders;
        });
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
        var _a, _b, _c;
        const output = Object.assign(Object.assign({}, exports.DefaultRequestConfig), options);
        // Propagate the Optimizely Edit Mode Query Parameters configurations
        try {
            const windowSearchParams = new URLSearchParams((_a = window === null || window === void 0 ? void 0 : window.location) === null || _a === void 0 ? void 0 : _a.search);
            const urlParams = (_b = output.urlParams) !== null && _b !== void 0 ? _b : {};
            exports.OptiEditQueryParams.forEach(param => {
                if (!urlParams[param] && windowSearchParams.has(param)) {
                    urlParams[param] = windowSearchParams.get(param);
                }
            });
            output.urlParams = urlParams;
        }
        catch (e) {
            output.urlParams = (_c = output.urlParams) !== null && _c !== void 0 ? _c : {};
        }
        // Process select parameter
        if (!output.urlParams['select'])
            if (options === null || options === void 0 ? void 0 : options.select)
                if (options.select[0] !== '*')
                    output.urlParams['select'] = options.select.join(',');
                else if (this._config.selectAllProperties === false)
                    output.urlParams['select'] = '-';
        // Process expand parameter
        if (!output.urlParams['expand'])
            if (options === null || options === void 0 ? void 0 : options.expand)
                output.urlParams['expand'] = options.expand.join(',');
            else if (this._config.expandAllProperties === true)
                output.urlParams['expand'] = '*';
        // Enforce edit mode propagation, if we're in edit mode
        if ((0, util_1.inEditMode)(false))
            output.urlParams['epieditmode'] = 'true';
        // Add branch into URL to simplify caching
        const branch = (options === null || options === void 0 ? void 0 : options.branch) || this._config.defaultBranch;
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
exports.ContentDeliveryAPI = ContentDeliveryAPI;
exports.default = ContentDeliveryAPI;
//# sourceMappingURL=content-delivery-api.js.map