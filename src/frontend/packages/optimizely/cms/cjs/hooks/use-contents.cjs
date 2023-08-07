"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentsFetcher = exports.useContents = void 0;
const tslib_1 = require("tslib");
const swr_1 = tslib_1.__importDefault(require("swr"));
const react_1 = require("react");
const cms_1 = require("../provider/cms");
const edit_mode_1 = require("../provider/edit-mode");
const NetworkError_1 = require("../content-delivery/NetworkError");
const factory_1 = tslib_1.__importDefault(require("../content-delivery/factory"));
const content_uri_1 = require("./content-uri");
const icontent_1 = require("../util/icontent");
function useContents(contentReferences, select, expand, branch, scope, inEditMode) {
    const opti = (0, cms_1.useOptimizelyCms)();
    const editMode = (0, edit_mode_1.useEditMode)();
    const contentBranch = branch || opti.defaultBranch;
    const loadInEditMode = inEditMode === undefined ? editMode.inEditMode : inEditMode;
    const visitorGroupsById = editMode.visitorgroupsById;
    const contentIds = (0, react_1.useMemo)(() => (0, content_uri_1.buildContentURI)(contentReferences, select, expand, contentBranch, loadInEditMode, scope, visitorGroupsById), [contentReferences, select, expand, contentBranch, loadInEditMode, scope, visitorGroupsById]);
    const fetchContents = (cUri) => (0, exports.contentsFetcher)(cUri, opti.api);
    return (0, swr_1.default)(contentIds.href, fetchContents, {
        onError(err, key, config) {
            console.warn("Error resolving SWR", key, err);
        }
    });
}
exports.useContents = useContents;
const contentsFetcher = (contentUri, api) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    api = api !== null && api !== void 0 ? api : (0, factory_1.default)({ debug: false });
    const { contentIds, select, expand, editMode, branch, scope, visitorGroup } = (0, content_uri_1.parseContentURI)(contentUri);
    const loadableContentIds = contentIds.filter(x => x.trim().length > 0 && x.trim() != "-");
    const urlParams = visitorGroup ? { visitorgroupsByID: visitorGroup } : undefined;
    const data = yield api.getContents(loadableContentIds, { select, expand, editMode, branch, urlParams }).catch(e => {
        if ((0, NetworkError_1.isNetworkError)(e)) {
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
            throw (0, icontent_1.createErrorContent)(type, code, message, loadableContentIds.join(", "), e);
        }
        throw (0, icontent_1.createErrorContent)("Generic", 500, "Unknown error", loadableContentIds.join(", "), e);
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