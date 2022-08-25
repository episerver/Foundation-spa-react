import { getStaticProps as baseGetStaticProps, staticPropsHasData } from '@optimizely/next-js/components'
import { readValue as pv, isDxpDebugActive } from '@optimizely/cms/utils'
import { buildContentURI, contentsFetcher } from '@optimizely/cms/hooks'
import { preFetchSettings } from '@framework/foundation/cms/settings/prefetcher'
import { LayoutSettings } from 'schema'

export { getStaticPaths } from '@optimizely/next-js/components'
import GlobalCache from '@framework/global-cache'
import SiteInfo from 'website.cjs'

const debug = isDxpDebugActive()

export const getStaticProps : typeof baseGetStaticProps = async (ctx) => 
{
    const base = await baseGetStaticProps(ctx)
    if ( !staticPropsHasData(base) )
        return base;

    const locale = base.props.locale

    const key = `LayoutSettings::${locale}::${SiteInfo.id}`
    if (debug) console.time(key)
    var layoutFallback = GlobalCache.get<Record<string, any>>(key);
    if (layoutFallback === undefined) {
        if (debug) console.timeLog(key, "Fetching from server")
        const layoutSettings = await preFetchSettings<LayoutSettings>("LayoutSettings", locale, SiteInfo.id)
        if (debug) console.timeLog(key, "Fetched raw settings", layoutSettings)
        layoutFallback = {}
        if (layoutSettings.value) {
            //base.props.fallback = base.props.fallback ?? {}
            layoutFallback[layoutSettings.id] = layoutSettings.value
            const mainMenuItems = (pv(layoutSettings.value.settings, "mainMenu") ?? []).map(mm => mm.contentLink)
            const itemsId = buildContentURI(mainMenuItems, ["name","url"], undefined, locale, false, undefined).href
            layoutFallback[itemsId] = await contentsFetcher(itemsId)
        }
    }
    
    if (debug) console.timeLog(key, "Copying fallback data")
    if (!base.props.fallback) base.props.fallback = {}
    Object.getOwnPropertyNames(layoutFallback)
        .forEach( fallbackId => { (base.props.fallback as Record<string, any>)[fallbackId] = (layoutFallback as Record<string, any>)[fallbackId]; })
    
        if (debug) console.timeEnd(key)
    
    return base
}

export { OptimizelyCmsPage as CmsPage, OptimizelyCmsPage as default } from '@optimizely/next-js/components'