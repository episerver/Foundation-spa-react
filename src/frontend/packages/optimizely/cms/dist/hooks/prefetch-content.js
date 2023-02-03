import { buildContentURI } from './content-uri';
import { contentFetcher } from './use-content';
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
export async function preFetchContent(contentReferences, select, expand, branch, inEditMode = false, scope, api) {
    // Batch-load all content items
    const contents = await Promise.all(contentReferences.map(async (ref) => {
        const contentId = buildContentURI(ref, select, expand, branch, inEditMode, scope);
        try {
            const c = await contentFetcher(contentId, api);
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
    }));
    // Construct prefetched result
    const fetched = { fallback: {}, errors: {} };
    for (const contentItem of contents) {
        if (contentItem.content)
            fetched.fallback[contentItem.contentId] = contentItem.content;
        if (contentItem.error)
            fetched.errors[contentItem.contentId] = contentItem.error;
    }
    return fetched;
}
//# sourceMappingURL=prefetch-content.js.map