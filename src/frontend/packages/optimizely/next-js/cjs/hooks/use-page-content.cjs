"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadPageContent = exports.loadPageContentByUrl = exports.usePageContent = void 0;
const tslib_1 = require("tslib");
const context_1 = require("@optimizely/cms/context");
const swr_1 = tslib_1.__importDefault(require("swr"));
const utils_1 = require("@optimizely/cms/utils");
const router_1 = require("next/router");
const { createLanguageId } = utils_1.ContentReference;
const DEBUG_ENABLED = process.env.NODE_ENV != "production";
function usePageContent(ref, inEditMode, locale) {
    var _a;
    if (DEBUG_ENABLED) {
        console.groupCollapsed("Optimizely - Next.JS: usePageContent");
        console.log("Optimizely - Next.JS: usePageContent - Reference:", ref);
    }
    const opti = (0, context_1.useOptimizelyCms)();
    const editModeInfo = (0, context_1.useEditMode)();
    const router = (0, router_1.useRouter)();
    const editMode = inEditMode !== null && inEditMode !== void 0 ? inEditMode : editModeInfo.isEditable;
    const contentId = ref ? (0, utils_1.createApiId)(ref, true, editMode) : '#';
    const pageLocale = (_a = locale !== null && locale !== void 0 ? locale : router.locale) !== null && _a !== void 0 ? _a : router.defaultLocale;
    if (DEBUG_ENABLED) {
        console.log("Optimizely - Next.JS: usePageContent - Content ID:", contentId);
        console.log("Optimizely - Next.JS: usePageContent - Edit Mode:", editMode);
        console.log("Optimizely - Next.JS: usePageContent - Locale:", pageLocale);
        console.groupEnd();
    }
    const api = opti.api;
    if (!api)
        throw new Error("Optimizely not initialized");
    const fetcher = (id) => fetchPageContent(id, api, pageLocale, editMode);
    return (0, swr_1.default)(contentId, fetcher, {
        compare(a, b) {
            if (a == b)
                return true;
            if (a == undefined || b == undefined)
                return false;
            if (editMode)
                return false;
            const idA = createLanguageId(a, pageLocale, editMode);
            const idB = createLanguageId(a, pageLocale, editMode);
            return idA == idB;
        }
    });
}
exports.usePageContent = usePageContent;
function fetchPageContent(ref, api, locale, inEditMode = false) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (DEBUG_ENABLED)
            console.log("usePageContent.fetcher: Fetching page data", ref, locale, inEditMode);
        if (!ref || ref === '#')
            return undefined;
        const contentId = (0, utils_1.createApiId)(ref, true, inEditMode);
        const content = yield api.getContent(contentId, {
            branch: locale,
            editMode: inEditMode,
            urlParams: {}
        }).catch(e => {
            if (DEBUG_ENABLED)
                console.error("usePageContent.fetcher: Error while communicating with Content Cloud", e);
            throw e;
        });
        if (DEBUG_ENABLED)
            console.log("usePageContent.fetcher: Received page data", content);
        if (!content)
            return undefined;
        return content;
    });
}
function loadPageContentByUrl(url, api, locale, inEditMode = false, cLoader) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        var path = typeof (url) === 'object' && url !== null ? url.href : url;
        const content = yield api.resolveRoute(path, {
            branch: locale,
            editMode: inEditMode,
            urlParams: {}
        }).catch((e) => {
            console.error(e);
        });
        if (!content)
            return undefined;
        const contentId = (0, utils_1.createApiId)(content, true, inEditMode);
        return yield iContentDataToProps(content, contentId, api, locale, inEditMode, cLoader);
    });
}
exports.loadPageContentByUrl = loadPageContentByUrl;
function loadPageContent(ref, api, locale, inEditMode = false, cLoader) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const contentId = (0, utils_1.createApiId)(ref, true, inEditMode);
        const content = yield api.getContent(contentId, {
            branch: locale,
            editMode: inEditMode,
            urlParams: {},
            select: ["*"]
        }).catch(() => undefined);
        if (!content)
            return undefined;
        return yield iContentDataToProps(content, contentId, api, locale, inEditMode, cLoader);
    });
}
exports.loadPageContent = loadPageContent;
function iContentDataToProps(content, contentId, api, locale, inEditMode = false, cLoader) {
    var _a, _b, _c;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const props = yield (0, utils_1.loadAdditionalPropsAndFilter)(content, api, locale, inEditMode, undefined, cLoader);
        if (!props.fallback)
            props.fallback = {};
        props.fallback[contentId] = content;
        const ct = (_a = content.contentType) !== null && _a !== void 0 ? _a : [];
        const prefix = ((_b = ct[0]) !== null && _b !== void 0 ? _b : 'Page');
        const pageProps = Object.assign(Object.assign({}, props), { fallback: (_c = props.fallback) !== null && _c !== void 0 ? _c : {}, contentId, locale: content.language.name, inEditMode,
            prefix, component: content.contentType, baseType: prefix });
        if (pageProps.content)
            delete pageProps.content;
        return pageProps;
    });
}
exports.default = usePageContent;
//# sourceMappingURL=use-page-content.js.map