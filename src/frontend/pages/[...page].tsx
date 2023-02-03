// Optimizely CMS
import { getStaticProps as baseGetStaticProps, staticPropsHasData } from '@optimizely/next-js/cms-page'
import { readValue as pv } from '@optimizely/cms/utils'
import { contentsFetcher } from '@optimizely/cms/use-contents'
import buildContentURI from '@optimizely/cms/content-uri'
import createComponentLoader from '@optimizely/cms/component-loader'
import createApiClient from '@optimizely/cms/content-delivery'

// Foundation
import { preFetchSettings } from '@framework/foundation/cms/settings/prefetcher'

// Local files
import CmsComponents from '@components/cms'
import { LayoutSettings } from 'schema'
import SiteInfo from 'website.cjs'


const DEBUG_ENABLED = process.env.NODE_ENV === 'development'
const DXP_DEBUG = false;

export const getStaticProps : typeof baseGetStaticProps = async (ctx, cLoader, cApi) => 
{
    if (DEBUG_ENABLED) {
        console.groupCollapsed("Site - CMS Content: getStaticProps")
        console.time("Site - CMS Content: getStaticProps")
        console.log("Site - CMS Content: getStaticProps > Create shared services")
    }
    const api = cApi ?? createApiClient({ debug: DXP_DEBUG, defaultBranch: ctx.defaultLocale })
    const loader = cLoader ?? createComponentLoader({ args: [ CmsComponents ] })

    if (DEBUG_ENABLED)
        console.log("Site - CMS Content: getStaticProps > Invoke base method")
    const base = await baseGetStaticProps(ctx, loader, api)

    if (staticPropsHasData(base) ) {
        const locale = base.props.locale
        console.log("Site - CMS Content: getStaticProps > Locale:", locale)
        console.log("Site - CMS Content: getStaticProps > Fetching Layout settings")
        const layoutSettings = await preFetchSettings<LayoutSettings>("LayoutSettings", locale, SiteInfo.id)
        if (layoutSettings.value) {
            base.props.fallback = base.props.fallback ?? {}
            base.props.fallback[layoutSettings.id] = layoutSettings.value
            console.log("Site - CMS Content: getStaticProps > Fetching Menu Items")
            const mainMenuItems = (pv(layoutSettings.value.settings, "mainMenu") ?? []).map(mm => mm.contentLink)
            const itemsId = buildContentURI(mainMenuItems, ["name","url"], undefined, locale, false, undefined).href
            base.props.fallback[itemsId] = await contentsFetcher(itemsId, api)
        }
    }
    if (DEBUG_ENABLED) {
        console.timeEnd("Site - CMS Content: getStaticProps")
        console.groupEnd()
    }

    return base
}

export { 
    getStaticPaths, 
    OptimizelyCmsPage as CmsPage, 
    OptimizelyCmsPage as default 
} from '@optimizely/next-js/cms-page'