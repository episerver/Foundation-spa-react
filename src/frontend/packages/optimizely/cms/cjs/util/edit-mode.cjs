"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEditModeInfo = exports.isEditModeUrl = exports.tryGetWindowUrl = void 0;
const tslib_1 = require("tslib");
const guid_1 = tslib_1.__importDefault(require("./guid"));
/**
 * Define the admin prefix needed to process the URLs, allowing the scripts to
 * cope with different CMS configurations
 */
const AdminPrefix = ((_a = process.env.OPTIMIZELY_DXP_ADMIN_PREFIX) !== null && _a !== void 0 ? _a : 'EPiServer').split('/').filter(x => x).join('/');
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
        (typeof (currentUrl) === 'string' ? new URL(currentUrl) : currentUrl) :
        new URL(window.location.href);
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
function tryGetWindowUrl(current) {
    try {
        return window.location.href;
    }
    catch (_a) {
        return current;
    }
}
exports.tryGetWindowUrl = tryGetWindowUrl;
function isEditModeUrl(currentUrl) {
    try {
        const url = getUrl(currentUrl);
        const path = url.pathname;
        if (path.startsWith(`/${AdminPrefix}/CMS/Content`) || path.startsWith(`/${AdminPrefix}/CMS/Content`.toLowerCase())) {
            return path.includes(",,") && (url.searchParams.get('epieditmode') === 'true' || url.searchParams.get('epieditmode') === 'false');
        }
        return false;
    }
    catch (_a) {
        return false;
    }
}
exports.isEditModeUrl = isEditModeUrl;
function getEditModeInfo(currentUrl) {
    var _a, _b, _c, _d;
    try {
        const url = getUrl(currentUrl);
        if (!isEditModeUrl(url))
            return undefined;
        const isPreviewActive = url.searchParams.get('epieditmode') === 'false';
        var pattern = new RegExp(`/${AdminPrefix}/CMS/Content`, 'i');
        const contentPath = url.pathname.replace(pattern, '').split(',,', 2)[0];
        const contentFullId = ((_a = url.pathname.split(',,', 2)[1]) !== null && _a !== void 0 ? _a : '0').split('_');
        const siteUrl = new URL(contentPath, url);
        const id = parseInt((_b = contentFullId[0]) !== null && _b !== void 0 ? _b : '0');
        const workId = parseInt((_c = contentFullId[1]) !== null && _c !== void 0 ? _c : '0') || undefined;
        const projectId = parseInt((_d = url.searchParams.get('epiprojects')) !== null && _d !== void 0 ? _d : '0') || undefined;
        const contentReference = `${id}${workId ? "_" + workId : ""}`;
        return {
            guidValue: guid_1.default.Empty,
            id,
            workId,
            url: siteUrl.href,
            isPreviewActive,
            contentPath,
            projectId,
            contentReference
        };
    }
    catch (_e) {
        return undefined;
    }
}
exports.getEditModeInfo = getEditModeInfo;
//# sourceMappingURL=edit-mode.js.map