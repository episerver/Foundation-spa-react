import React, { useEffect, useState } from 'react';
import { useOptimizely } from '../provider/use';
import { useContentComponent, buildContentURI } from '../hooks/index';
import { referenceIsIContent } from '../util/content-reference';
import { withErrorBoundary } from './ErrorBoundary';
const DEBUG_ENABLED = process.env.NODE_ENV === 'development';
// const UNSPECIFIED_COMPONENT_NAME = 'Unnamed component'
/**
 * React helper component enable both server side and client side rendering
 * of Optimizely content, without specifying the actual component that will
 * perform the rendering.
 *
 * @param       props       The component properties
 * @returns     The rendered component
 */
export const ContentComponent = (props) => {
    const { api, inEditMode } = useOptimizely();
    const contentTypePath = typeof (props.content) === 'string' ? props.contentType : props.content.contentType;
    const { data: Renderer, loading: componentIsLoading, importPath } = useContentComponent(contentTypePath, props.prefix, props.tag);
    //const { data } = useContent(props.content, undefined, undefined, props.locale)
    const { locale, content } = props;
    const contentId = buildContentURI(content, undefined, undefined, locale, inEditMode)?.href || 'undefined';
    const [additionalProps, setAdditionalProps] = useState({ contentId, data: {} });
    //@ToDo: Add support for loading content dynamically
    // Load additional props dynamically
    useEffect(() => {
        let isCancelled = false;
        if (api && Renderer?.getDynamicProps && referenceIsIContent(content))
            Renderer.getDynamicProps(content, { api, locale }).then(x => {
                if (isCancelled)
                    return;
                setAdditionalProps({ contentId, data: x });
            }).catch(e => {
                if (DEBUG_ENABLED)
                    console.error("Error loading additional properties", e);
            });
        return () => { isCancelled = true; };
    }, [Renderer, contentId, content, api, locale]);
    if (!referenceIsIContent(content)) {
        console.info("ContentComponent: No IContent");
        return props.loader ?? <>{props.children}</>;
    }
    if (!Renderer) {
        if (!componentIsLoading)
            console.warn("ContentComponent: No Renderer", `@components/cms/${importPath}`);
        else
            console.info("ContentComponent: Awaiting renderer", `@components/cms/${importPath}`, "If this occurs during the initial load, you'll probably experience hydration errors as well.");
        return props.loader ?? <>{props.children}</>;
    }
    if (!api) {
        console.info("ContentComponent: No API");
        return props.loader ?? <>{props.children}</>;
    }
    //if (DEBUG_ENABLED)
    //    console.log(`Rendering content item ${ contentId } using ${ Renderer.displayName ?? UNSPECIFIED_COMPONENT_NAME }`)
    const additionalPropsToRender = additionalProps.contentId === contentId ? additionalProps.data : {};
    return <Renderer {...props} {...additionalPropsToRender} content={content}/>;
};
ContentComponent.displayName = "Optimizely CMS: IContent Container";
ContentComponent.defaultProps = {
    locale: 'en'
};
export default withErrorBoundary(ContentComponent);
//# sourceMappingURL=ContentComponent.jsx.map