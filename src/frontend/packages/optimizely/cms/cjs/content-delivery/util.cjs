"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inEditMode = exports.inEpiserverShell = exports.isOnLine = exports.buildUrl = exports.UrlBuilderException = exports.getEndpoint = exports.DEFAULT_VERSION = void 0;
exports.DEFAULT_VERSION = '3.0';
function getEndpoint(endpoint, version = exports.DEFAULT_VERSION) {
    const vars = { version };
    const path = endpoint.replace(/\{\s*\$([^\s]+?)\s*\}/gi, (fullMatch, varName, index, input) => {
        var _a;
        return encodeURIComponent((_a = vars[varName]) !== null && _a !== void 0 ? _a : '');
    });
    return path;
}
exports.getEndpoint = getEndpoint;
class UrlBuilderException extends Error {
    constructor(endpoint, service, path, sourceError) {
        super(`Error building request URL for the ${endpoint} service`);
        this.endpoint = endpoint;
        this.service = service;
        this.path = path;
        this.sourceError = sourceError;
    }
}
exports.UrlBuilderException = UrlBuilderException;
function buildUrl(baseUrl, endpoint, variables, version = exports.DEFAULT_VERSION) {
    // Ensure we've the version in the variables
    if (!variables['version'])
        variables['version'] = version;
    //Make sure we have a valid content mode
    if (!variables['contentMode'] || (variables['contentMode'] !== "content" /* OptiContentMode.Delivery */ && variables['contentMode'] !== "contentmanagement" /* OptiContentMode.Edit */)) {
        variables['contentMode'] = variables['epieditmode'] === 'True' ? "contentmanagement" /* OptiContentMode.Edit */ : "content" /* OptiContentMode.Delivery */;
    }
    // Build the path
    const path = endpoint.replace(/\{\s*\$([^\s]+?)\s*\}/gi, (fullMatch, varName, index, input) => {
        var _a;
        const val = (_a = variables[varName]) !== null && _a !== void 0 ? _a : undefined;
        if (val) {
            delete variables[varName];
            return encodeURIComponent(val);
        }
        return '';
    });
    // Construct actual URL
    let serviceUrl;
    try {
        serviceUrl = new URL(path, baseUrl);
        for (const idx in variables)
            serviceUrl.searchParams.set(idx, variables[idx]);
    }
    catch (e) {
        throw new UrlBuilderException(endpoint, baseUrl, path, e);
    }
    if (serviceUrl.searchParams.has("contentMode"))
        serviceUrl.searchParams.delete("contentMode");
    return serviceUrl;
}
exports.buildUrl = buildUrl;
function isOnLine() {
    try {
        if (navigator && !navigator.onLine)
            return false;
    }
    catch (e) {
        // There's no navigator object with onLine property...
    }
    return true;
}
exports.isOnLine = isOnLine;
function inEpiserverShell() {
    try {
        return window !== (window === null || window === void 0 ? void 0 : window.top) && (window === null || window === void 0 ? void 0 : window.name) === 'sitePreview';
    }
    catch (e) {
        // Ignored on purpose
    }
    return false;
}
exports.inEpiserverShell = inEpiserverShell;
function inEditMode(defaultValue = false) {
    var _a, _b;
    try {
        const url = new URL(window.location.href);
        if (url.searchParams.has("epieditmode" /* OptiQueryParams.EditMode */) && ((_a = url.searchParams.get("epieditmode" /* OptiQueryParams.EditMode */)) === null || _a === void 0 ? void 0 : _a.toLowerCase()) == 'true')
            return true;
        return ((_b = window === null || window === void 0 ? void 0 : window.epi) === null || _b === void 0 ? void 0 : _b.inEditMode) === true;
    }
    catch (e) { }
    return defaultValue;
}
exports.inEditMode = inEditMode;
//# sourceMappingURL=util.js.map