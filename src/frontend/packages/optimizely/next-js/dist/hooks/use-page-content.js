import { useOptimizelyCms, useEditMode } from '@optimizely/cms/context';
import useSWR from 'swr';
import { loadAdditionalPropsAndFilter, createApiId } from '@optimizely/cms/utils';
import { useRouter } from 'next/router';
const DEBUG_ENABLED = process.env.NODE_ENV != "production";
export function usePageContent(ref, inEditMode, locale) {
    if (DEBUG_ENABLED) {
        console.groupCollapsed("Optimizely - Next.JS: usePageContent");
        console.log("Optimizely - Next.JS: usePageContent - Reference:", ref);
    }
    const opti = useOptimizelyCms();
    const editModeInfo = useEditMode();
    const router = useRouter();
    const editMode = inEditMode ?? editModeInfo.isEditable;
    const contentId = ref ? createApiId(ref, true, editMode) : '#';
    const pageLocale = locale ?? router.locale ?? router.defaultLocale;
    if (DEBUG_ENABLED) {
        console.log("Optimizely - Next.JS: usePageContent - Content ID:", contentId);
        console.log("Optimizely - Next.JS: usePageContent - Edit Mode:", editMode);
        console.log("Optimizely - Next.JS: usePageContent - Locale:", pageLocale);
        console.groupEnd();
    }
    const api = opti.api;
    if (!api)
        throw new Error("Optimizely not initialized");
    const fetcher = (id) => fetchPageContent(id, api, pageLocale, editMode);
    return useSWR(contentId, fetcher);
}
async function fetchPageContent(ref, api, locale, inEditMode = false) {
    if (DEBUG_ENABLED)
        console.log("usePageContent.fetcher: Fetching page data", ref, locale, inEditMode);
    if (!ref || ref === '#')
        return undefined;
    const contentId = createApiId(ref, true, inEditMode);
    const content = await api.getContent(contentId, {
        branch: locale,
        editMode: inEditMode,
        urlParams: {}
    }).catch(e => {
        if (DEBUG_ENABLED)
            console.error("usePageContent.fetcher: Error while communicating with Content Cloud", e);
        throw e;
    });
    if (DEBUG_ENABLED)
        console.log("usePageContent.fetcher: Received page data", content);
    if (!content)
        return undefined;
    return content;
}
export async function loadPageContentByUrl(url, api, locale, inEditMode = false, cLoader) {
    var path = typeof (url) === 'object' && url !== null ? url.href : url;
    const content = await api.resolveRoute(path, {
        branch: locale,
        editMode: inEditMode,
        urlParams: {}
    }).catch((e) => {
        console.error(e);
    });
    if (!content)
        return undefined;
    const contentId = createApiId(content, true, inEditMode);
    return await iContentDataToProps(content, contentId, api, locale, inEditMode, cLoader);
}
export async function loadPageContent(ref, api, locale, inEditMode = false, cLoader) {
    const contentId = createApiId(ref, true, inEditMode);
    const content = await api.getContent(contentId, {
        branch: locale,
        editMode: inEditMode,
        urlParams: {},
        select: ["*"]
    }).catch(() => undefined);
    if (!content)
        return undefined;
    return await iContentDataToProps(content, contentId, api, locale, inEditMode, cLoader);
}
async function iContentDataToProps(content, contentId, api, locale, inEditMode = false, cLoader) {
    const props = await loadAdditionalPropsAndFilter(content, api, locale, inEditMode, undefined, cLoader);
    if (!props.fallback)
        props.fallback = {};
    props.fallback[contentId] = content;
    const ct = content.contentType ?? [];
    const prefix = ct[0] ?? 'page';
    const pageProps = {
        ...props,
        fallback: props.fallback ?? {},
        contentId,
        locale: content.language.name,
        inEditMode,
        prefix,
        component: content.contentType
    };
    if (pageProps.content)
        delete pageProps.content;
    return pageProps;
}
export default usePageContent;
//# sourceMappingURL=use-page-content.js.map