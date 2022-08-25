import type { NextPage, GetStaticPathsContext, GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult, GetServerSideProps, GetServerSidePropsResult, NextApiRequest, Redirect } from 'next'
import { getToken } from 'next-auth/jwt'
import React from 'react'
import { useRouter } from 'next/router'
import { getPagesForLocale, EditMode } from '@optimizely/cms/utils'
import { ContentDelivery, ContentComponent, useAndInitOptimizely as useOptimizely } from '@optimizely/cms'
import { usePageContent, loadPageContentByUrl, loadPageContent } from '../hooks'
import * as Auth from '../auth/cms12oidc'

const inDebugMode = false;

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
    console.time("@optimizely/next-js/components/cms-page/getStaticPaths")
    const { defaultLocale, locales } = context
    const api = ContentDelivery.createInstance({ debug: inDebugMode, defaultBranch: defaultLocale })
    const pages = (await Promise.all((locales ?? []).map((loc: string) => getPagesForLocale(api, loc)))).flat(1)
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
    console.timeEnd("@optimizely/next-js/components/cms-page/getStaticPaths")
    return {
        paths,
        fallback: 'blocking' // Fallback to SSR when there's no SSG version of the page
    }
}

/**
 * Resolve the properties needed to render the current path from the content 
 * managed within the Optimizely CMS.
 * 
 * @param       context     The context provided by Next.JS
 * @returns     The Page properties
 */
export async function getStaticProps(context: GetStaticPropsContext<OptimizelyCmsPageUrlParams>) : Promise<GetStaticPropsResult<OptimizelyCmsPageProps>>
{
    // Read the context
    const { params, locale, defaultLocale } = context
    const currentLocale = locale ?? defaultLocale ?? 'en'

    // Create the content-api client and resolve the actual content item
    const page = params?.page ?? []
    const api = ContentDelivery.createInstance({ debug: inDebugMode, defaultBranch: defaultLocale })
    const path = page.length > 0 && page[0] != currentLocale ? `/${ currentLocale }/${ page.join("/") ?? '' }` : "/"
    
    // This is for a published page URL, not a preview/edit URL, so always loading the published code
    const props = await loadPageContentByUrl(path, api, currentLocale, false)
    if (!props)
        return { notFound: true, revalidate: 1 }

    // Return the page props
    return { 
        props: { ...props, locale: currentLocale, inEditMode: false },
        revalidate: 60
    }
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
    const api = ContentDelivery.createInstance({
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
    const opti = useOptimizely(props.inEditMode)
    const router = useRouter()
    const locale = router.locale ?? router.defaultLocale
    const pageContent = usePageContent(props.contentId ?? '', opti.inEditMode, locale)
    const content = pageContent.data
    if (!content) 
        return <></>

    return  <ContentComponent { ...props } content={ content }  />
}


export default OptimizelyCmsPage;