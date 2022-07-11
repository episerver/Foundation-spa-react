import { isNetworkError } from '../content-delivery';
import useSWR from 'swr';
import useOptimizely from '../provider/use';
import { ContentDelivery } from '..';
import { buildContentURI, parseContentURI } from './content-uri';
import { IContent as IC, ContentReference as CR } from '../util';
export function useContent(contentReference, select, expand, branch, scope, inEditMode) {
    const opti = useOptimizely();
    const contentBranch = branch || opti.defaultBranch;
    const loadInEditMode = inEditMode === undefined ? opti.inEditMode : inEditMode;
    const contentId = buildContentURI(contentReference, select, expand, contentBranch, loadInEditMode, scope);
    // Define fetcher
    const fetchContent = (cUri) => contentFetcher(cUri, opti.api);
    // Define SWR content
    const content = useSWR(contentId.href, fetchContent, {
        compare(a, b) {
            if (a == b)
                return true;
            if (a == undefined || b == undefined) // If either side is undefined, it's always unequal
                return false;
            const idA = CR.createLanguageId(a, contentBranch, loadInEditMode);
            const idB = CR.createLanguageId(a, contentBranch, loadInEditMode);
            return idA == idB;
        }
    });
    return content;
}
export const contentFetcher = async (contentURI, api) => {
    // console.log(api ? "Existing API" : "New API")
    api = api ?? ContentDelivery.createInstance({ debug: false });
    //console.log(contentURI);
    const { contentIds, select, expand, editMode, branch, scope } = parseContentURI(contentURI);
    if (contentIds.length != 1)
        throw new Error(`useContent requires a single content item to be specified, you have provided ${contentIds.length} items`);
    if (editMode && !api.hasAccessToken())
        throw new Error(`Edit mode content cannot be retrieved whilest there's no access token configured`);
    const data = await api.getContent(contentIds[0], { select, expand, editMode, branch }).catch(e => {
        if (isNetworkError(e)) {
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
            throw IC.createErrorContent(type, e.status, message, contentIds[0], e);
        }
        throw IC.createErrorContent("Generic", 500, "Uknown Error", contentIds[0], e);
    });
    if (scope)
        console.log("TODO: Add content filtering & recursion");
    if (!data)
        throw IC.createErrorContent("NotFound", 404, `Content with ID ${contentIds[0]} not loadable (${contentURI.toString()})`, contentIds[0]);
    return data;
};
//# sourceMappingURL=use-content.js.map