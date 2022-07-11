import { getToken } from 'next-auth/jwt';
import React from 'react';
import { useRouter } from 'next/router';
import { getPagesForLocale, EditMode, ContentReference } from '@optimizely/cms/utils';
import { ContentDelivery, ContentComponent, useAndInitOptimizely as useOptimizely } from '@optimizely/cms';
import { usePageContent, loadPageContentByURL, loadPageContent } from '../hooks';
const inDebugMode = false;
export function isStringArray(toTest) {
    return Array.isArray(toTest) && toTest.every(x => typeof (x) === 'string');
}
/**
 * Validate that the CMS Props have data (e.g. the props have yielded an actual page)
 *
 * @param       toTest      The variable to test
 * @returns     boolean
 */
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
/**
 * Resolve the paths available within the CMS, which should be pre-rendered by Next.JS
 *
 * @param       context
 * @returns     The paths to pre-render during SSG
 */
export async function getStaticPaths(context) {
    const { defaultLocale, locales } = context;
    const api = ContentDelivery.createInstance({ debug: inDebugMode, defaultBranch: defaultLocale });
    const pages = (await Promise.all((locales ?? []).map((loc) => getPagesForLocale(api, loc)))).flat(1);
    const homepages = (locales ?? []).map(x => `/${x}/`);
    const paths = pages
        .filter(c => (c.contentType?.indexOf('SysRecycleBin') ?? -1) < 0) // Filter out "Recycle bin"
        .map(data => (new URL(data.url ?? '/', "http://localhost")).pathname)
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
}
/**
 * Resolve the properties needed to render the current path from the content
 * managed within the Optimizely CMS.
 *
 * @param       context     The context provided by Next.JS
 * @returns     The Page properties
 */
export async function getStaticProps(context) {
    // Read the context
    const { params, locale, defaultLocale } = context;
    const currentLocale = locale ?? defaultLocale ?? 'en';
    // Create the content-api client and resolve the actual content item
    const api = ContentDelivery.createInstance({ debug: inDebugMode, defaultBranch: defaultLocale });
    const path = `/${currentLocale}/${params?.page.join("/") ?? ''}`;
    // This is for a published page URL, not a preview/edit URL, so always loading the published code
    const props = await loadPageContentByURL(path, api, currentLocale, false);
    if (!props)
        return { notFound: true, revalidate: 60 };
    // Return the page props
    return {
        props: { ...props, locale: currentLocale, inEditMode: false },
        revalidate: 60
    };
}
export const getServerSideProps = async ({ req, ...context }) => {
    // Firstly, get the current token and return not-found if not present - due to our middleware this shouldn't happen
    const token = await getToken({ req: req });
    if (!((token?.scope ?? '').indexOf("epi_content_management") >= 0 &&
        token?.accessToken)) {
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
    const locale = context.locales?.includes(urlLocale) ? urlLocale : context.locale ?? context.defaultLocale ?? 'en';
    if (locale && pageSegments[0] !== locale)
        pageSegments.unshift(locale);
    // Create api & fetch content
    const api = ContentDelivery.createInstance({
        defaultBranch: locale,
        getAccessToken: async () => {
            return token?.accessToken ?? '';
        }
    });
    if (!req.url)
        return { notFound: true };
    const reqUrl = new URL(req.url, `http://${req.headers.host ?? 'localhost'}`);
    const editInfo = EditMode.getEditModeInfo(reqUrl);
    if (!editInfo)
        return { notFound: true };
    const contentId = ContentReference.createApiId(editInfo, false, true);
    const props = await loadPageContent(contentId, api, locale, true);
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
export const OptimizelyCmsPage = props => {
    const opti = useOptimizely(props.inEditMode);
    const router = useRouter();
    const locale = router.locale ?? router.defaultLocale;
    const pageContent = usePageContent(props.contentId ?? '', opti.inEditMode, locale);
    const content = pageContent.data;
    if (!content)
        return <></>;
    return <ContentComponent {...props} content={content}/>;
};
export default OptimizelyCmsPage;
//# sourceMappingURL=cms-page.jsx.map