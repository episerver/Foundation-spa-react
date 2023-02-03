import type { NextPage, GetStaticProps, GetStaticPathsContext, GetStaticPathsResult, GetStaticPropsResult, GetServerSideProps, GetServerSidePropsResult, NextApiRequest, Redirect, PreviewData } from 'next'
import type { ComponentLoader, IContentDeliveryAPI } from '@optimizely/cms/types'
import type { ParsedUrlQuery } from 'querystring'
import { getToken } from 'next-auth/jwt'
import React from 'react'
import { useRouter } from 'next/router'
import { getPagesForLocale, EditMode } from '@optimizely/cms/utils'
import createContentDeliveryClient from '@optimizely/cms/content-delivery'
import { useEditMode } from '@optimizely/cms/context'
import ContentComponent from '@optimizely/cms/content-component'
import { usePageContent, loadPageContentByUrl, loadPageContent } from '../hooks/use-page-content'
import * as Auth from '../auth/cms12oidc'

const DEBUG_ENABLED = process.env.NODE_ENV != 'production';
const DXP_DEBUG = false;

export type OptimizelyCmsPageProps = {
    /**
     * The pre-determined locale for the page
     */
    locale: string,

    /**
     * Fallback data for SWR, as populated by the components used to render
     * the page.
     */
    fallback?: Record<string, any>

    /**
     * The content identifier of the content that will be loaded by the
     * page.
     */
    contentId?: string,

    /** 
     * Initial "editMode" state, which will fill the gap between page load
     * and the communicationInjector completing initialization.
     */
    inEditMode?: boolean
}
export type OptimizelyCmsPageInitialProps = OptimizelyCmsPageProps & {}

/**
 * The path for the current page, as resolved into segments by Next.JS
 */
export type OptimizelyCmsPageUrlParams = {
    /**
     * The current path segements
     */
    page: string[]
}

export function isStringArray(toTest: any) : toTest is string[]
{
    return Array.isArray(toTest) && toTest.every(x => typeof(x) === 'string')
}

/**
 * Validate that the CMS Props have data (e.g. the props have yielded an actual page)
 * 
 * @param       toTest      The variable to test
 * @returns     boolean
 */
export function staticPropsHasData(toTest: GetStaticPropsResult<OptimizelyCmsPageProps>) : toTest is { props: OptimizelyCmsPageProps, revalidate?: number | boolean }
{
    const retyped = toTest as { props: OptimizelyCmsPageProps, revalidate?: number | boolean }
    if (retyped?.props && retyped.props.locale && typeof(retyped.props.locale) === 'string')
        return true
    return false
}

export function isServerSideRedirect(toTest: GetServerSidePropsResult<OptimizelyCmsPageProps>) : toTest is { redirect: Redirect }
{
    return (toTest as { redirect: Redirect }).redirect !== undefined
}

export function isServerSideNotFound(toTest: GetServerSidePropsResult<OptimizelyCmsPageProps>) : toTest is { notFound: true }
{
    return (toTest as {  notFound: true }).notFound
}

export function hasAwaitableProps(toTest: GetServerSidePropsResult<OptimizelyCmsPageProps>) : toTest is { props: Promise<OptimizelyCmsPageProps> }
{
    return typeof((toTest as { props: Promise<OptimizelyCmsPageProps> }).props?.then) === 'function'
}

export async function resolveAwaitableProps(toResolve: { props: OptimizelyCmsPageProps | Promise<OptimizelyCmsPageProps> }) : Promise<{ props: OptimizelyCmsPageProps }>
{
    if (hasAwaitableProps(toResolve))
        return { props: await toResolve.props }
    return toResolve as { props: OptimizelyCmsPageProps }
}

/**
 * Resolve the paths available within the CMS, which should be pre-rendered by Next.JS
 * 
 * @param       context 
 * @returns     The paths to pre-render during SSG
 */
export async function getStaticPaths(context : GetStaticPathsContext) : Promise<GetStaticPathsResult>
{
    if (DEBUG_ENABLED) {
        console.log("Optimizely - Next.JS: CMS-Page > getStaticPaths :: Start")
        console.time("Optimizely - Next.JS: CMS-Page > getStaticPaths")
    }
    
    const { defaultLocale, locales } = context
    if (DEBUG_ENABLED) {
        console.log("Optimizely - Next.JS: CMS-Page > getStaticPaths :: Default Locale", defaultLocale)
        console.log("Optimizely - Next.JS: CMS-Page > getStaticPaths :: Locales", locales)
    }
    const api = createContentDeliveryClient({ debug: DXP_DEBUG, defaultBranch: defaultLocale })
    const pages = (await Promise.all((locales ?? []).map((loc: string) => {
        if (DEBUG_ENABLED)  console.log("Optimizely - Next.JS: CMS-Page > getStaticPaths :: Fetching paths for locale", loc)
        return getPagesForLocale(api, loc, { debug: DEBUG_ENABLED })
    }))).flat(1)
    const homepages = (locales ?? []).map(x => `/${x}/`)
    const paths = pages
        .filter(c => (c.contentType?.indexOf('SysRecycleBin') ?? -1) < 0) // Filter out "Recycle bin"
        .map(data => (new URL(data.url ?? '/', "http://localhost")).pathname )
        .filter(path => (path || '').length > 0 && path != '/') // Filter out the homepage, without language code
        .filter(x => {
            if (homepages.length == 0)
                return true
            if (homepages.some(hp => x === hp))
                return false
            return true
        })
    //const paths = locales?.map(locale => `/${locale}/`) ?? []
    console.timeEnd("Optimizely - Next.JS: CMS-Page > getStaticPaths")
    return {
        paths,
        fallback: 'blocking' // Fallback to SSR when there's no SSG version of the page
    }
}

type CmsPageGetStaticProps<Q extends ParsedUrlQuery = ParsedUrlQuery, D extends PreviewData = PreviewData> = (
        context: Parameters<GetStaticProps<OptimizelyCmsPageProps, Q, D>>[0],
        cLoader?: ComponentLoader,
        api?: IContentDeliveryAPI
    ) => ReturnType<GetStaticProps<OptimizelyCmsPageProps, Q, D>>

/**
 * Resolve the properties needed to render the current path from the content 
 * managed within the Optimizely CMS.
 * 
 * @param       context     The context provided by Next.JS
 * @returns     The Page properties
 */
export const getStaticProps : CmsPageGetStaticProps = async ({ params, locale, defaultLocale }, cLoader, cApi) =>
{
    if (DEBUG_ENABLED) {
        console.log("Optimizely - Next.JS: CMS-Page > getStaticProps :: Start")
        console.time("Optimizely - Next.JS: CMS-Page > getStaticProps");
    }
    // Read the context
    const currentLocale = locale ?? defaultLocale ?? 'en'

    // Create the content-api client and resolve the actual content item
    const page = !Array.isArray(params?.page) ? [ params?.page ] : (params?.page ?? [])
    const api = cApi ?? createContentDeliveryClient({ debug: DXP_DEBUG, defaultBranch: defaultLocale })
    const path = page.length > 0 && page[0] != currentLocale ? `/${ currentLocale }/${ page.join("/") ?? '' }` : "/"
    
    // This is for a published page URL, not a preview/edit URL, so always loading the published code
    const props = await loadPageContentByUrl(path, api, currentLocale, false, cLoader)

    if (DEBUG_ENABLED) {
        console.log("Optimizely - Next.JS: CMS-Page > getStaticProps :: Path:", path)
        console.log("Optimizely - Next.JS: CMS-Page > getStaticProps :: Properties:", Object.getOwnPropertyNames(props ?? {}).join("; "))
        console.log("Optimizely - Next.JS: CMS-Page > getStaticProps :: Base Type:", props?.prefix)
        console.log("Optimizely - Next.JS: CMS-Page > getStaticProps :: Components:", props?.component)
        console.log("Optimizely - Next.JS: CMS-Page > getStaticProps :: Fallback keys:", Object.getOwnPropertyNames(props?.fallback ?? {}).join("; "))
        console.timeEnd("Optimizely - Next.JS: CMS-Page > getStaticProps")
    }
    // Return the page props
    return props ? { 
        props: { ...props, locale: currentLocale, inEditMode: false },
        revalidate: 60
    } : { notFound: true, revalidate: 1 }
}

/**
 * Logic for Server Side Rendering of Optimizely CMS Pages, supporting both published and edit mode URLs
 * 
 * @param param0 
 * @returns 
 */
export const getServerSideProps : GetServerSideProps<OptimizelyCmsPageProps, OptimizelyCmsPageUrlParams, {}> = async ({ req, res, ...context}) => 
{
    // Firstly, get the current token and return not-found if not present - due to our middleware this shouldn't happen
    const token = await getToken({ req: req as unknown as NextApiRequest, cookieName: Auth.Cms12NextAuthOptions.cookies?.sessionToken?.name })
    const hasManagementScope = (token?.scope as string | undefined ?? '').indexOf("epi_content_management") >= 0 && token?.accessToken ? true : false
    const pageUrl = new URL(decodeURIComponent(context.resolvedUrl), `http://${ req.headers.host ?? 'localhost' }`)
    const editInfo = EditMode.getEditModeInfo(pageUrl)

    if (!hasManagementScope && editInfo) {
        return {
            redirect: {
                destination: "/api/auth/signin",
                permanent: false
            }
        }
    }

    // Get the locale
    const pageSegments = pageUrl.pathname.split("/").filter(x => x)
    if (!isStringArray(pageSegments)) return { notFound: true }
    const urlLocale = pageSegments[0]
    const locale = context.locales?.includes(urlLocale) ? urlLocale : context.locale ?? context.defaultLocale ?? 'en'

    // Create api & fetch content
    const api = createContentDeliveryClient({
        defaultBranch: locale,
        getAccessToken: async () => {
            return (token?.accessToken as string|undefined) ?? ''
        }
    })
    const props = editInfo?.contentReference ?
        await loadPageContent(editInfo.contentReference, api, locale, true) :
        await loadPageContentByUrl(pageUrl, api, locale, false)
    if (!props)
        return { notFound: true }

    // Build page rendering data
    const pageProps = {
        props: {
            ...props,
            locale
        }
    }

    return pageProps
}

export const OptimizelyCmsPage : NextPage<OptimizelyCmsPageProps, OptimizelyCmsPageInitialProps> = (props: OptimizelyCmsPageProps) => {
    if (DEBUG_ENABLED) {
        console.groupCollapsed("Optimizely - Next.JS: CMS-Page > render")
    }
    const opti = useEditMode()
    const router = useRouter()
    const locale = router.locale ?? router.defaultLocale
    const inEditMode = props.inEditMode ?? opti.inEditMode
    if (DEBUG_ENABLED) {
        console.log("Optimizely - Next.JS: CMS-Page > render :: contentId: ", props.contentId ?? '-')
        console.log("Optimizely - Next.JS: CMS-Page > render :: inEditMode: ", inEditMode)
        console.log("Optimizely - Next.JS: CMS-Page > render :: locale: ", locale)
    }
    const { data: iContent } = usePageContent(props.contentId ?? '', inEditMode, locale)
    if (DEBUG_ENABLED) {
        console.log("Optimizely - Next.JS: CMS-Page > render :: iContent: ", iContent)
    }
    const output =  iContent ? <ContentComponent { ...props } content={ iContent }  /> : <div>Loading <span>{ props.contentId }</span></div>
    if (DEBUG_ENABLED) {
        console.groupEnd()
    }
    return output;
    
}


export default OptimizelyCmsPage;