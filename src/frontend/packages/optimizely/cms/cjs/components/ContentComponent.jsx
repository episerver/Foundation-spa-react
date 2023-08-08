"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentComponent = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const index_1 = require("../provider/index");
const use_content_component_1 = require("../hooks/use-content-component");
const use_content_1 = require("../hooks/use-content");
const edit_mode_1 = require("../provider/edit-mode");
const content_uri_1 = require("../hooks/content-uri");
const content_reference_1 = require("../util/content-reference");
const ErrorBoundary_1 = require("./ErrorBoundary");
const DEBUG_ENABLED = process.env.NODE_ENV !== 'production';
/**
 * React helper component enable both server side and client side rendering
 * of Optimizely content, without specifying the actual component that will
 * perform the rendering.
 *
 * @param       props       The component properties
 * @returns     The rendered component
 */
const ContentComponent = props => {
    // Property extraction & processing
    const { content, contentType, loader, locale, prefix, tag, children } = props;
    const { api } = (0, index_1.useOptimizelyCms)();
    const { inEditMode, visitorgroupsById } = (0, edit_mode_1.useEditMode)();
    const data = (0, use_content_1.useContent)(content, undefined, undefined, locale);
    const iContentData = data === null || data === void 0 ? void 0 : data.data;
    const contentTypePath = (0, react_1.useMemo)(() => (0, content_reference_1.referenceIsIContent)(content) ? content.contentType : (iContentData ? iContentData.contentType : contentType), [content, iContentData, contentType]);
    const component = (0, use_content_component_1.useContentComponent)(contentTypePath, prefix, tag);
    const RenderComponent = component.data;
    // Generate a "stable" contentId
    const contentId = (0, react_1.useMemo)(() => { var _a; return ((_a = (0, content_uri_1.buildContentURI)(content, undefined, undefined, locale, inEditMode, undefined, visitorgroupsById)) === null || _a === void 0 ? void 0 : _a.href) || 'undefined'; }, [content, locale, inEditMode, visitorgroupsById]);
    // Load dynamic properties in the client
    const [additionalProps, setAdditionalProps] = (0, react_1.useState)({ contentId, data: {} });
    (0, react_1.useEffect)(() => {
        let isCancelled = false;
        if (!(api && RenderComponent && iContentData))
            return;
        if (!RenderComponent.getDynamicProps)
            return;
        RenderComponent.getDynamicProps(iContentData, { api, inEditMode, locale }).then(dynamicProps => {
            if (isCancelled)
                return;
            (0, react_1.startTransition)(() => setAdditionalProps({ data: dynamicProps, contentId }));
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
        return loader !== null && loader !== void 0 ? loader : <>{children}</>;
    }
    // Handle the "No Data" Scenario
    if (!iContentData) {
        if (DEBUG_ENABLED)
            console.info("Optimizely - CMS: ContentComponent: No data (yet), asynchronous loading required", content);
        return loader !== null && loader !== void 0 ? loader : <>{children}</>;
    }
    // Perform the actual rendering
    const additionalPropsToRender = additionalProps.contentId === contentId ? additionalProps.data : {};
    return <RenderComponent {...props} {...additionalPropsToRender} content={iContentData}/>;
};
exports.ContentComponent = ContentComponent;
exports.ContentComponent.displayName = "Optimizely CMS: IContent Container";
exports.ContentComponent.defaultProps = {
    locale: 'en'
};
exports.default = (0, ErrorBoundary_1.withErrorBoundary)(exports.ContentComponent);
//# sourceMappingURL=ContentComponent.jsx.map