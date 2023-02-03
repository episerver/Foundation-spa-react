import Guid from './guid';
/**
 * Define the admin prefix needed to process the URLs, allowing the scripts to
 * cope with different CMS configurations
 */
const AdminPrefix = (process.env.OPTIMIZELY_DXP_ADMIN_PREFIX ?? 'EPiServer').split('/').filter(x => x).join('/');
/**
 * Parse the given URL into a URL object, defaulting to "window.location" if
 * there is no URL provided.
 *
 * @param       currentUrl  The given URL, or null or undefined if unknown
 * @returns     The processed URL as URL object
 * @throws      When there's no URL provided and we're running outside of a browser
 */
function getUrl(currentUrl) {
    var url = currentUrl ?
        (typeof (currentUrl) === 'string' ? new URL(currentUrl, 'http://localhost/') : currentUrl) :
        new URL(window.location.href);
    return url;
}
export function getCurrentUrl(defaultUrl) {
    var cUrl = tryGetWindowUrl(defaultUrl);
    return (typeof (cUrl) === 'string' ? new URL(cUrl, 'http://localhost/') : cUrl) ?? new URL('http://localhost');
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
export function tryGetWindowUrl(current) {
    try {
        return window.location.href;
    }
    catch {
        return current;
    }
}
export function isEditModeUrl(currentUrl) {
    try {
        const url = getUrl(currentUrl);
        const path = url.pathname;
        if (path.startsWith(`/${AdminPrefix}/CMS/Content`) || path.startsWith(`/${AdminPrefix}/CMS/Content`.toLowerCase())) {
            return path.includes(",,") && (url.searchParams.get('epieditmode') === 'true' || url.searchParams.get('epieditmode') === 'false');
        }
        return false;
    }
    catch {
        return false;
    }
}
export function getEditModeInfo(currentUrl) {
    try {
        const url = getUrl(currentUrl);
        if (!isEditModeUrl(url))
            return undefined;
        const isPreviewActive = url.searchParams.get('epieditmode') === 'false';
        var pattern = new RegExp(`/${AdminPrefix}/CMS/Content`, 'i');
        const contentPath = url.pathname.replace(pattern, '').split(',,', 2)[0];
        const contentFullId = (url.pathname.split(',,', 2)[1] ?? '0').split('_');
        const siteUrl = new URL(contentPath, url);
        const id = parseInt(contentFullId[0] ?? '0');
        const workId = parseInt(contentFullId[1] ?? '0') || undefined;
        const projectId = parseInt(url.searchParams.get('epiprojects') ?? '0') || undefined;
        const contentReference = `${id}${workId ? "_" + workId : ""}`;
        return {
            guidValue: Guid.Empty,
            id,
            workId,
            url: siteUrl.href,
            isPreviewActive,
            contentPath,
            projectId,
            contentReference
        };
    }
    catch {
        return undefined;
    }
}
//# sourceMappingURL=edit-mode.js.map