import { getToken } from 'next-auth/jwt';
import React from 'react';
import { useRouter } from 'next/router';
import { getPagesForLocale, EditMode } from '@optimizely/cms/utils';
import createContentDeliveryClient from '@optimizely/cms/content-delivery';
import { useEditMode } from '@optimizely/cms/context';
import ContentComponent from '@optimizely/cms/content-component';
import { usePageContent, loadPageContentByUrl, loadPageContent } from '../hooks/use-page-content';
import * as Auth from '../auth/cms12oidc';
const DEBUG_ENABLED = process.env.NODE_ENV != 'production';
const DXP_DEBUG = false;
export function isStringArray(toTest) {
    return Array.isArray(toTest) && toTest.every(x => typeof (x) === 'string');
}
export function staticPropsHasData(toTest) {
    const retyped = toTest;
    if (retyped?.props && retyped.props.locale && typeof (retyped.props.locale) === 'string')
        return true;
    return false;
}
export function isServerSideRedirect(toTest) {
    return toTest.redirect !== undefined;
}
export function isServerSideNotFound(toTest) {
    return toTest.notFound;
}
export function hasAwaitableProps(toTest) {
    return typeof (toTest.props?.then) === 'function';
}
export async function resolveAwaitableProps(toResolve) {
    if (hasAwaitableProps(toResolve))
        return { props: await toResolve.props };
    return toResolve;
}
export async function getStaticPaths(context) {
    if (DEBUG_ENABLED) {
        console.log("Optimizely - Next.JS: CMS-Page > getStaticPaths :: Start");
        console.time("Optimizely - Next.JS: CMS-Page > getStaticPaths");
    }
    const { defaultLocale, locales } = context;
    if (DEBUG_ENABLED) {
        console.log("Optimizely - Next.JS: CMS-Page > getStaticPaths :: Default Locale", defaultLocale);
        console.log("Optimizely - Next.JS: CMS-Page > getStaticPaths :: Locales", locales);
    }
    const api = createContentDeliveryClient({ debug: DXP_DEBUG, defaultBranch: defaultLocale });
    const pages = (await Promise.all((locales ?? []).map((loc) => {
        if (DEBUG_ENABLED)
            console.log("Optimizely - Next.JS: CMS-Page > getStaticPaths :: Fetching paths for locale", loc);
        return getPagesForLocale(api, loc, { debug: DEBUG_ENABLED });
    }))).flat(1);
    const homepages = (locales ?? []).map(x => `/${x}/`);
    const paths = pages
        .filter(c => (c.contentType?.indexOf('SysRecycleBin') ?? -1) < 0)
        .map(data => (new URL(data.url ?? '/', "http://localhost")).pathname)
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
}
export const getStaticProps = async ({ params, locale, defaultLocale }, cLoader, cApi) => {
    if (DEBUG_ENABLED) {
        console.log("Optimizely - Next.JS: CMS-Page > getStaticProps :: Start");
        console.time("Optimizely - Next.JS: CMS-Page > getStaticProps");
    }
    const currentLocale = locale ?? defaultLocale ?? 'en';
    const page = !Array.isArray(params?.page) ? [params?.page] : (params?.page ?? []);
    const api = cApi ?? createContentDeliveryClient({ debug: DXP_DEBUG, defaultBranch: defaultLocale });
    const path = page.length > 0 && page[0] != currentLocale ? `/${currentLocale}/${page.join("/") ?? ''}` : "/";
    const props = await loadPageContentByUrl(path, api, currentLocale, false, cLoader);
    if (DEBUG_ENABLED) {
        console.log("Optimizely - Next.JS: CMS-Page > getStaticProps :: Path:", path);
        console.log("Optimizely - Next.JS: CMS-Page > getStaticProps :: Properties:", Object.getOwnPropertyNames(props ?? {}).join("; "));
        console.log("Optimizely - Next.JS: CMS-Page > getStaticProps :: Base Type:", props?.prefix);
        console.log("Optimizely - Next.JS: CMS-Page > getStaticProps :: Components:", props?.component);
        console.log("Optimizely - Next.JS: CMS-Page > getStaticProps :: Fallback keys:", Object.getOwnPropertyNames(props?.fallback ?? {}).join("; "));
        console.timeEnd("Optimizely - Next.JS: CMS-Page > getStaticProps");
    }
    return props ? {
        props: { ...props, locale: currentLocale, inEditMode: false },
        revalidate: 60
    } : { notFound: true, revalidate: 1 };
};
export const getServerSideProps = async ({ req, res, ...context }) => {
    const token = await getToken({ req: req, cookieName: Auth.Cms12NextAuthOptions.cookies?.sessionToken?.name });
    const hasManagementScope = (token?.scope ?? '').indexOf("epi_content_management") >= 0 && token?.accessToken ? true : false;
    const pageUrl = new URL(decodeURIComponent(context.resolvedUrl), `http://${req.headers.host ?? 'localhost'}`);
    const editInfo = EditMode.getEditModeInfo(pageUrl);
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
    const locale = context.locales?.includes(urlLocale) ? urlLocale : context.locale ?? context.defaultLocale ?? 'en';
    const api = createContentDeliveryClient({
        defaultBranch: locale,
        getAccessToken: async () => {
            return token?.accessToken ?? '';
        }
    });
    const props = editInfo?.contentReference ?
        await loadPageContent(editInfo.contentReference, api, locale, true) :
        await loadPageContentByUrl(pageUrl, api, locale, false);
    if (!props)
        return { notFound: true };
    const pageProps = {
        props: {
            ...props,
            locale
        }
    };
    return pageProps;
};
export const OptimizelyCmsPage = (props) => {
    if (DEBUG_ENABLED) {
        console.groupCollapsed("Optimizely - Next.JS: CMS-Page > render");
    }
    const opti = useEditMode();
    const router = useRouter();
    const locale = router.locale ?? router.defaultLocale;
    const inEditMode = props.inEditMode ?? opti.inEditMode;
    if (DEBUG_ENABLED) {
        console.log("Optimizely - Next.JS: CMS-Page > render :: contentId: ", props.contentId ?? '-');
        console.log("Optimizely - Next.JS: CMS-Page > render :: inEditMode: ", inEditMode);
        console.log("Optimizely - Next.JS: CMS-Page > render :: locale: ", locale);
    }
    const { data: iContent } = usePageContent(props.contentId ?? '', inEditMode, locale);
    if (DEBUG_ENABLED) {
        console.log("Optimizely - Next.JS: CMS-Page > render :: iContent: ", iContent);
    }
    const output = iContent ? <ContentComponent {...props} content={iContent}/> : <div>Loading <span>{props.contentId}</span></div>;
    if (DEBUG_ENABLED) {
        console.groupEnd();
    }
    return output;
};
export default OptimizelyCmsPage;
//# sourceMappingURL=cms-page.jsx.map