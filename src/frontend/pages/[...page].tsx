import type { GetStaticPathsContext, GetStaticPathsResult } from 'next'
import type { OptimizelyCmsPageUrlParams } from '@optimizely/next-js/cms-page'

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
const DXP_DEBUG = false //process.env?.OPTIMIZELY_DXP_DEBUG != "0" && process.env.NODE_ENV != 'production'

/**
 * Statically generate all HTML for the pages currently published whithin the 
 * CMS. This uses an Optimizely Foundation SPA React specific service to get
 * all the routes very efficiently.
 * 
 * @param ctx The Static Path Generation context
 * @returns The list of pages
 */
export async function getStaticPaths(ctx : GetStaticPathsContext) : Promise<GetStaticPathsResult<OptimizelyCmsPageUrlParams>>
{
    const cms = createApiClient({ debug: DXP_DEBUG, defaultBranch: ctx.defaultLocale })
    
    let paths : { params: OptimizelyCmsPageUrlParams, locale?: string }[] = []
    for (const locale of ctx.locales ?? [ ctx.defaultLocale ])
    {
        const localPaths = await (cms.raw(`api/episerver/v3.0/site/${ SiteInfo.id }/routes`, { branch: locale }) as Promise<string[]>)
        paths = paths.concat(localPaths.map(lp => {
            const pathName = (new URL(lp, 'http://localhost/')).pathname
            const params = pathName.split('/').filter(x => x);
            if (params[0] == locale)
                params.shift();
            return {
                params: {
                    page: params
                },
                locale
            }
        }))
    }

    return {
        paths,
        fallback: 'blocking' // If a 404 for the first request to a page is acceptable, set this to: true
    }
}

/**
 * Override the default loading of static properties to append the site 
 * settings as provided by the Foundation SPA React demo site.
 * 
 * @param ctx 
 * @param cLoader 
 * @param cApi 
 * @returns 
 */
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
    OptimizelyCmsPage as CmsPage, 
    OptimizelyCmsPage as default 
} from '@optimizely/next-js/cms-page'