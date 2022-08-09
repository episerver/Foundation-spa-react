import useSWR from 'swr';
import useOptimizely from '../provider/use';
import { isNetworkError } from '../content-delivery';
import { ContentDelivery } from '..';
import { buildContentURI, parseContentURI } from './content-uri';
import { IContent as IC } from '../util';
export function useContents(contentReferences, select, expand, branch, scope, inEditMode) {
    const opti = useOptimizely();
    const contentBranch = branch || opti.defaultBranch;
    const loadInEditMode = inEditMode === undefined ? opti.inEditMode : inEditMode;
    const contentIds = buildContentURI(contentReferences, select, expand, contentBranch, loadInEditMode, scope);
    const fetchContents = (cUri) => contentsFetcher(cUri, opti.api);
    return useSWR(contentIds.href, fetchContents, {
        onError(err, key, config) {
            console.warn("Error resolving SWR", key, err);
        },
    });
}
export const contentsFetcher = async (contentUri, api) => {
    api = api ?? ContentDelivery.createInstance({ debug: false });
    const { contentIds, select, expand, editMode, branch, scope } = parseContentURI(contentUri);
    const loadableContentIds = contentIds.filter(x => x.trim().length > 0);
    const data = await api.getContents(loadableContentIds, { select, expand, editMode, branch }).catch(e => {
        if (isNetworkError(e)) {
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
            throw IC.createErrorContent(type, code, message, loadableContentIds.join(", "), e);
        }
        throw IC.createErrorContent("Generic", 500, "Unknown error", loadableContentIds.join(", "), e);
    });
    if (scope)
        console.log("TODO: Add content filtering & recursion");
    if (!data)
        return [];
    if (data.length != loadableContentIds.length)
        console.warn(`Not all content found: ${contentUri.toString()}, found ${data.length} of ${contentIds.length} items`);
    return data;
};
//# sourceMappingURL=use-contents.js.map