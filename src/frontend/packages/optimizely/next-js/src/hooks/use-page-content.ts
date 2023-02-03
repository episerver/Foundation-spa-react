import type { ComponentLoader, IContentDeliveryAPI } from '@optimizely/cms/types'
import type { IContentData, ContentTypePath, ContentReference } from '@optimizely/cms/models'
import { useOptimizelyCms, useEditMode } from '@optimizely/cms/context'
import useSWR from 'swr'
import { loadAdditionalPropsAndFilter, filterProps, createApiId } from '@optimizely/cms/utils'
import { useRouter } from 'next/router'

const DEBUG_ENABLED = process.env.NODE_ENV != "production";

export type PageRenderingProps = {

    /**
     * The identifier for the current content
     */
    contentId: string

    /**
     * Fallback data for useSWR based hooks used within the
     * page.
     */
    fallback : Record<string, any>

    /**
     * The locale used to fetch the content
     */
    locale: string

    /**
     * Marker to tell the system the page is in edit mode
     */
    inEditMode?: boolean

    /**
     * Marker to indicate the base type of the referenced content
     */
    prefix?: string

    /**
     * The component required to render the page
     */
    component : ContentTypePath
} & Record<string, any>

export function usePageContent(ref: ContentReference, inEditMode ?: boolean, locale ?: string)
{
    if (DEBUG_ENABLED) {
        console.groupCollapsed("Optimizely - Next.JS: usePageContent")
        console.log("Optimizely - Next.JS: usePageContent - Reference:", ref)
    }
    const opti = useOptimizelyCms()
    const editModeInfo = useEditMode()
    const router = useRouter()
    const editMode = inEditMode ?? editModeInfo.isEditable
    const contentId = ref ? createApiId(ref, true, editMode) : '#'
    const pageLocale = locale ?? router.locale ?? router.defaultLocale
    if (DEBUG_ENABLED) {
        console.log("Optimizely - Next.JS: usePageContent - Content ID:", contentId)
        console.log("Optimizely - Next.JS: usePageContent - Edit Mode:", editMode)
        console.log("Optimizely - Next.JS: usePageContent - Locale:", pageLocale)
        console.groupEnd()
    }

    const api = opti.api
    if (!api)
        throw new Error("Optimizely not initialized")

    const fetcher = (id: string) => fetchPageContent(id, api, pageLocale, editMode)

    return useSWR<IContentData | undefined, {}, string>(contentId, fetcher)
}

async function fetchPageContent(ref: ContentReference, api: IContentDeliveryAPI, locale?: string, inEditMode: boolean = false) : Promise<IContentData | undefined>
{
    if (DEBUG_ENABLED)
        console.log("usePageContent.fetcher: Fetching page data", ref, locale, inEditMode)

    if (!ref || ref === '#') 
        return undefined

    const contentId = createApiId(ref, true, inEditMode)
    const content = await api.getContent(contentId, {
        branch: locale,
        editMode: inEditMode,
        urlParams: {}
    }).catch(e => {
        if (DEBUG_ENABLED)
            console.error("usePageContent.fetcher: Error while communicating with Content Cloud", e)
        throw e
        //return undefined
    })

    if (DEBUG_ENABLED)
        console.log("usePageContent.fetcher: Received page data", content)

    if (!content)
        return undefined

    return content //filterProps(content, api, locale, inEditMode)
}

export async function loadPageContentByUrl(url: URL|string, api: IContentDeliveryAPI, locale?: string, inEditMode: boolean = false, cLoader?: ComponentLoader) : Promise<PageRenderingProps | undefined>
{
    var path = typeof(url) === 'object' && url !== null ? url.href : url
    const content = await api.resolveRoute(path, {
        branch: locale,
        editMode: inEditMode,
        urlParams: {}
    }).catch((e) => {
        console.error(e)
    })

    if (!content)
        return undefined

    const contentId = createApiId(content, true, inEditMode)
    
    return await iContentDataToProps(content, contentId, api, locale, inEditMode, cLoader)
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
export async function loadPageContent(ref: ContentReference, api: IContentDeliveryAPI, locale?: string, inEditMode: boolean = false, cLoader ?: ComponentLoader) : Promise<PageRenderingProps | undefined>
{
    const contentId = createApiId(ref, true, inEditMode)
    const content = await api.getContent(contentId, {
        branch: locale,
        editMode: inEditMode,
        urlParams: {},
        select: ["*"]
    }).catch(() => undefined)

    if (!content)
        return undefined

    return await iContentDataToProps(content, contentId, api, locale, inEditMode, cLoader)
}

async function iContentDataToProps(content: IContentData, contentId: string, api: IContentDeliveryAPI, locale?: string, inEditMode: boolean = false, cLoader ?: ComponentLoader) : Promise<PageRenderingProps>
{
    const props = await loadAdditionalPropsAndFilter(content, api, locale, inEditMode, undefined, cLoader)
    if(!props.fallback) props.fallback = {}
    props.fallback[contentId] = content

    const ct : string[] = content.contentType ?? []
    const prefix = ct[0] ?? 'page'

    const pageProps : PageRenderingProps = {
        ...props,
        fallback: props.fallback ?? {},
        contentId,
        locale: content.language.name,
        inEditMode,
        prefix,
        component: content.contentType
    }
    if (pageProps.content)
        delete pageProps.content
    return pageProps
}

export default usePageContent