import { getServerSideProps as baseGetServerSideProps, isServerSideNotFound, isServerSideRedirect, resolveAwaitableProps } from "@optimizely/next-js/components"
import { preFetchSettings } from '@framework/foundation/cms/settings/prefetcher'
import { readValue as pv } from '@optimizely/cms/utils'
import { buildContentURI, contentsFetcher } from '@optimizely/cms/hooks'
import { LayoutSettings } from 'schema'

/**
 * Retrieve the server side rendering props for the edit pages (which are always
 * server side rendered. This takes the base implemenation and adds the Foundation
 * settings to it.
 * 
 * @param       ctx     The context for the server side rendering.
 * @returns     The parameters neeeded for server side rendering
 */
export const getServerSideProps : typeof baseGetServerSideProps = async ctx => {
    var props = await baseGetServerSideProps(ctx)
    if (isServerSideNotFound(props)) return props
    if (isServerSideRedirect(props)) return props
    const data = await resolveAwaitableProps(props)
    const layoutSettings = await preFetchSettings<LayoutSettings>("LayoutSettings", data.props.locale)
    if (layoutSettings.value) {
        data.props.fallback = data.props.fallback ?? {}
        data.props.fallback[layoutSettings.id] = layoutSettings.value
        const mainMenuItems = (pv(layoutSettings.value.settings, "mainMenu") ?? []).map(mm => mm.contentLink)
        const itemsId = buildContentURI(mainMenuItems, ["name","url"]).href
        data.props.fallback[itemsId] = await contentsFetcher(itemsId)
    }
    return data
}

/**
 * Reexport the base component for rendering
 */
export { OptimizelyCmsPage as CmsPage, OptimizelyCmsPage as default } from '@optimizely/next-js/components'