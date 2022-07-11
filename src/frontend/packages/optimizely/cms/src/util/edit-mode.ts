import { ContentLink } from '../models'
import Guid from './guid'

/**
 * Define the admin prefix needed to process the URLs, allowing the scripts to 
 * cope with different CMS configurations
 */
const AdminPrefix = (process.env.OPTIMIZELY_DXP_ADMIN_PREFIX ?? 'EPiServer').split('/').filter(x => x).join('/')

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
            (typeof(currentUrl) === 'string' ? new URL(currentUrl) : currentUrl) : 
            new URL(window.location.href)
    return url;
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
export function tryGetWindowUrl(current ?: string | null | URL) : string | URL | null | undefined
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
}

export function isEditModeUrl(currentUrl ?: URL | string | null) : boolean
{
    try {
        const url = getUrl(currentUrl)
        return url.pathname.startsWith(`/${ AdminPrefix }/CMS/Content`) && url.pathname.includes(",,") && (url.searchParams.get('epieditmode') === 'true' || url.searchParams.get('epieditmode') === 'false')
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
        const contentPath = url.pathname.replace(`/${ AdminPrefix }/CMS/Content`, '').split(',,', 2)[0]
        const contentFullId = (url.pathname.split(',,', 2)[1] ?? '0').split('_')
        const siteUrl = new URL(contentPath, url)
        const id = parseInt(contentFullId[0] ?? '0')
        const workId = parseInt(contentFullId[1] ?? '0') || undefined
        const projectId = parseInt(url.searchParams.get('epiprojects') ?? '0') || undefined
        
        return {
            guidValue: Guid.Empty,
            id,
            workId,
            url: siteUrl.href,
            isPreviewActive,
            contentPath,
            projectId
        }
    } catch {
        return undefined
    }    
}
