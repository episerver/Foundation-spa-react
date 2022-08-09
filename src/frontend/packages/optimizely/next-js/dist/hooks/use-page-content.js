import { useOptimizely } from '@optimizely/cms';
import useSWR from 'swr';
import { loadAdditionalPropsAndFilter, filterProps, createApiId } from '@optimizely/cms/utils';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
export function usePageContent(ref, inEditMode, locale) {
    const opti = useOptimizely();
    const router = useRouter();
    const editMode = inEditMode === undefined ? opti.isEditable : inEditMode;
    const contentId = ref ? createApiId(ref, true, editMode) : '#';
    const pageLocale = locale ?? router.locale ?? router.defaultLocale;
    const api = opti.api;
    if (!api)
        throw new Error("Optimizely not initialized");
    const fetchContent = async (id) => {
        await getSession();
        const content = await fetchPageContent(id, api, undefined, editMode);
        return content;
    };
    return useSWR(contentId, fetchContent);
}
async function fetchPageContent(ref, api, locale, inEditMode = false) {
    if (!ref || ref === '#')
        return undefined;
    //console.log("Fetching Page Content:", ref)
    const contentId = createApiId(ref, true, inEditMode);
    const content = await api.getContent(contentId, {
        branch: locale,
        editMode: inEditMode,
        urlParams: {}
    }).catch(() => undefined);
    if (!content)
        return undefined;
    return filterProps(content, api, locale, inEditMode);
}
/**
 * Helper function to load the content needed to render a page, based on a contentId
 *
 * @param ref           The Content Reference to load the content for
 * @param api           The Content Delivery API client to use
 * @param locale        The current language
 * @param inEditMode    Whether or not to load from the draft versions
 * @returns             The data for the apge
 */
export async function loadPageContent(ref, api, locale, inEditMode = false) {
    const contentId = createApiId(ref, true, inEditMode);
    const content = await api.getContent(contentId, {
        branch: locale,
        editMode: inEditMode,
        urlParams: {}
    }).catch(() => undefined);
    if (!content)
        return undefined;
    const props = await loadAdditionalPropsAndFilter(content, api, locale, inEditMode);
    if (!props.fallback)
        props.fallback = {};
    props.fallback[contentId] = content;
    const ct = content.contentType ?? [];
    const baseType = ct[0] ?? 'page';
    const pageProps = {
        ...props,
        fallback: props.fallback ?? {},
        contentId,
        locale: content.language.name,
        inEditMode,
        baseType,
        components: [content.contentType]
    };
    if (pageProps.content)
        delete pageProps.content;
    return pageProps;
}
/**
 * Helper function to load the content needed to render a page, based on a contentId
 *
 * @param url           The path to load the content for
 * @param api           The Content Delivery API client to use
 * @param locale        The current language
 * @param inEditMode    Whether or not to load from the draft versions
 * @returns             The data for the apge
 */
export async function loadPageContentByURL(url, api, locale, inEditMode = false) {
    // Resolve by URL
    const content = await api.resolveRoute(url, { branch: locale, editMode: false }).catch(e => {
        console.error("ERROR Resolving by route", e);
        return undefined;
    });
    if (!content)
        return undefined;
    const props = await loadAdditionalPropsAndFilter(content, api, locale, inEditMode);
    if (!props.fallback)
        props.fallback = {};
    const contentId = createApiId(content, true, inEditMode);
    props.fallback[contentId] = content;
    const ct = content.contentType ?? [];
    const baseType = ct[0] ?? 'page';
    const pageProps = {
        ...props,
        fallback: props.fallback ?? {},
        contentId,
        locale: content.language.name,
        inEditMode,
        baseType,
        components: [content.contentType]
    };
    if (pageProps.content)
        delete pageProps.content;
    return pageProps;
}
export default usePageContent;
//# sourceMappingURL=use-page-content.js.map