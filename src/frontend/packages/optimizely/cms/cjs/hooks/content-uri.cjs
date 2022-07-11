"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseContentURI = exports.buildContentURI = exports.CMS_CONTENT_PROTOCOL = void 0;
const content_reference_1 = require("../util/content-reference");
exports.CMS_CONTENT_PROTOCOL = 'opti-cms:';
function buildContentURI(contentReference, select, expand, branch, inEditMode = false, scope) {
    //console.log("Building contentURI with branch", branch)
    const path = Array.isArray(contentReference) ?
        contentReference.map(r => (0, content_reference_1.createApiId)(r, true, inEditMode)).join('/') :
        (0, content_reference_1.createApiId)(contentReference, true, inEditMode);
    const contentRef = new URL(exports.CMS_CONTENT_PROTOCOL + "/" + path);
    if (select)
        contentRef.searchParams.set("select" /* CONTENT_PARAMS.Select */, select.map(x => encodeURIComponent(x)).join(','));
    if (expand)
        contentRef.searchParams.set("expand" /* CONTENT_PARAMS.Expand */, expand.map(x => encodeURIComponent(x)).join(','));
    if (inEditMode)
        contentRef.searchParams.set("epieditmode" /* CONTENT_PARAMS.InEditMode */, "true");
    if (branch)
        contentRef.searchParams.set("branch" /* CONTENT_PARAMS.Language */, branch);
    if (scope)
        contentRef.searchParams.set("scope" /* CONTENT_PARAMS.Scope */, scope);
    //console.log("Generated content id", contentRef.href, "for language", branch)
    return contentRef;
}
exports.buildContentURI = buildContentURI;
function parseContentURI(contentURI) {
    var _a, _b;
    const uri = typeof (contentURI) === 'string' ? new URL(contentURI) : contentURI;
    if (uri.protocol !== exports.CMS_CONTENT_PROTOCOL)
        throw new Error("Invalid content protocol");
    const contentIds = uri.pathname.substring(1).split('/');
    const select = (uri.searchParams.get("select" /* CONTENT_PARAMS.Select */) ? (_a = uri.searchParams.get("select" /* CONTENT_PARAMS.Select */)) === null || _a === void 0 ? void 0 : _a.split(",") : undefined);
    const expand = (uri.searchParams.get("expand" /* CONTENT_PARAMS.Expand */) ? (_b = uri.searchParams.get("expand" /* CONTENT_PARAMS.Expand */)) === null || _b === void 0 ? void 0 : _b.split(",") : undefined);
    const editMode = uri.searchParams.get("epieditmode" /* CONTENT_PARAMS.InEditMode */) === 'true';
    const branch = (uri.searchParams.get("branch" /* CONTENT_PARAMS.Language */) ? uri.searchParams.get("branch" /* CONTENT_PARAMS.Language */) : undefined);
    const scope = (uri.searchParams.get("scope" /* CONTENT_PARAMS.Scope */) ? uri.searchParams.get("scope" /* CONTENT_PARAMS.Scope */) : undefined);
    return { contentIds, select, expand, editMode, branch, scope };
}
exports.parseContentURI = parseContentURI;
//# sourceMappingURL=content-uri.js.map