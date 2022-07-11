import { getStaticProps as baseGetStaticProps, staticPropsHasData } from '@optimizely/next-js/components'
import { readValue as pv } from '@optimizely/cms/utils'
import { buildContentURI, contentsFetcher } from '@optimizely/cms/hooks'
import { preFetchSettings } from '@framework/foundation/cms/settings/prefetcher'
import { LayoutSettings } from 'schema'

export { getStaticPaths } from '@optimizely/next-js/components'
import SiteInfo from 'website.cjs'

export const getStaticProps : typeof baseGetStaticProps = async (ctx) => 
{
    const base = await baseGetStaticProps(ctx)
    if ( !staticPropsHasData(base) )
        return base;

    const locale = base.props.locale

    const layoutSettings = await preFetchSettings<LayoutSettings>("LayoutSettings", locale, SiteInfo.id)
    if (layoutSettings.value) {
        base.props.fallback = base.props.fallback ?? {}
        base.props.fallback[layoutSettings.id] = layoutSettings.value
        const mainMenuItems = (pv(layoutSettings.value.settings, "mainMenu") ?? []).map(mm => mm.contentLink)
        const itemsId = buildContentURI(mainMenuItems, ["name","url"], undefined, locale, false, undefined).href
        base.props.fallback[itemsId] = await contentsFetcher(itemsId)
    }
    
    return base
}

export { OptimizelyCmsPage as CmsPage, OptimizelyCmsPage as default } from '@optimizely/next-js/components'