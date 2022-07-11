"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentFetcher = exports.useContent = void 0;
const tslib_1 = require("tslib");
const content_delivery_1 = require("../content-delivery");
const swr_1 = tslib_1.__importDefault(require("swr"));
const use_1 = tslib_1.__importDefault(require("../provider/use"));
const __1 = require("..");
const content_uri_1 = require("./content-uri");
const util_1 = require("../util");
function useContent(contentReference, select, expand, branch, scope, inEditMode) {
    const opti = (0, use_1.default)();
    const contentBranch = branch || opti.defaultBranch;
    const loadInEditMode = inEditMode === undefined ? opti.inEditMode : inEditMode;
    const contentId = (0, content_uri_1.buildContentURI)(contentReference, select, expand, contentBranch, loadInEditMode, scope);
    // Define fetcher
    const fetchContent = (cUri) => (0, exports.contentFetcher)(cUri, opti.api);
    // Define SWR content
    const content = (0, swr_1.default)(contentId.href, fetchContent, {
        compare(a, b) {
            if (a == b)
                return true;
            if (a == undefined || b == undefined) // If either side is undefined, it's always unequal
                return false;
            const idA = util_1.ContentReference.createLanguageId(a, contentBranch, loadInEditMode);
            const idB = util_1.ContentReference.createLanguageId(a, contentBranch, loadInEditMode);
            return idA == idB;
        }
    });
    return content;
}
exports.useContent = useContent;
const contentFetcher = (contentURI, api) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    // console.log(api ? "Existing API" : "New API")
    api = api !== null && api !== void 0 ? api : __1.ContentDelivery.createInstance({ debug: false });
    //console.log(contentURI);
    const { contentIds, select, expand, editMode, branch, scope } = (0, content_uri_1.parseContentURI)(contentURI);
    if (contentIds.length != 1)
        throw new Error(`useContent requires a single content item to be specified, you have provided ${contentIds.length} items`);
    if (editMode && !api.hasAccessToken())
        throw new Error(`Edit mode content cannot be retrieved whilest there's no access token configured`);
    const data = yield api.getContent(contentIds[0], { select, expand, editMode, branch }).catch(e => {
        if ((0, content_delivery_1.isNetworkError)(e)) {
            let type = "Generic";
            let message = `HTTP ${e.status}: ${e.statusText}`;
            switch (e.status) {
                case 401:
                    type = "Authentication";
                    break;
                case 404:
                    type = "NotFound";
                    message = `Content with ID ${contentIds[0]} not found (${contentURI.toString()})`;
            }
            throw util_1.IContent.createErrorContent(type, e.status, message, contentIds[0], e);
        }
        throw util_1.IContent.createErrorContent("Generic", 500, "Uknown Error", contentIds[0], e);
    });
    if (scope)
        console.log("TODO: Add content filtering & recursion");
    if (!data)
        throw util_1.IContent.createErrorContent("NotFound", 404, `Content with ID ${contentIds[0]} not loadable (${contentURI.toString()})`, contentIds[0]);
    return data;
});
exports.contentFetcher = contentFetcher;
//# sourceMappingURL=use-content.js.map