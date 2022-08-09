"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentsFetcher = exports.useContents = void 0;
const tslib_1 = require("tslib");
const swr_1 = tslib_1.__importDefault(require("swr"));
const use_1 = tslib_1.__importDefault(require("../provider/use"));
const content_delivery_1 = require("../content-delivery");
const __1 = require("..");
const content_uri_1 = require("./content-uri");
const util_1 = require("../util");
function useContents(contentReferences, select, expand, branch, scope, inEditMode) {
    const opti = (0, use_1.default)();
    const contentBranch = branch || opti.defaultBranch;
    const loadInEditMode = inEditMode === undefined ? opti.inEditMode : inEditMode;
    const contentIds = (0, content_uri_1.buildContentURI)(contentReferences, select, expand, contentBranch, loadInEditMode, scope);
    const fetchContents = (cUri) => (0, exports.contentsFetcher)(cUri, opti.api);
    return (0, swr_1.default)(contentIds.href, fetchContents, {
        onError(err, key, config) {
            console.warn("Error resolving SWR", key, err);
        },
    });
}
exports.useContents = useContents;
const contentsFetcher = (contentUri, api) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    api = api !== null && api !== void 0 ? api : __1.ContentDelivery.createInstance({ debug: false });
    const { contentIds, select, expand, editMode, branch, scope } = (0, content_uri_1.parseContentURI)(contentUri);
    const loadableContentIds = contentIds.filter(x => x.trim().length > 0);
    const data = yield api.getContents(loadableContentIds, { select, expand, editMode, branch }).catch(e => {
        if ((0, content_delivery_1.isNetworkError)(e)) {
            let type = "Generic";
            const code = e.status;
            let message = `HTTP ${e.status}: ${e.statusText}`;
            switch (code) {
                case 401:
                    type = "Authentication";
                    break;
                case 404:
                    type = "NotFound";
                    message = `One of the content items could not be found ${loadableContentIds.join(", ")} (${contentUri.toString()})`;
                    break;
            }
            throw util_1.IContent.createErrorContent(type, code, message, loadableContentIds.join(", "), e);
        }
        throw util_1.IContent.createErrorContent("Generic", 500, "Unknown error", loadableContentIds.join(", "), e);
    });
    if (scope)
        console.log("TODO: Add content filtering & recursion");
    if (!data)
        return [];
    if (data.length != loadableContentIds.length)
        console.warn(`Not all content found: ${contentUri.toString()}, found ${data.length} of ${contentIds.length} items`);
    return data;
});
exports.contentsFetcher = contentsFetcher;
//# sourceMappingURL=use-contents.js.map