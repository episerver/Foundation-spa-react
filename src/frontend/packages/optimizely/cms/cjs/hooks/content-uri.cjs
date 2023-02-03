"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseContentURI = exports.buildContentURI = exports.CONTENT_PARAMS = exports.CMS_CONTENT_PROTOCOL = void 0;
const content_reference_1 = require("../util/content-reference");
exports.CMS_CONTENT_PROTOCOL = 'opti-cms:';
var CONTENT_PARAMS;
(function (CONTENT_PARAMS) {
    CONTENT_PARAMS["Select"] = "select";
    CONTENT_PARAMS["Expand"] = "expand";
    CONTENT_PARAMS["InEditMode"] = "epieditmode";
    CONTENT_PARAMS["Language"] = "branch";
    CONTENT_PARAMS["Scope"] = "scope";
    CONTENT_PARAMS["VisitorGroup"] = "vg";
})(CONTENT_PARAMS = exports.CONTENT_PARAMS || (exports.CONTENT_PARAMS = {}));
function buildContentURI(contentReference, select, expand, branch, inEditMode = false, scope, visitorGroup) {
    var _a;
    //console.log("Building contentURI with branch", branch)
    const path = Array.isArray(contentReference) ?
        contentReference.map(r => (0, content_reference_1.createApiId)(r, true, inEditMode)).join('/') :
        (0, content_reference_1.createApiId)(contentReference, true, inEditMode);
    const contentRef = new URL(exports.CMS_CONTENT_PROTOCOL + "/" + path);
    if (!visitorGroup)
        try {
            visitorGroup = (_a = (new URL(window.location.href)).searchParams.get("visitorgroupsByID")) !== null && _a !== void 0 ? _a : undefined;
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
exports.buildContentURI = buildContentURI;
function parseContentURI(contentURI) {
    var _a, _b, _c;
    const uri = typeof (contentURI) === 'string' ? new URL(contentURI) : contentURI;
    if (uri.protocol !== exports.CMS_CONTENT_PROTOCOL)
        throw new Error("Invalid content protocol");
    const contentIds = uri.pathname.substring(1).split('/');
    const select = (uri.searchParams.get(CONTENT_PARAMS.Select) ? (_a = uri.searchParams.get(CONTENT_PARAMS.Select)) === null || _a === void 0 ? void 0 : _a.split(",") : undefined);
    const expand = (uri.searchParams.get(CONTENT_PARAMS.Expand) ? (_b = uri.searchParams.get(CONTENT_PARAMS.Expand)) === null || _b === void 0 ? void 0 : _b.split(",") : undefined);
    const editMode = uri.searchParams.get(CONTENT_PARAMS.InEditMode) === 'true';
    const branch = (uri.searchParams.get(CONTENT_PARAMS.Language) ? uri.searchParams.get(CONTENT_PARAMS.Language) : undefined);
    const scope = (uri.searchParams.get(CONTENT_PARAMS.Scope) ? uri.searchParams.get(CONTENT_PARAMS.Scope) : undefined);
    const visitorGroup = (_c = uri.searchParams.get(CONTENT_PARAMS.VisitorGroup)) !== null && _c !== void 0 ? _c : undefined;
    return { contentIds, select, expand, editMode, branch, scope, visitorGroup };
}
exports.parseContentURI = parseContentURI;
//# sourceMappingURL=content-uri.js.map