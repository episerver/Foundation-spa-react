"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadPageContentByURL = exports.loadPageContent = exports.loadPageContentByUrl = exports.usePageContent = void 0;
const tslib_1 = require("tslib");
const cms_1 = require("@optimizely/cms");
const swr_1 = require("swr");
const utils_1 = require("@optimizely/cms/utils");
const react_1 = require("next-auth/react");
const router_1 = require("next/router");
function usePageContent(ref, inEditMode, locale) {
    var _a;
    const opti = (0, cms_1.useOptimizely)();
    const router = (0, router_1.useRouter)();
    const editMode = inEditMode === undefined ? opti.isEditable : inEditMode;
    const contentId = ref ? (0, utils_1.createApiId)(ref, true, editMode) : '#';
    const pageLocale = (_a = locale !== null && locale !== void 0 ? locale : router.locale) !== null && _a !== void 0 ? _a : router.defaultLocale;
    const api = opti.api;
    if (!api)
        throw new Error("Optimizely not initialized");
    const fetchContent = (id) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        yield (0, react_1.getSession)();
        const content = yield fetchPageContent(id, api, undefined, editMode);
        return content;
    });
    return (0, swr_1.default)(contentId, fetchContent);
}
exports.usePageContent = usePageContent;
function fetchPageContent(ref, api, locale, inEditMode = false) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!ref || ref === '#')
            return undefined;
        //console.log("Fetching Page Content:", ref)
        const contentId = (0, utils_1.createApiId)(ref, true, inEditMode);
        const content = yield api.getContent(contentId, {
            branch: locale,
            editMode: inEditMode,
            urlParams: {}
        }).catch(() => undefined);
        if (!content)
            return undefined;
        return (0, utils_1.filterProps)(content, api, locale, inEditMode);
    });
}
function loadPageContentByUrl(url, api, locale, inEditMode = false) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const content = yield api.resolveRoute(url.href, {
            branch: locale,
            editMode: inEditMode,
            urlParams: {}
        }).catch(() => undefined);
        if (!content)
            return undefined;
        const contentId = (0, utils_1.createApiId)(content, true, inEditMode);
        return yield iContentDataToProps(content, contentId, api, locale, inEditMode);
    });
}
exports.loadPageContentByUrl = loadPageContentByUrl;
/**
 * Helper function to load the content needed to render a page, based on a contentId
 *
 * @param ref           The Content Reference to load the content for
 * @param api           The Content Delivery API client to use
 * @param locale        The current language
 * @param inEditMode    Whether or not to load from the draft versions
 * @returns             The data for the apge
 */
function loadPageContent(ref, api, locale, inEditMode = false) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const contentId = (0, utils_1.createApiId)(ref, true, inEditMode);
        const content = yield api.getContent(contentId, {
            branch: locale,
            editMode: inEditMode,
            urlParams: {}
        }).catch(() => undefined);
        if (!content)
            return undefined;
        return yield iContentDataToProps(content, contentId, api, locale, inEditMode);
    });
}
exports.loadPageContent = loadPageContent;
function iContentDataToProps(content, contentId, api, locale, inEditMode = false) {
    var _a, _b, _c;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const props = yield (0, utils_1.loadAdditionalPropsAndFilter)(content, api, locale, inEditMode);
        if (!props.fallback)
            props.fallback = {};
        props.fallback[contentId] = content;
        const ct = (_a = content.contentType) !== null && _a !== void 0 ? _a : [];
        const baseType = (_b = ct[0]) !== null && _b !== void 0 ? _b : 'page';
        const pageProps = Object.assign(Object.assign({}, props), { fallback: (_c = props.fallback) !== null && _c !== void 0 ? _c : {}, contentId, locale: content.language.name, inEditMode,
            baseType, components: [content.contentType] });
        if (pageProps.content)
            delete pageProps.content;
        return pageProps;
    });
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
function loadPageContentByURL(url, api, locale, inEditMode = false) {
    var _a, _b, _c;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        // Resolve by URL
        const content = yield api.resolveRoute(url, { branch: locale, editMode: false }).catch(e => {
            console.error("ERROR Resolving by route", e);
            return undefined;
        });
        if (!content)
            return undefined;
        const props = yield (0, utils_1.loadAdditionalPropsAndFilter)(content, api, locale, inEditMode);
        if (!props.fallback)
            props.fallback = {};
        const contentId = (0, utils_1.createApiId)(content, true, inEditMode);
        props.fallback[contentId] = content;
        const ct = (_a = content.contentType) !== null && _a !== void 0 ? _a : [];
        const baseType = (_b = ct[0]) !== null && _b !== void 0 ? _b : 'page';
        const pageProps = Object.assign(Object.assign({}, props), { fallback: (_c = props.fallback) !== null && _c !== void 0 ? _c : {}, contentId, locale: content.language.name, inEditMode,
            baseType, components: [content.contentType] });
        if (pageProps.content)
            delete pageProps.content;
        return pageProps;
    });
}
exports.loadPageContentByURL = loadPageContentByURL;
exports.default = usePageContent;
//# sourceMappingURL=use-page-content.js.map