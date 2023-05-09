import { createApiId } from '../util/content-reference';
export const CMS_CONTENT_PROTOCOL = 'opti-cms:';
export var CONTENT_PARAMS;
(function (CONTENT_PARAMS) {
    CONTENT_PARAMS["Select"] = "select";
    CONTENT_PARAMS["Expand"] = "expand";
    CONTENT_PARAMS["InEditMode"] = "epieditmode";
    CONTENT_PARAMS["Language"] = "branch";
    CONTENT_PARAMS["Scope"] = "scope";
    CONTENT_PARAMS["VisitorGroup"] = "vg";
})(CONTENT_PARAMS || (CONTENT_PARAMS = {}));
export function buildContentURI(contentReference, select, expand, branch, inEditMode = false, scope, visitorGroup) {
    //console.log("Building contentURI with branch", branch)
    const path = Array.isArray(contentReference) ?
        contentReference.map(r => createApiId(r, true, inEditMode)).join('/') :
        createApiId(contentReference, true, inEditMode);
    const contentRef = new URL(CMS_CONTENT_PROTOCOL + "/" + path);
    if (!visitorGroup)
        try {
            visitorGroup = (new URL(window.location.href)).searchParams.get("visitorgroupsByID") ?? undefined;
        }
        catch (e) {
            //Ignored on purpose
        }
    if (select)
        contentRef.searchParams.set(CONTENT_PARAMS.Select, select.map(x => encodeURIComponent(x)).join(','));
    if (expand)
        contentRef.searchParams.set(CONTENT_PARAMS.Expand, expand.map(x => encodeURIComponent(x)).join(','));
    if (inEditMode)
        contentRef.searchParams.set(CONTENT_PARAMS.InEditMode, "true");
    if (branch)
        contentRef.searchParams.set(CONTENT_PARAMS.Language, branch);
    if (scope)
        contentRef.searchParams.set(CONTENT_PARAMS.Scope, scope);
    if (visitorGroup)
        contentRef.searchParams.set(CONTENT_PARAMS.VisitorGroup, visitorGroup);
    //console.log("Generated content id", contentRef.href, "for language", branch)
    return contentRef;
}
export function parseContentURI(contentURI) {
    const uri = typeof (contentURI) === 'string' ? new URL(contentURI) : contentURI;
    if (uri.protocol !== CMS_CONTENT_PROTOCOL)
        throw new Error("Invalid content protocol");
    const contentIds = uri.pathname.substring(1).split('/');
    const select = (uri.searchParams.get(CONTENT_PARAMS.Select) ? uri.searchParams.get(CONTENT_PARAMS.Select)?.split(",") : undefined);
    const expand = (uri.searchParams.get(CONTENT_PARAMS.Expand) ? uri.searchParams.get(CONTENT_PARAMS.Expand)?.split(",") : undefined);
    const editMode = uri.searchParams.get(CONTENT_PARAMS.InEditMode) === 'true';
    const branch = (uri.searchParams.get(CONTENT_PARAMS.Language) ? uri.searchParams.get(CONTENT_PARAMS.Language) : undefined);
    const scope = (uri.searchParams.get(CONTENT_PARAMS.Scope) ? uri.searchParams.get(CONTENT_PARAMS.Scope) : undefined);
    const visitorGroup = uri.searchParams.get(CONTENT_PARAMS.VisitorGroup) ?? undefined;
    return { contentIds, select, expand, editMode, branch, scope, visitorGroup };
}
export function isContentURI(toTest) {
    var urlString = typeof (toTest) == 'object' && toTest != null && toTest.href ? toTest.href : toTest;
    if (typeof (urlString) != 'string')
        return false;
    return urlString.startsWith(CMS_CONTENT_PROTOCOL);
}
//# sourceMappingURL=content-uri.js.map