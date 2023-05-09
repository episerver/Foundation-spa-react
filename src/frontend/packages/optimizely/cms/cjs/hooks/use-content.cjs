"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentFetcher = exports.useContent = void 0;
const tslib_1 = require("tslib");
const NetworkError_1 = require("../content-delivery/NetworkError");
const swr_1 = tslib_1.__importDefault(require("swr"));
const cms_1 = require("../provider/cms");
const edit_mode_1 = require("../provider/edit-mode");
const factory_1 = tslib_1.__importDefault(require("../content-delivery/factory"));
const content_uri_1 = require("./content-uri");
const icontent_1 = require("../util/icontent");
const content_reference_1 = require("../util/content-reference");
//import { processValue } from '../util/property'
const react_1 = require("react");
const ERROR_URL = 'error:/empty-id';
const DEBUG_ENABLED = process.env.NODE_ENV != 'production';
function useContent(contentReference, select, expand, branch, scope, inEditMode) {
    const opti = (0, cms_1.useOptimizelyCms)();
    const editMode = (0, edit_mode_1.useEditMode)();
    const contentBranch = branch || opti.defaultBranch;
    const loadInEditMode = inEditMode === undefined ? editMode.inEditMode : inEditMode;
    // Create memoized values so we're preventing over-fetching as much as possible
    const contentId = (0, react_1.useMemo)(() => {
        if (contentReference)
            return (0, content_uri_1.buildContentURI)(contentReference, select, expand, contentBranch, loadInEditMode, scope).href;
        return ERROR_URL;
    }, [contentReference, select, expand, contentBranch, loadInEditMode, scope]);
    const fallbackData = (0, react_1.useMemo)(() => (0, icontent_1.isIContent)(contentReference) ? contentReference : undefined, [contentReference]);
    // Define fetcher
    const fetchContent = (cUri) => {
        if (cUri == ERROR_URL)
            return null;
        return (0, exports.contentFetcher)(cUri, opti.api);
    };
    // Define SWR content
    const content = (0, swr_1.default)(contentId, fetchContent, {
        compare(a, b) {
            if (a == b)
                return true;
            if (a == undefined || b == undefined) // If either side is undefined, it's always unequal
                return false;
            if (loadInEditMode) // In edit mode always update the view
                return false;
            const idA = (0, content_reference_1.createLanguageId)(a, contentBranch, loadInEditMode);
            const idB = (0, content_reference_1.createLanguageId)(a, contentBranch, loadInEditMode);
            return idA == idB;
        },
        fallbackData
    });
    return content;
}
exports.useContent = useContent;
const contentFetcher = (contentURI, api) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (DEBUG_ENABLED)
        console.log("Optimizely - CMS: useContent > fetcher:", contentURI);
    api = api !== null && api !== void 0 ? api : (0, factory_1.default)({ debug: false });
    const { contentIds, select, expand, editMode, branch, scope } = (0, content_uri_1.parseContentURI)(contentURI);
    if (contentIds.length != 1)
        throw (0, icontent_1.createErrorContent)("Generic", 500, `useContent requires a single content item to be specified, you have provided ${contentIds.length} items`, contentIds === null || contentIds === void 0 ? void 0 : contentIds.join("; "));
    if (editMode && !api.hasAccessToken())
        console.warn("Trying to retrieve edit mode content without being authenticated - this will not work.");
    if (!contentIds[0])
        return null;
    if (contentIds[0] == "-") {
        if (DEBUG_ENABLED)
            console.error("Optimizely - CMS: useContent > trying to load an invalid contentId!", new Error().stack);
        throw (0, icontent_1.createErrorContent)("NotFound", 404, "Not Found", contentIds === null || contentIds === void 0 ? void 0 : contentIds.join("; "), (new Error()).stack);
    }
    const data = yield api.getContent(contentIds[0], { select, expand, editMode, branch }).catch(e => {
        if ((0, NetworkError_1.isNetworkError)(e)) {
            let type = "Generic";
            let message = `HTTP ${e.status}: ${e.statusText}`;
            switch (e.status) {
                case 401:
                    type = "Authentication";
                    break;
                case 404:
                    type = "NotFound";
                    message = `Content with ID ${contentIds[0]} not found (${contentURI.toString()})`;
                    return undefined;
            }
            throw (0, icontent_1.createErrorContent)(type, e.status, message, contentIds[0], e);
        }
        throw (0, icontent_1.createErrorContent)("Generic", 500, "Uknown Error", contentIds[0], e);
    });
    if (scope && DEBUG_ENABLED)
        console.log("Optimizely - CMS: useContent > fetcher - TODO: Add content filtering & recursion for scope", scope);
    if (!data)
        return null;
    //throw IC.createErrorContent("NotFound", 404, `Content with ID ${ contentIds[0] } not loadable (${ contentURI.toString() })`, contentIds[0])
    return data;
});
exports.contentFetcher = contentFetcher;
//# sourceMappingURL=use-content.js.map