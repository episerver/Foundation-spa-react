import type { FunctionComponent, ReactElement } from 'react'
import type { IContent, ContentTypePath } from '../models'
import React, { useEffect, useState } from 'react'
import { useOptimizely } from '../provider/use'
import { useContentComponent, buildContentURI } from '../hooks/index'
import { referenceIsIContent } from '../util/content-reference'
import { withErrorBoundary } from './ErrorBoundary'

const DEBUG_ENABLED = process.env.NODE_ENV === 'development'

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
    content: IContent
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

// const UNSPECIFIED_COMPONENT_NAME = 'Unnamed component'

/**
 * React helper component enable both server side and client side rendering
 * of Optimizely content, without specifying the actual component that will
 * perform the rendering.
 * 
 * @param       props       The component properties
 * @returns     The rendered component
 */
export const ContentComponent : FunctionComponent<ContentComponentProps> = (props) => 
{
    const { api, inEditMode } = useOptimizely()
    const contentTypePath : ContentTypePath = typeof(props.content) === 'string' ? props.contentType : props.content.contentType
    const { data: Renderer, loading: componentIsLoading, importPath } = useContentComponent(contentTypePath, props.prefix, props.tag)
    //const { data } = useContent(props.content, undefined, undefined, props.locale)

    const { locale, content } = props
    const contentId = buildContentURI(content, undefined, undefined, locale, inEditMode)?.href || 'undefined'

    type AdditionalPropsContainer = {
        data: any,
        contentId: string
    }

    const [additionalProps, setAdditionalProps] = useState<AdditionalPropsContainer>({ contentId, data: {} })

    //@ToDo: Add support for loading content dynamically

    // Load additional props dynamically
    useEffect(() => {
        let isCancelled = false

        if (api && Renderer?.getDynamicProps && referenceIsIContent(content))
            Renderer.getDynamicProps(content, { api, locale }).then(x => {
                if (isCancelled) return
                setAdditionalProps({ contentId, data: x })
            }).catch(e => {
                if (DEBUG_ENABLED) console.error("Error loading additional properties", e)
            })

        return () => { isCancelled = true }
    }, [ Renderer, contentId, content, api, locale ])

    if (!referenceIsIContent(content)) {
        console.info("ContentComponent: No IContent")
        return props.loader ?? <>{ props.children }</>
    }

    if (!Renderer) {
        if (!componentIsLoading)
            console.warn("ContentComponent: No Renderer", `@components/cms/${ importPath }`)
        else
            console.info("ContentComponent: Awaiting renderer", `@components/cms/${ importPath }`, "If this occurs during the initial load, you'll probably experience hydration errors as well.")
        return props.loader ?? <>{ props.children }</>
    }

    if (!api) {
        console.info("ContentComponent: No API")
        return props.loader ?? <>{ props.children }</>
    }

    //if (DEBUG_ENABLED)
    //    console.log(`Rendering content item ${ contentId } using ${ Renderer.displayName ?? UNSPECIFIED_COMPONENT_NAME }`)

    const additionalPropsToRender = additionalProps.contentId === contentId ? additionalProps.data : {}
    return <Renderer { ...props } { ...additionalPropsToRender } content={ content }/>
}

ContentComponent.displayName = "Optimizely CMS: IContent Container"

ContentComponent.defaultProps = {
    locale: 'en'
}

export default withErrorBoundary(ContentComponent)