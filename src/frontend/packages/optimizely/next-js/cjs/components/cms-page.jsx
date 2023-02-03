"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptimizelyCmsPage = exports.getServerSideProps = exports.getStaticProps = exports.getStaticPaths = exports.resolveAwaitableProps = exports.hasAwaitableProps = exports.isServerSideNotFound = exports.isServerSideRedirect = exports.staticPropsHasData = exports.isStringArray = void 0;
const tslib_1 = require("tslib");
const jwt_1 = require("next-auth/jwt");
const react_1 = tslib_1.__importDefault(require("react"));
const router_1 = require("next/router");
const utils_1 = require("@optimizely/cms/utils");
const content_delivery_1 = tslib_1.__importDefault(require("@optimizely/cms/content-delivery"));
const context_1 = require("@optimizely/cms/context");
const content_component_1 = tslib_1.__importDefault(require("@optimizely/cms/content-component"));
const use_page_content_1 = require("../hooks/use-page-content");
const Auth = tslib_1.__importStar(require("../auth/cms12oidc"));
const DEBUG_ENABLED = process.env.NODE_ENV != 'production';
const DXP_DEBUG = false;
function isStringArray(toTest) {
    return Array.isArray(toTest) && toTest.every(x => typeof (x) === 'string');
}
exports.isStringArray = isStringArray;
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
function getStaticPaths(context) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (DEBUG_ENABLED) {
            console.log("Optimizely - Next.JS: CMS-Page > getStaticPaths :: Start");
            console.time("Optimizely - Next.JS: CMS-Page > getStaticPaths");
        }
        const { defaultLocale, locales } = context;
        if (DEBUG_ENABLED) {
            console.log("Optimizely - Next.JS: CMS-Page > getStaticPaths :: Default Locale", defaultLocale);
            console.log("Optimizely - Next.JS: CMS-Page > getStaticPaths :: Locales", locales);
        }
        const api = (0, content_delivery_1.default)({ debug: DXP_DEBUG, defaultBranch: defaultLocale });
        const pages = (yield Promise.all((locales !== null && locales !== void 0 ? locales : []).map((loc) => {
            if (DEBUG_ENABLED)
                console.log("Optimizely - Next.JS: CMS-Page > getStaticPaths :: Fetching paths for locale", loc);
            return (0, utils_1.getPagesForLocale)(api, loc, { debug: DEBUG_ENABLED });
        }))).flat(1);
        const homepages = (locales !== null && locales !== void 0 ? locales : []).map(x => `/${x}/`);
        const paths = pages
            .filter(c => { var _a, _b; return ((_b = (_a = c.contentType) === null || _a === void 0 ? void 0 : _a.indexOf('SysRecycleBin')) !== null && _b !== void 0 ? _b : -1) < 0; })
            .map(data => { var _a; return (new URL((_a = data.url) !== null && _a !== void 0 ? _a : '/', "http://localhost")).pathname; })
            .filter(path => (path || '').length > 0 && path != '/')
            .filter(x => {
            if (homepages.length == 0)
                return true;
            if (homepages.some(hp => x === hp))
                return false;
            return true;
        });
        console.timeEnd("Optimizely - Next.JS: CMS-Page > getStaticPaths");
        return {
            paths,
            fallback: 'blocking'
        };
    });
}
exports.getStaticPaths = getStaticPaths;
const getStaticProps = ({ params, locale, defaultLocale }, cLoader, cApi) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    if (DEBUG_ENABLED) {
        console.log("Optimizely - Next.JS: CMS-Page > getStaticProps :: Start");
        console.time("Optimizely - Next.JS: CMS-Page > getStaticProps");
    }
    const currentLocale = (_a = locale !== null && locale !== void 0 ? locale : defaultLocale) !== null && _a !== void 0 ? _a : 'en';
    const page = !Array.isArray(params === null || params === void 0 ? void 0 : params.page) ? [params === null || params === void 0 ? void 0 : params.page] : ((_b = params === null || params === void 0 ? void 0 : params.page) !== null && _b !== void 0 ? _b : []);
    const api = cApi !== null && cApi !== void 0 ? cApi : (0, content_delivery_1.default)({ debug: DXP_DEBUG, defaultBranch: defaultLocale });
    const path = page.length > 0 && page[0] != currentLocale ? `/${currentLocale}/${(_c = page.join("/")) !== null && _c !== void 0 ? _c : ''}` : "/";
    const props = yield (0, use_page_content_1.loadPageContentByUrl)(path, api, currentLocale, false, cLoader);
    if (DEBUG_ENABLED) {
        console.log("Optimizely - Next.JS: CMS-Page > getStaticProps :: Path:", path);
        console.log("Optimizely - Next.JS: CMS-Page > getStaticProps :: Properties:", Object.getOwnPropertyNames(props !== null && props !== void 0 ? props : {}).join("; "));
        console.log("Optimizely - Next.JS: CMS-Page > getStaticProps :: Base Type:", props === null || props === void 0 ? void 0 : props.prefix);
        console.log("Optimizely - Next.JS: CMS-Page > getStaticProps :: Components:", props === null || props === void 0 ? void 0 : props.component);
        console.log("Optimizely - Next.JS: CMS-Page > getStaticProps :: Fallback keys:", Object.getOwnPropertyNames((_d = props === null || props === void 0 ? void 0 : props.fallback) !== null && _d !== void 0 ? _d : {}).join("; "));
        console.timeEnd("Optimizely - Next.JS: CMS-Page > getStaticProps");
    }
    return props ? {
        props: Object.assign(Object.assign({}, props), { locale: currentLocale, inEditMode: false }),
        revalidate: 60
    } : { notFound: true, revalidate: 1 };
});
exports.getStaticProps = getStaticProps;
const getServerSideProps = (_e) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    var _f, _g, _h, _j, _k, _l, _m;
    var { req, res } = _e, context = tslib_1.__rest(_e, ["req", "res"]);
    const token = yield (0, jwt_1.getToken)({ req: req, cookieName: (_g = (_f = Auth.Cms12NextAuthOptions.cookies) === null || _f === void 0 ? void 0 : _f.sessionToken) === null || _g === void 0 ? void 0 : _g.name });
    const hasManagementScope = ((_h = token === null || token === void 0 ? void 0 : token.scope) !== null && _h !== void 0 ? _h : '').indexOf("epi_content_management") >= 0 && (token === null || token === void 0 ? void 0 : token.accessToken) ? true : false;
    const pageUrl = new URL(decodeURIComponent(context.resolvedUrl), `http://${(_j = req.headers.host) !== null && _j !== void 0 ? _j : 'localhost'}`);
    const editInfo = utils_1.EditMode.getEditModeInfo(pageUrl);
    if (!hasManagementScope && editInfo) {
        return {
            redirect: {
                destination: "/api/auth/signin",
                permanent: false
            }
        };
    }
    const pageSegments = pageUrl.pathname.split("/").filter(x => x);
    if (!isStringArray(pageSegments))
        return { notFound: true };
    const urlLocale = pageSegments[0];
    const locale = ((_k = context.locales) === null || _k === void 0 ? void 0 : _k.includes(urlLocale)) ? urlLocale : (_m = (_l = context.locale) !== null && _l !== void 0 ? _l : context.defaultLocale) !== null && _m !== void 0 ? _m : 'en';
    const api = (0, content_delivery_1.default)({
        defaultBranch: locale,
        getAccessToken: () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            var _o;
            return (_o = token === null || token === void 0 ? void 0 : token.accessToken) !== null && _o !== void 0 ? _o : '';
        })
    });
    const props = (editInfo === null || editInfo === void 0 ? void 0 : editInfo.contentReference) ?
        yield (0, use_page_content_1.loadPageContent)(editInfo.contentReference, api, locale, true) :
        yield (0, use_page_content_1.loadPageContentByUrl)(pageUrl, api, locale, false);
    if (!props)
        return { notFound: true };
    const pageProps = {
        props: Object.assign(Object.assign({}, props), { locale })
    };
    return pageProps;
});
exports.getServerSideProps = getServerSideProps;
const OptimizelyCmsPage = (props) => {
    var _a, _b, _c, _d;
    if (DEBUG_ENABLED) {
        console.groupCollapsed("Optimizely - Next.JS: CMS-Page > render");
    }
    const opti = (0, context_1.useEditMode)();
    const router = (0, router_1.useRouter)();
    const locale = (_a = router.locale) !== null && _a !== void 0 ? _a : router.defaultLocale;
    const inEditMode = (_b = props.inEditMode) !== null && _b !== void 0 ? _b : opti.inEditMode;
    if (DEBUG_ENABLED) {
        console.log("Optimizely - Next.JS: CMS-Page > render :: contentId: ", (_c = props.contentId) !== null && _c !== void 0 ? _c : '-');
        console.log("Optimizely - Next.JS: CMS-Page > render :: inEditMode: ", inEditMode);
        console.log("Optimizely - Next.JS: CMS-Page > render :: locale: ", locale);
    }
    const { data: iContent } = (0, use_page_content_1.usePageContent)((_d = props.contentId) !== null && _d !== void 0 ? _d : '', inEditMode, locale);
    if (DEBUG_ENABLED) {
        console.log("Optimizely - Next.JS: CMS-Page > render :: iContent: ", iContent);
    }
    const output = iContent ? <content_component_1.default {...props} content={iContent}/> : <div>Loading <span>{props.contentId}</span></div>;
    if (DEBUG_ENABLED) {
        console.groupEnd();
    }
    return output;
};
exports.OptimizelyCmsPage = OptimizelyCmsPage;
exports.default = exports.OptimizelyCmsPage;
//# sourceMappingURL=cms-page.jsx.map