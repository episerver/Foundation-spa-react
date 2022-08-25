import type { ContentDelivery } from '@optimizely/cms'
import type { IContentData, ContentTypePath, ContentReference } from '@optimizely/cms/models'
import { useOptimizely } from '@optimizely/cms'
import useSWR from 'swr'
import { loadAdditionalPropsAndFilter, filterProps, createApiId } from '@optimizely/cms/utils'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'

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
    baseType?: string

    /**
     * The components required to render the page
     */
    components : ContentTypePath[]
} & Record<string, any>

export function usePageContent(ref: ContentReference, inEditMode ?: boolean, locale ?: string)
{
    const opti = useOptimizely()
    const router = useRouter()
    const editMode = inEditMode === undefined ? opti.isEditable : inEditMode
    const contentId = ref ? createApiId(ref, true, editMode) : '#'
    const pageLocale = locale ?? router.locale ?? router.defaultLocale

    const api = opti.api
    if (!api)
        throw new Error("Optimizely not initialized")

    const fetchContent = async (id: string) => {
        await getSession()
        const content = await fetchPageContent(id, api, undefined, editMode)
        return content;
    }

    return useSWR<IContentData | undefined, {}, string>(contentId, fetchContent)
}

async function fetchPageContent(ref: ContentReference, api: ContentDelivery.IContentDeliveryAPI, locale?: string, inEditMode: boolean = false) : Promise<IContentData | undefined>
{
    if (!ref || ref === '#') 
        return undefined
        
    //console.log("Fetching Page Content:", ref)

    const contentId = createApiId(ref, true, inEditMode)
    const content = await api.getContent(contentId, {
        branch: locale,
        editMode: inEditMode,
        urlParams: {}
    }).catch(() => undefined)

    if (!content)
        return undefined

    return filterProps(content, api, locale, inEditMode)
}

export async function loadPageContentByUrl(url: URL|string, api: ContentDelivery.IContentDeliveryAPI, locale?: string, inEditMode: boolean = false) : Promise<PageRenderingProps | undefined>
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
    
    return await iContentDataToProps(content, contentId, api, locale, inEditMode)
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
export async function loadPageContent(ref: ContentReference, api: ContentDelivery.IContentDeliveryAPI, locale?: string, inEditMode: boolean = false) : Promise<PageRenderingProps | undefined>
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

    return await iContentDataToProps(content, contentId, api, locale, inEditMode)
}

async function iContentDataToProps(content: IContentData, contentId: string, api: ContentDelivery.IContentDeliveryAPI, locale?: string, inEditMode: boolean = false) : Promise<PageRenderingProps>
{
    const props = await loadAdditionalPropsAndFilter(content, api, locale, inEditMode)
    if(!props.fallback) props.fallback = {}
    props.fallback[contentId] = content

    const ct : string[] = content.contentType ?? []
    const baseType = ct[0] ?? 'page'

    const pageProps : PageRenderingProps = {
        ...props,
        fallback: props.fallback ?? {},
        contentId,
        locale: content.language.name,
        inEditMode,
        baseType,
        components: [ content.contentType ]
    }
    if (pageProps.content)
        delete pageProps.content
    return pageProps
}

export default usePageContent