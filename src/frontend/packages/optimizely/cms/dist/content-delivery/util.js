export const DEFAULT_VERSION = '3.0';
export function getEndpoint(endpoint, version = DEFAULT_VERSION) {
    const vars = { version };
    const path = endpoint.replace(/\{\s*\$([^\s]+?)\s*\}/gi, (fullMatch, varName, index, input) => {
        return encodeURIComponent(vars[varName] ?? '');
    });
    return path;
}
export class UrlBuilderException extends Error {
    constructor(endpoint, service, path, sourceError) {
        super(`Error building request URL for the ${endpoint} service`);
        this.endpoint = endpoint;
        this.service = service;
        this.path = path;
        this.sourceError = sourceError;
    }
}
export function buildUrl(baseUrl, endpoint, variables, version = DEFAULT_VERSION) {
    // Ensure we've the version in the variables
    if (!variables['version'])
        variables['version'] = version;
    //Make sure we have a valid content mode
    if (!variables['contentMode'] || (variables['contentMode'] !== "content" /* OptiContentMode.Delivery */ && variables['contentMode'] !== "contentmanagement" /* OptiContentMode.Edit */)) {
        variables['contentMode'] = variables['epieditmode'] === 'True' ? "contentmanagement" /* OptiContentMode.Edit */ : "content" /* OptiContentMode.Delivery */;
    }
    // Build the path
    const path = endpoint.replace(/\{\s*\$([^\s]+?)\s*\}/gi, (fullMatch, varName, index, input) => {
        const val = variables[varName] ?? undefined;
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
export function isOnLine() {
    try {
        if (navigator && !navigator.onLine)
            return false;
    }
    catch (e) {
        // There's no navigator object with onLine property...
    }
    return true;
}
export function inEpiserverShell() {
    try {
        return window !== window?.top && window?.name === 'sitePreview';
    }
    catch (e) {
        // Ignored on purpose
    }
    return false;
}
export function inEditMode(defaultValue = false) {
    try {
        const url = new URL(window.location.href);
        if (url.searchParams.has("epieditmode" /* OptiQueryParams.EditMode */) && url.searchParams.get("epieditmode" /* OptiQueryParams.EditMode */)?.toLowerCase() == 'true')
            return true;
        return window?.epi?.inEditMode === true;
    }
    catch (e) { }
    return defaultValue;
}
//# sourceMappingURL=util.js.map