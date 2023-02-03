import useSWR from 'swr';
import { useMemo } from 'react';
import { useOptimizelyCms } from '../provider/cms';
import { useEditMode } from '../provider/edit-mode';
import { isNetworkError } from '../content-delivery/NetworkError';
import createApiClient from '../content-delivery/factory';
import { buildContentURI, parseContentURI } from './content-uri';
import { createErrorContent } from '../util/icontent';
export function useContents(contentReferences, select, expand, branch, scope, inEditMode) {
    const opti = useOptimizelyCms();
    const editMode = useEditMode();
    const contentBranch = branch || opti.defaultBranch;
    const loadInEditMode = inEditMode === undefined ? editMode.inEditMode : inEditMode;
    const contentIds = useMemo(() => buildContentURI(contentReferences, select, expand, contentBranch, loadInEditMode, scope), [contentReferences, select, expand, contentBranch, loadInEditMode, scope]);
    const fetchContents = (cUri) => contentsFetcher(cUri, opti.api);
    return useSWR(contentIds.href, fetchContents, {
        onError(err, key, config) {
            console.warn("Error resolving SWR", key, err);
        }
    });
}
export const contentsFetcher = async (contentUri, api) => {
    api = api ?? createApiClient({ debug: false });
    const { contentIds, select, expand, editMode, branch, scope } = parseContentURI(contentUri);
    const loadableContentIds = contentIds.filter(x => x.trim().length > 0 && x.trim() != "-");
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
            throw createErrorContent(type, code, message, loadableContentIds.join(", "), e);
        }
        throw createErrorContent("Generic", 500, "Unknown error", loadableContentIds.join(", "), e);
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