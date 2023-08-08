"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEditModeInfo = exports.isEditModeUrl = exports.tryGetWindowUrl = exports.getCurrentUrl = void 0;
const tslib_1 = require("tslib");
const guid_1 = tslib_1.__importDefault(require("./guid"));
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
function getUrl(currentUrl) {
    var url = currentUrl ?
        (typeof (currentUrl) === 'string' ? new URL(currentUrl, 'http://localhost/') : currentUrl) :
        new URL(window.location.href);
    return url;
}
function getCurrentUrl(defaultUrl) {
    var _a;
    var cUrl = tryGetWindowUrl(defaultUrl);
    return (_a = (typeof (cUrl) === 'string' ? new URL(cUrl, 'http://localhost/') : cUrl)) !== null && _a !== void 0 ? _a : new URL('http://localhost');
}
exports.getCurrentUrl = getCurrentUrl;
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
    var _a;
    try {
        const url = getUrl(currentUrl);
        const path = url.pathname;
        const mode = url.searchParams.get('mode');
        if (path.endsWith(`/opti.${mode}`) || path.endsWith(`/opti.${mode}.json`)) {
            var id = url.searchParams.get('id');
            return typeof (id) == 'string' && id != null && id.length > 0 && ((_a = url.searchParams.get('hash')) !== null && _a !== void 0 ? _a : '').startsWith(`${id}:`);
        }
        return false;
    }
    catch (_b) {
        return false;
    }
}
exports.isEditModeUrl = isEditModeUrl;
function getEditModeInfo(currentUrl) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    try {
        const url = getUrl(currentUrl);
        if (!isEditModeUrl(url))
            return undefined;
        const isPreviewActive = url.searchParams.get('epieditmode') === 'false';
        const contentPath = (_a = url.searchParams.get('path')) !== null && _a !== void 0 ? _a : '/';
        const contentFullId = ((_b = url.searchParams.get('id')) !== null && _b !== void 0 ? _b : '0').split('_');
        const siteUrl = new URL(contentPath, url);
        const id = parseInt((_c = contentFullId[0]) !== null && _c !== void 0 ? _c : '0');
        const workId = parseInt((_d = contentFullId[1]) !== null && _d !== void 0 ? _d : '0') || undefined;
        const projectId = parseInt((_e = url.searchParams.get('epiprojects')) !== null && _e !== void 0 ? _e : '0') || undefined;
        const contentReference = `${id}${workId ? "_" + workId : ""}`;
        const visitorGroupsById = (_f = url.searchParams.get("visitorgroupsByID")) !== null && _f !== void 0 ? _f : undefined;
        const visitorGroupsByName = (_g = url.searchParams.get("visitorgroupsByName")) !== null && _g !== void 0 ? _g : undefined;
        const locale = (_h = url.searchParams.get('epibranch')) !== null && _h !== void 0 ? _h : undefined;
        return {
            guidValue: guid_1.default.Empty,
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
        };
    }
    catch (_j) {
        return undefined;
    }
}
exports.getEditModeInfo = getEditModeInfo;
//# sourceMappingURL=edit-mode.js.map