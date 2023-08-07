import { useOptimizelyCms, useEditMode } from '@optimizely/cms/context';
import useSWR from 'swr';
import { loadAdditionalPropsAndFilter, createApiId, ContentReference as ContentReferenceUtils } from '@optimizely/cms/utils';
import { useRouter } from 'next/router';
const { createLanguageId } = ContentReferenceUtils;
const DEBUG_ENABLED = process.env.NODE_ENV != "production";
export function usePageContent(ref, inEditMode, locale) {
    const opti = useOptimizelyCms();
    const editModeInfo = useEditMode();
    const router = useRouter();
    const editMode = inEditMode ?? editModeInfo.isEditable;
    const contentId = ref ? createApiId(ref, true, editMode) : '#';
    const pageLocale = locale ?? router.locale ?? router.defaultLocale;
    const api = opti.api;
    if (!api)
        throw new Error("Optimizely not initialized");
    const fetcher = (id) => fetchPageContent(id, api, pageLocale, editMode);
    return useSWR(contentId, fetcher, {
        compare(a, b) {
            if (a == b)
                return true;
            if (a == undefined || b == undefined)
                return false;
            if (editMode)
                return false;
            const idA = createLanguageId(a, pageLocale, editMode);
            const idB = createLanguageId(a, pageLocale, editMode);
            return idA == idB;
        }
    });
}
async function fetchPageContent(ref, api, locale, inEditMode = false) {
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
    const prefix = (ct[0] ?? 'Page');
    const pageProps = {
        ...props,
        fallback: props.fallback ?? {},
        contentId,
        locale: content.language.name,
        inEditMode,
        prefix,
        component: content.contentType,
        baseType: prefix
    };
    if (pageProps.content)
        delete pageProps.content;
    return pageProps;
}
export default usePageContent;
//# sourceMappingURL=use-page-content.js.map