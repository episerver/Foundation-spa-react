"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptimizelyCmsPage = exports.getServerSideProps = exports.getStaticProps = exports.getStaticPaths = exports.resolveAwaitableProps = exports.hasAwaitableProps = exports.isServerSideNotFound = exports.isServerSideRedirect = exports.staticPropsHasData = exports.isStringArray = void 0;
const tslib_1 = require("tslib");
const jwt_1 = require("next-auth/jwt");
const react_1 = require("react");
const router_1 = require("next/router");
const utils_1 = require("@optimizely/cms/utils");
const cms_1 = require("@optimizely/cms");
const hooks_1 = require("../hooks");
const inDebugMode = false;
function isStringArray(toTest) {
    return Array.isArray(toTest) && toTest.every(x => typeof (x) === 'string');
}
exports.isStringArray = isStringArray;
/**
 * Validate that the CMS Props have data (e.g. the props have yielded an actual page)
 *
 * @param       toTest      The variable to test
 * @returns     boolean
 */
function staticPropsHasData(toTest) {
    const retyped = toTest;
    if ((retyped === null || retyped === void 0 ? void 0 : retyped.props) && retyped.props.locale && typeof (retyped.props.locale) === 'string')
        return true;
    return false;
}
exports.staticPropsHasData = staticPropsHasData;
function isServerSideRedirect(toTest) {
    return toTest.redirect !== undefined;
}
exports.isServerSideRedirect = isServerSideRedirect;
function isServerSideNotFound(toTest) {
    return toTest.notFound;
}
exports.isServerSideNotFound = isServerSideNotFound;
function hasAwaitableProps(toTest) {
    var _a;
    return typeof ((_a = toTest.props) === null || _a === void 0 ? void 0 : _a.then) === 'function';
}
exports.hasAwaitableProps = hasAwaitableProps;
function resolveAwaitableProps(toResolve) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (hasAwaitableProps(toResolve))
            return { props: yield toResolve.props };
        return toResolve;
    });
}
exports.resolveAwaitableProps = resolveAwaitableProps;
/**
 * Resolve the paths available within the CMS, which should be pre-rendered by Next.JS
 *
 * @param       context
 * @returns     The paths to pre-render during SSG
 */
function getStaticPaths(context) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { defaultLocale, locales } = context;
        const api = cms_1.ContentDelivery.createInstance({ debug: inDebugMode, defaultBranch: defaultLocale });
        const pages = (yield Promise.all((locales !== null && locales !== void 0 ? locales : []).map((loc) => (0, utils_1.getPagesForLocale)(api, loc)))).flat(1);
        const homepages = (locales !== null && locales !== void 0 ? locales : []).map(x => `/${x}/`);
        const paths = pages
            .filter(c => { var _a, _b; return ((_b = (_a = c.contentType) === null || _a === void 0 ? void 0 : _a.indexOf('SysRecycleBin')) !== null && _b !== void 0 ? _b : -1) < 0; }) // Filter out "Recycle bin"
            .map(data => { var _a; return (new URL((_a = data.url) !== null && _a !== void 0 ? _a : '/', "http://localhost")).pathname; })
            .filter(path => (path || '').length > 0 && path != '/') // Filter out the homepage, without language code
            .filter(x => {
            if (homepages.length == 0)
                return true;
            if (homepages.some(hp => x === hp))
                return false;
            return true;
        });
        return {
            paths,
            fallback: true
        };
    });
}
exports.getStaticPaths = getStaticPaths;
/**
 * Resolve the properties needed to render the current path from the content
 * managed within the Optimizely CMS.
 *
 * @param       context     The context provided by Next.JS
 * @returns     The Page properties
 */
function getStaticProps(context) {
    var _a, _b;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        // Read the context
        const { params, locale, defaultLocale } = context;
        const currentLocale = (_a = locale !== null && locale !== void 0 ? locale : defaultLocale) !== null && _a !== void 0 ? _a : 'en';
        // Create the content-api client and resolve the actual content item
        const api = cms_1.ContentDelivery.createInstance({ debug: inDebugMode, defaultBranch: defaultLocale });
        const path = `/${currentLocale}/${(_b = params === null || params === void 0 ? void 0 : params.page.join("/")) !== null && _b !== void 0 ? _b : ''}`;
        // This is for a published page URL, not a preview/edit URL, so always loading the published code
        const props = yield (0, hooks_1.loadPageContentByURL)(path, api, currentLocale, false);
        if (!props)
            return { notFound: true, revalidate: 60 };
        // Return the page props
        return {
            props: Object.assign(Object.assign({}, props), { locale: currentLocale, inEditMode: false }),
            revalidate: 60
        };
    });
}
exports.getStaticProps = getStaticProps;
const getServerSideProps = (_a) => { var _b, _c, _d, _e, _f; return tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    var { req } = _a, context = tslib_1.__rest(_a, ["req"]);
    // Firstly, get the current token and return not-found if not present - due to our middleware this shouldn't happen
    const token = yield (0, jwt_1.getToken)({ req: req });
    if (!(((_b = token === null || token === void 0 ? void 0 : token.scope) !== null && _b !== void 0 ? _b : '').indexOf("epi_content_management") >= 0 &&
        (token === null || token === void 0 ? void 0 : token.accessToken))) {
        console.error("Invalid session");
        return {
            notFound: true
        };
    }
    // Now, let's prepare the content to load
    const pageSegments = context.query.page;
    if (!isStringArray(pageSegments))
        return { notFound: true };
    const urlLocale = pageSegments[0];
    const locale = ((_c = context.locales) === null || _c === void 0 ? void 0 : _c.includes(urlLocale)) ? urlLocale : (_e = (_d = context.locale) !== null && _d !== void 0 ? _d : context.defaultLocale) !== null && _e !== void 0 ? _e : 'en';
    if (locale && pageSegments[0] !== locale)
        pageSegments.unshift(locale);
    // Create api & fetch content
    const api = cms_1.ContentDelivery.createInstance({
        defaultBranch: locale,
        getAccessToken: () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            var _g;
            return (_g = token === null || token === void 0 ? void 0 : token.accessToken) !== null && _g !== void 0 ? _g : '';
        })
    });
    if (!req.url)
        return { notFound: true };
    const reqUrl = new URL(req.url, `http://${(_f = req.headers.host) !== null && _f !== void 0 ? _f : 'localhost'}`);
    const editInfo = utils_1.EditMode.getEditModeInfo(reqUrl);
    if (!editInfo)
        return { notFound: true };
    const contentId = utils_1.ContentReference.createApiId(editInfo, false, true);
    const props = yield (0, hooks_1.loadPageContent)(contentId, api, locale, true);
    if (!props)
        return { notFound: true };
    const pageProps = {
        props: Object.assign(Object.assign({}, props), { locale })
    };
    return pageProps;
}); };
exports.getServerSideProps = getServerSideProps;
const OptimizelyCmsPage = props => {
    var _a, _b;
    const opti = (0, cms_1.useAndInitOptimizely)(props.inEditMode);
    const router = (0, router_1.useRouter)();
    const locale = (_a = router.locale) !== null && _a !== void 0 ? _a : router.defaultLocale;
    const pageContent = (0, hooks_1.usePageContent)((_b = props.contentId) !== null && _b !== void 0 ? _b : '', opti.inEditMode, locale);
    const content = pageContent.data;
    if (!content)
        return react_1.default.createElement(react_1.default.Fragment, null);
    return react_1.default.createElement(cms_1.ContentComponent, Object.assign({}, props, { content: content }));
};
exports.OptimizelyCmsPage = OptimizelyCmsPage;
exports.default = exports.OptimizelyCmsPage;
//# sourceMappingURL=cms-page.js.map