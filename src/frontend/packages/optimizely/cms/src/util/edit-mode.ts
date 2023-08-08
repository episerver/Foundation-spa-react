import { ContentLink } from '../models'
import Guid from './guid'

/**
 * Define the admin prefix needed to process the URLs, allowing the scripts to 
 * cope with different CMS configurations
 */
//const AdminPrefix = (process.env.OPTIMIZELY_DXP_ADMIN_PREFIX ?? 'EPiServer').split('/').filter(x => x).join('/')

/**
 * Parse the given URL into a URL object, defaulting to "window.location" if 
 * there is no URL provided.
 * 
 * @param       currentUrl  The given URL, or null or undefined if unknown
 * @returns     The processed URL as URL object
 * @throws      When there's no URL provided and we're running outside of a browser
 */
function getUrl(currentUrl ?: URL | string | null) : URL
{
    var url = currentUrl ? 
            (typeof(currentUrl) === 'string' ? new URL(currentUrl, 'http://localhost/') : currentUrl) : 
            new URL(window.location.href)
    return url;
}

export function getCurrentUrl(defaultUrl ?: URL | string | null) : URL
{
    var cUrl = tryGetWindowUrl(defaultUrl)
    return (typeof(cUrl) === 'string' ? new URL(cUrl, 'http://localhost/') : cUrl) ?? new URL('http://localhost')
}

/**
 * Helper method to get the Window URL (window.location.href), and fall back to
 * the provided URL. The window URL will always be returned as a string, the
 * other return types only appear when current gets returned.
 * 
 * This method does neither alter nor recreate the variables
 * 
 * @param       current
 * @returns     window.location.href OR current
 */
export function tryGetWindowUrl<T extends string | null | URL = string | null | URL>(current ?: T) : string | undefined | T
{
    try {
        return window.location.href
    } catch {
        return current
    }
}

export type EditModeContentInfo = ContentLink & {
    /**
     * Set to true when we're in edit mode and the preview of the content
     * is active
     */
    isPreviewActive: boolean

    /**
     * The current content path
     */
    contentPath: string

    /**
     * The currently selected project, undefined if no project has been 
     * selected
     */
    projectId?: number

    /**
     * The content reference, which includes the version number as well if specified
     */
    contentReference?: string

    /**
     * The VisitorGroup Preview Identifier
     */
    visitorGroupsById?: string

    /**
     * The VisitorGroup Preview Identifier
     */
    visitorGroupsByName?: string

    locale?: string
}

export function isEditModeUrl(currentUrl ?: URL | string | null) : boolean
{
    try {
        const url = getUrl(currentUrl)
        const path = url.pathname
        const mode = url.searchParams.get('mode')
        if (path.endsWith(`/opti.${ mode }`) || path.endsWith(`/opti.${ mode }.json`)) {
            var id = url.searchParams.get('id');
            return typeof(id) == 'string' && id != null && id.length > 0 && (url.searchParams.get('hash') ?? '').startsWith(`${id}:`)
        }
        return false
    } catch {
        return false
    }
}

export function getEditModeInfo(currentUrl ?: URL | string | null) : EditModeContentInfo | undefined
{
    try {
        const url = getUrl(currentUrl);
        if (!isEditModeUrl(url))
            return undefined

        const isPreviewActive = url.searchParams.get('epieditmode') === 'false'
        const contentPath = url.searchParams.get('path') ?? '/'
        const contentFullId = (url.searchParams.get('id') ?? '0').split('_')
        const siteUrl = new URL(contentPath, url)
        const id = parseInt(contentFullId[0] ?? '0')
        const workId = parseInt(contentFullId[1] ?? '0') || undefined
        const projectId = parseInt(url.searchParams.get('epiprojects') ?? '0') || undefined
        const contentReference = `${id}${ workId ? "_" + workId : ""}`
        const visitorGroupsById = url.searchParams.get("visitorgroupsByID") ?? undefined
        const visitorGroupsByName = url.searchParams.get("visitorgroupsByName") ?? undefined
        const locale = url.searchParams.get('epibranch') ?? undefined

        return {
            guidValue: Guid.Empty,
            id,
            workId,
            url: siteUrl.href,
            isPreviewActive,
            contentPath,
            projectId,
            contentReference,
            visitorGroupsById,
            visitorGroupsByName,
            locale
        }
    } catch {
        return undefined
    }    
}
