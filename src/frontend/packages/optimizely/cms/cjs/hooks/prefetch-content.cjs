"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preFetchContent = void 0;
const tslib_1 = require("tslib");
const content_uri_1 = require("./content-uri");
const use_content_1 = require("./use-content");
/**
 * Helper function to pre-fetch content for the useContent / useContents hooks, which enables SSR/SSG of these content items
 *
 * @param contentReferences     The references to the content items to fetch
 * @param select                The fields to select (same for all referenced items)
 * @param expand                The fields to automatically expand (same for all referenced items)
 * @param branch                The language to use
 * @param inEditMode
 * @param scope
 * @returns
 */
function preFetchContent(contentReferences, select, expand, branch, inEditMode = false, scope, api) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        // Batch-load all content items
        const contents = yield Promise.all(contentReferences.map((ref) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const contentId = (0, content_uri_1.buildContentURI)(ref, select, expand, branch, inEditMode, scope);
            try {
                const c = yield (0, use_content_1.contentFetcher)(contentId, api);
                return {
                    content: c,
                    contentId: contentId.href,
                    error: undefined
                };
            }
            catch (e) {
                return {
                    content: undefined,
                    contentId: contentId.href,
                    error: e
                };
            }
        })));
        // Construct prefetched result
        const fetched = { fallback: {}, errors: {} };
        for (const contentItem of contents) {
            if (contentItem.content)
                fetched.fallback[contentItem.contentId] = contentItem.content;
            if (contentItem.error)
                fetched.errors[contentItem.contentId] = contentItem.error;
        }
        return fetched;
    });
}
exports.preFetchContent = preFetchContent;
//# sourceMappingURL=prefetch-content.js.map