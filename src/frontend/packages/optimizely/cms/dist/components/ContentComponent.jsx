import React, { useEffect, useState, useMemo, startTransition } from 'react';
import { useOptimizelyCms } from '../provider/index';
import { useContentComponent } from '../hooks/use-content-component';
import { useContent } from '../hooks/use-content';
import { useEditMode } from '../provider/edit-mode';
import { buildContentURI } from '../hooks/content-uri';
import { referenceIsIContent } from '../util/content-reference';
import { withErrorBoundary } from './ErrorBoundary';
const DEBUG_ENABLED = process.env.NODE_ENV !== 'production';
/**
 * React helper component enable both server side and client side rendering
 * of Optimizely content, without specifying the actual component that will
 * perform the rendering.
 *
 * @param       props       The component properties
 * @returns     The rendered component
 */
export const ContentComponent = props => {
    // Property extraction & processing
    const { content, contentType, loader, locale, prefix, tag, children } = props;
    const { api } = useOptimizelyCms();
    const { inEditMode, visitorgroupsById } = useEditMode();
    const data = useContent(content, undefined, undefined, locale);
    const iContentData = data?.data;
    const contentTypePath = useMemo(() => referenceIsIContent(content) ? content.contentType : (iContentData ? iContentData.contentType : contentType), [content, iContentData, contentType]);
    const component = useContentComponent(contentTypePath, prefix, tag);
    const RenderComponent = component.data;
    // Generate a "stable" contentId
    const contentId = useMemo(() => buildContentURI(content, undefined, undefined, locale, inEditMode, undefined, visitorgroupsById)?.href || 'undefined', [content, locale, inEditMode, visitorgroupsById]);
    // Load dynamic properties in the client
    const [additionalProps, setAdditionalProps] = useState({ contentId, data: {} });
    useEffect(() => {
        let isCancelled = false;
        if (!(api && RenderComponent && iContentData))
            return;
        if (!RenderComponent.getDynamicProps)
            return;
        RenderComponent.getDynamicProps(iContentData, { api, inEditMode, locale }).then(dynamicProps => {
            if (isCancelled)
                return;
            startTransition(() => setAdditionalProps({ data: dynamicProps, contentId }));
        }).catch(e => {
            if (DEBUG_ENABLED)
                console.error("Optimizely - CMS: ContentComponent: Error Fetching Dynamic Properties", e);
        });
        return () => { isCancelled = true; };
    }, [api, RenderComponent, iContentData, inEditMode, locale, contentId]);
    //if (DEBUG_ENABLED) console.log("Optimizely - CMS: ContentComponent > render (id, component):", contentId, `@components/cms/${ component.importPath }`)
    // Handle the "No Component" Scenario
    if (!RenderComponent) {
        if (DEBUG_ENABLED) {
            if (!component.loading)
                console.warn("Optimizely - CMS: ContentComponent: No Renderer", `@components/cms/${component.importPath}`);
            else
                console.info("Optimizely - CMS: ContentComponent: Awaiting renderer", `@components/cms/${component.importPath}`, "If this occurs during the initial load, you'll probably experience hydration errors as well.");
        }
        return loader ?? <>{children}</>;
    }
    // Handle the "No Data" Scenario
    if (!iContentData) {
        if (DEBUG_ENABLED)
            console.info("Optimizely - CMS: ContentComponent: No data (yet), asynchronous loading required", content);
        return loader ?? <>{children}</>;
    }
    // Perform the actual rendering
    const additionalPropsToRender = additionalProps.contentId === contentId ? additionalProps.data : {};
    return <RenderComponent {...props} {...additionalPropsToRender} content={iContentData}/>;
};
ContentComponent.displayName = "Optimizely CMS: IContent Container";
ContentComponent.defaultProps = {
    locale: 'en'
};
export default withErrorBoundary(ContentComponent);
//# sourceMappingURL=ContentComponent.jsx.map