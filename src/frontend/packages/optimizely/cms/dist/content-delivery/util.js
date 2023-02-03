export var OptiEndpoints;
(function (OptiEndpoints) {
    //'Content'    = 'api/episerver/v{ $version }/{ $contentMode }/{ $contentId }', // ContentManagement restricts to CommonDraft only....
    OptiEndpoints["Content"] = "api/episerver/v{ $version }/content/{ $contentId }";
    OptiEndpoints["Children"] = "api/episerver/v{ $version }/content/{ $contentId }/children";
    OptiEndpoints["Ancestors"] = "api/episerver/v{ $version }/content/{ $contentId }/ancestors";
    OptiEndpoints["Site"] = "api/episerver/v{ $version }/site/{ $siteId }";
    OptiEndpoints["Search"] = "api/episerver/v{ $version }/search/content/";
    OptiEndpoints["OAuth"] = "api/episerver/auth/token";
})(OptiEndpoints || (OptiEndpoints = {}));
export var OptiQueryParams;
(function (OptiQueryParams) {
    OptiQueryParams["EditMode"] = "epieditmode";
    OptiQueryParams["Project"] = "epiprojects";
    OptiQueryParams["Channel"] = "epichannel";
    OptiQueryParams["VisitorGroup"] = "visitorgroupsByID";
    OptiQueryParams["CommonDrafts"] = "commondrafts";
})(OptiQueryParams || (OptiQueryParams = {}));
export var OptiContentMode;
(function (OptiContentMode) {
    OptiContentMode["Delivery"] = "content";
    OptiContentMode["Edit"] = "contentmanagement";
})(OptiContentMode || (OptiContentMode = {}));
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
    if (!variables['contentMode'] || (variables['contentMode'] !== OptiContentMode.Delivery && variables['contentMode'] !== OptiContentMode.Edit)) {
        variables['contentMode'] = variables['epieditmode'] === 'True' ? OptiContentMode.Edit : OptiContentMode.Delivery;
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
        if (url.searchParams.has(OptiQueryParams.EditMode) && url.searchParams.get(OptiQueryParams.EditMode)?.toLowerCase() == 'true')
            return true;
        return window?.epi?.inEditMode === true;
    }
    catch (e) { }
    return defaultValue;
}
//# sourceMappingURL=util.js.map