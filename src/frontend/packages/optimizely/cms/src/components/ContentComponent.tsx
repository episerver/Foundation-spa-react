import type { FunctionComponent, ReactElement, PropsWithChildren } from 'react'
import type { IContent, ContentTypePath, ContentLink } from '../models'
import React, { useEffect, useState, useMemo, startTransition } from 'react'
import { useOptimizelyCms } from '../provider/index'
import { useContentComponent } from '../hooks/use-content-component'
import { useContent } from '../hooks/use-content'
import { useEditMode } from '../provider/edit-mode'
import { buildContentURI } from '../hooks/content-uri'
import { referenceIsIContent } from '../util/content-reference'
import { withErrorBoundary } from './ErrorBoundary'

const DEBUG_ENABLED = process.env.NODE_ENV !== 'production'

export type ContentComponentProps = ({
    /**
     * The content identifier of the content item to load. This
     * content item must have the same contentType as provided
     * for the component to render.
     * 
     * The result of loading this content item will be passed to the
     * component performing the actual rendering.
     */
    content: string
    
    /**
     * The content type as reported by the Content Delivery API
     * client.
     * 
     * This value will not be passed to the component that performs
     * the actual rendering.
     */
     contentType: ContentTypePath
} | {
    /**
     * The pre-loaded content item to be rendered by this component,
     * it will take the content type from the content to determine
     * the component needed for rendering.
     * 
     * This value will be passed to the component performing the actual
     * rendering.
     */
    content: IContent | ContentLink
}) & {
    /**
     * The prefix to ensure that the right template is used, even when
     * there's no tag set.
     */
    prefix?: string

    /**
     * The rendering tag as set on the content-area - used to enable
     * editors to switch templates.
     */
    tag?: string

    /**
     * The loader to use, if not set the children will be used
     */
    loader?: ReactElement

    /**
     * The current locale to use when rendering the component
     */
    locale?: string

    /**
     * Additional properties can be added to Content
     */
    [key: string] : any
}

type DynamicPropsContainer = {
    data: any,
    contentId: string
}

/**
 * React helper component enable both server side and client side rendering
 * of Optimizely content, without specifying the actual component that will
 * perform the rendering.
 * 
 * @param       props       The component properties
 * @returns     The rendered component
 */
export const ContentComponent : FunctionComponent<PropsWithChildren<ContentComponentProps>> = props => 
{
    // Property extraction & processing
    const { content, contentType, loader, locale, prefix, tag, children } = props
    const { api } = useOptimizelyCms()
    const { inEditMode, visitorgroupsById } = useEditMode()
    const data = useContent(content, undefined, undefined, locale)
    const iContentData = data?.data
    const contentTypePath : ContentTypePath = useMemo<ContentTypePath>(() => referenceIsIContent(content) ? content.contentType : (iContentData ? iContentData.contentType : contentType), [content, iContentData, contentType])
    const component = useContentComponent(contentTypePath, prefix, tag)
    const RenderComponent = component.data

    // Generate a "stable" contentId
    const contentId = useMemo(() => buildContentURI(content, undefined, undefined, locale, inEditMode, undefined, visitorgroupsById)?.href || 'undefined', [ content, locale, inEditMode, visitorgroupsById ])

    // Load dynamic properties in the client
    const [ additionalProps, setAdditionalProps] = useState<DynamicPropsContainer>({ contentId, data: {} })
    useEffect(() => {
        let isCancelled = false
        if (!(api && RenderComponent && iContentData))
            return

        if (!RenderComponent.getDynamicProps)
            return

        RenderComponent.getDynamicProps(iContentData, { api, inEditMode, locale }).then(dynamicProps => {
            if (isCancelled) return
            startTransition(() => setAdditionalProps({ data: dynamicProps, contentId }))
        }).catch(e => {
            if (DEBUG_ENABLED)
                console.error("Optimizely - CMS: ContentComponent: Error Fetching Dynamic Properties", e)
        })

        return () => { isCancelled = true; }
    }, [ api, RenderComponent, iContentData, inEditMode, locale, contentId ])

    //if (DEBUG_ENABLED) console.log("Optimizely - CMS: ContentComponent > render (id, component):", contentId, `@components/cms/${ component.importPath }`)

    // Handle the "No Component" Scenario
    if (!RenderComponent){
        if (DEBUG_ENABLED) {
            if (!component.loading)
                console.warn("Optimizely - CMS: ContentComponent: No Renderer", `@components/cms/${ component.importPath }`)
            else
                console.info("Optimizely - CMS: ContentComponent: Awaiting renderer", `@components/cms/${ component.importPath }`, "If this occurs during the initial load, you'll probably experience hydration errors as well.")
        }
        return loader ?? <>{ children }</>
    }

    // Handle the "No Data" Scenario
    if (!iContentData) {
        if (DEBUG_ENABLED) 
            console.info("Optimizely - CMS: ContentComponent: No data (yet), asynchronous loading required", content)
        return loader ?? <>{ children }</>
    }

    // Perform the actual rendering
    const additionalPropsToRender = additionalProps.contentId === contentId ? additionalProps.data : {}
    return <RenderComponent { ...props } { ...additionalPropsToRender } content={ iContentData }/>
}

ContentComponent.displayName = "Optimizely CMS: IContent Container"

ContentComponent.defaultProps = {
    locale: 'en'
}

export default withErrorBoundary(ContentComponent)