//import { getServerSideProps as baseGetServerSideProps } from "@optimizely/next-js/components"
import createApiClient from '@optimizely/cms/content-delivery'
import { readValue as pv, EditMode } from '@optimizely/cms/utils'
import { contentsFetcher } from '@optimizely/cms/use-contents'
import buildContentURI from '@optimizely/cms/content-uri'
import type { OptimizelyCmsPageProps } from '@optimizely/next-js/cms-page'
import { loadPageContent } from '@optimizely/next-js/hooks'
import { getServerSideProps as baseGetServerSideProps } from '@optimizely/next-js/cms-page'
import { getServerSession } from "../../../api/auth/[...nextauth]"
import { preFetchSettings } from '@framework/foundation/cms/settings/prefetcher'
import { LayoutSettings } from 'schema'
import SiteInfo from 'website.cjs'
import createComponentLoader from '@optimizely/cms/component-loader'
import CmsComponents from '@components/cms'

const DEBUG_ENABLED = process.env.NODE_ENV != 'production'
const DXP_DEBUG = false;

/**
 * Retrieve the server side rendering props for the edit pages (which are always
 * server side rendered. This takes the base implemenation and adds the Foundation
 * settings to it.
 * 
 * @param       ctx     The context for the server side rendering.
 * @returns     The parameters neeeded for server side rendering
 */
export const getServerSideProps : typeof baseGetServerSideProps = async ({ req, defaultLocale, locale, params, query, res }) => {
    const editContext = EditMode.getEditModeInfo(req.url)
    if (!editContext) {
        return {
            notFound: true
        }
    }
    const session = (await getServerSession(req, res))
    const at = session?.at

    if (DEBUG_ENABLED) console.log("Site - Edit Page", req.url)
    const api = createApiClient({ debug: DXP_DEBUG, defaultBranch: defaultLocale })
    if (at)
        api.setAccessToken(at)
    
    const contentBranch = locale ?? defaultLocale ?? 'en'
    const contentId = editContext.contentReference

    if (!contentId)
        return { notFound: true }

    const inEditMode = !editContext.isPreviewActive

    if (DEBUG_ENABLED) console.log("Site - Page Mode", contentId, inEditMode ? "Edit" : "Preview", editContext)

    const loader = createComponentLoader({ args: [ CmsComponents ] })
    const props : OptimizelyCmsPageProps = (await loadPageContent(contentId, api, contentBranch, inEditMode, loader)) ?? {
        locale: contentBranch,
        contentId,
        fallback: {},
        inEditMode
    }

    // Inject Layout Settings
    const layoutSettings = await preFetchSettings<LayoutSettings>("LayoutSettings", locale, SiteInfo.id)
    if (layoutSettings.value) {
        props.fallback = props.fallback ?? {}
        props.fallback[layoutSettings.id] = layoutSettings.value
        const mainMenuItems = (pv(layoutSettings.value.settings, "mainMenu") ?? []).map(mm => mm.contentLink)
        const itemsId = buildContentURI(mainMenuItems, ["name","url"], undefined, locale, false, undefined).href
        props.fallback[itemsId] = await contentsFetcher(itemsId, api)
    } 

    return { props }
}

/**
 * Reexport the base component for rendering
 */
export { OptimizelyCmsPage as CmsPage, OptimizelyCmsPage as default } from '@optimizely/next-js/components'