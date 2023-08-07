import { isNetworkError } from '../content-delivery/NetworkError';
import useSWR from 'swr';
import { useOptimizelyCms } from '../provider/cms';
import { useEditMode } from '../provider/edit-mode';
import createInstance from '../content-delivery/factory';
import { CMS_LOCAL_CONTENT_PATH, buildContentURI, parseContentURI } from './content-uri';
import { createErrorContent, isIContent } from '../util/icontent';
import { createLanguageId } from '../util/content-reference';
import { useMemo } from 'react';
const ERROR_URL = 'error:/empty-id';
const DEBUG_ENABLED = process.env.NODE_ENV != 'production';
export function useContent(contentReference, select, expand, branch, scope, inEditMode) {
    const opti = useOptimizelyCms();
    const editMode = useEditMode();
    const contentBranch = branch || opti.defaultBranch;
    const loadInEditMode = inEditMode === undefined ? editMode.inEditMode : inEditMode;
    const vg = editMode.visitorgroupsById;
    // Create memoized values so we're preventing over-fetching as much as possible
    const contentId = useMemo(() => {
        if (contentReference)
            return buildContentURI(contentReference, select, expand, contentBranch, loadInEditMode, scope, vg).href;
        return ERROR_URL;
    }, [contentReference, select, expand, contentBranch, loadInEditMode, scope, vg]);
    const fallbackData = useMemo(() => isIContent(contentReference) ? contentReference : undefined, [contentReference]);
    // Define fetcher
    const fetchContent = (cUri) => {
        if (cUri.toString() == ERROR_URL)
            return null;
        const { contentIds } = parseContentURI(cUri);
        //console.log("fetchContent", contentIds, fallbackData)
        if (contentIds.length == 1 && contentIds[0] == CMS_LOCAL_CONTENT_PATH)
            return fallbackData ?? null;
        return contentFetcher(cUri, opti.api);
    };
    // Define SWR content
    const content = useSWR(contentId, fetchContent, {
        compare(a, b) {
            if (a == b)
                return true;
            if (a == undefined || b == undefined) // If either side is undefined, it's always unequal
                return false;
            if (loadInEditMode) // In edit mode always update the view
                return false;
            const idA = createLanguageId(a, contentBranch, loadInEditMode);
            const idB = createLanguageId(a, contentBranch, loadInEditMode);
            return idA == idB;
        },
        fallbackData
    });
    return content;
}
export const contentFetcher = async (contentURI, api) => {
    //if (DEBUG_ENABLED) console.log("Optimizely - CMS: useContent > fetcher:", contentURI)
    api = api ?? createInstance({ debug: false });
    const { contentIds, select, expand, editMode, branch, scope, visitorGroup } = parseContentURI(contentURI);
    if (contentIds.length != 1)
        throw createErrorContent("Generic", 500, `useContent requires a single content item to be specified, you have provided ${contentIds.length} items`, contentIds?.join("; "));
    if (editMode && !api.hasAccessToken())
        console.warn("Trying to retrieve edit mode content without being authenticated - this will not work.");
    if (!contentIds[0])
        return null;
    if (contentIds[0] == CMS_LOCAL_CONTENT_PATH)
        return null;
    if (contentIds[0] == "-") {
        if (DEBUG_ENABLED)
            console.error("Optimizely - CMS: useContent > trying to load an invalid contentId!", new Error().stack);
        throw createErrorContent("NotFound", 404, "Not Found", contentIds?.join("; "), (new Error()).stack);
    }
    const urlParams = visitorGroup ? {
        visitorgroupsByID: visitorGroup
    } : undefined;
    const data = await api.getContent(contentIds[0], { select, expand, editMode, branch, urlParams }).catch(e => {
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
                    return undefined;
            }
            throw createErrorContent(type, e.status, message, contentIds[0], e);
        }
        throw createErrorContent("Generic", 500, "Uknown Error", contentIds[0], e);
    });
    if (scope && DEBUG_ENABLED)
        console.log("Optimizely - CMS: useContent > fetcher - TODO: Add content filtering & recursion for scope", scope);
    if (!data)
        return null;
    //throw IC.createErrorContent("NotFound", 404, `Content with ID ${ contentIds[0] } not loadable (${ contentURI.toString() })`, contentIds[0])
    return data;
};
//# sourceMappingURL=use-content.js.map