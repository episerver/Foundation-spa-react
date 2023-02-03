"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWebsite = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../provider/index");
const swr_1 = tslib_1.__importDefault(require("swr"));
const CURRENT_SITE_KEY = 'current';
const UNKNOWN_SITE_KEY = 'unknown';
const SITE_SCHEME = 'opti-site:';
const isDevelopment = process.env.NODE_ENV == 'development';
function useWebsite(fallbackData, siteDomain, locale) {
    const api = (0, index_1.useOptimizelyCms)().api;
    const swrKey = createSwrKey(siteDomain);
    function fetchSite(siteId) {
        return siteFetcher(siteId, api);
    }
    return (0, swr_1.default)(swrKey, fetchSite, { fallbackData: fallbackData, suspense: true });
}
exports.useWebsite = useWebsite;
/**
 * Perform the actual fetch of data from the backend
 *
 * @param siteId    The SiteID to load
 * @param api       The connection to use
 * @returns         The loaded and transformed data
 */
const siteFetcher = (siteId, api) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    const request = parseSwrKey(siteId);
    if (!api)
        return null;
    const websites = yield api.getWebsites();
    const hosts = websites.filter(w => { var _a, _b; return (_b = (_a = w.hosts) === null || _a === void 0 ? void 0 : _a.some(h => h.name == request.site)) !== null && _b !== void 0 ? _b : false; });
    const starHost = websites.filter(w => { var _a, _b; return (_b = (_a = w.hosts) === null || _a === void 0 ? void 0 : _a.some(h => h.name === "*")) !== null && _b !== void 0 ? _b : false; })[0];
    const site = hosts.length > 0 ? hosts[0] : starHost;
    if (!site)
        return null;
    const info = {
        name: site.name,
        id: site.id,
        startPage: (_b = (_a = site.contentRoots) === null || _a === void 0 ? void 0 : _a.startPage) === null || _b === void 0 ? void 0 : _b.guidValue,
        startPageUrl: (_d = (_c = site.contentRoots) === null || _c === void 0 ? void 0 : _c.startPage) === null || _d === void 0 ? void 0 : _d.url,
        locales: ((_e = site.languages) !== null && _e !== void 0 ? _e : []).map(x => x.name),
        defaultLocale: (_g = ((_f = site.languages) !== null && _f !== void 0 ? _f : []).filter(x => x.isMasterLanguage === true).map(x => x.name)[0]) !== null && _g !== void 0 ? _g : ((_h = site.languages) !== null && _h !== void 0 ? _h : []).slice(0, 1).map(x => x.name)[0],
        labels: ((_j = site.languages) !== null && _j !== void 0 ? _j : []).map(x => { return { code: x.name, label: x.displayName }; }),
        primaryDomain: (_l = ((_k = site.hosts) !== null && _k !== void 0 ? _k : []).filter(x => x.type === "Primary").map(x => `http${isDevelopment ? '' : 's'}://${x.name}`)[0]) !== null && _l !== void 0 ? _l : "",
        domains: ((_m = site.hosts) !== null && _m !== void 0 ? _m : []).filter(x => x.type !== "Edit").map(x => `http${isDevelopment ? '' : 's'}://${x.name}`),
        localeDomains: ((_o = site.hosts) !== null && _o !== void 0 ? _o : []).filter(x => { var _a; return x.type !== "Edit" && ((_a = x.language) === null || _a === void 0 ? void 0 : _a.name); }).map(x => { var _a; return { domain: `http${isDevelopment ? '' : 's'}://${x.name}`, defaultLocale: (_a = x.language) === null || _a === void 0 ? void 0 : _a.name }; })
    };
    return info;
});
function parseSwrKey(swrKey) {
    const keyUrl = new URL(swrKey);
    return {
        site: keyUrl.host,
        locale: keyUrl.searchParams.get('locale') || undefined
    };
}
function createSwrKey(siteDomain, locale) {
    // If we don't have a site domain, use the current
    if (!siteDomain)
        siteDomain = CURRENT_SITE_KEY;
    // Resolve the current site or fall-back to "unknown"
    if (siteDomain == CURRENT_SITE_KEY) {
        try {
            siteDomain = window.location.host;
        }
        catch (_a) {
            siteDomain = UNKNOWN_SITE_KEY;
        }
    }
    // Build the scheme / key
    const scheme = new URL(`${SITE_SCHEME}/${siteDomain}`);
    if (locale)
        scheme.searchParams.set('locale', locale);
    return scheme.href;
}
//#endregion
exports.default = useWebsite;
//# sourceMappingURL=use-website.js.map