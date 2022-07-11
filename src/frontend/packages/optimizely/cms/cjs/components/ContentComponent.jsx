"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentComponent = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const use_1 = require("../provider/use");
const index_1 = require("../hooks/index");
const content_reference_1 = require("../util/content-reference");
const ErrorBoundary_1 = require("./ErrorBoundary");
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
const ContentComponent = (props) => {
    var _a, _b, _c, _d;
    const { api, inEditMode } = (0, use_1.useOptimizely)();
    const contentTypePath = typeof (props.content) === 'string' ? props.contentType : props.content.contentType;
    const { data: Renderer, loading: componentIsLoading, importPath } = (0, index_1.useContentComponent)(contentTypePath, props.prefix, props.tag);
    //const { data } = useContent(props.content, undefined, undefined, props.locale)
    const { locale, content } = props;
    const contentId = ((_a = (0, index_1.buildContentURI)(content, undefined, undefined, locale, inEditMode)) === null || _a === void 0 ? void 0 : _a.href) || 'undefined';
    const [additionalProps, setAdditionalProps] = (0, react_1.useState)({ contentId, data: {} });
    //@ToDo: Add support for loading content dynamically
    // Load additional props dynamically
    (0, react_1.useEffect)(() => {
        let isCancelled = false;
        if (api && (Renderer === null || Renderer === void 0 ? void 0 : Renderer.getDynamicProps) && (0, content_reference_1.referenceIsIContent)(content))
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
    if (!(0, content_reference_1.referenceIsIContent)(content)) {
        console.info("ContentComponent: No IContent");
        return (_b = props.loader) !== null && _b !== void 0 ? _b : <>{props.children}</>;
    }
    if (!Renderer) {
        if (!componentIsLoading)
            console.warn("ContentComponent: No Renderer", `@components/cms/${importPath}`);
        else
            console.info("ContentComponent: Awaiting renderer", `@components/cms/${importPath}`, "If this occurs during the initial load, you'll probably experience hydration errors as well.");
        return (_c = props.loader) !== null && _c !== void 0 ? _c : <>{props.children}</>;
    }
    if (!api) {
        console.info("ContentComponent: No API");
        return (_d = props.loader) !== null && _d !== void 0 ? _d : <>{props.children}</>;
    }
    //if (DEBUG_ENABLED)
    //    console.log(`Rendering content item ${ contentId } using ${ Renderer.displayName ?? UNSPECIFIED_COMPONENT_NAME }`)
    const additionalPropsToRender = additionalProps.contentId === contentId ? additionalProps.data : {};
    return <Renderer {...props} {...additionalPropsToRender} content={content}/>;
};
exports.ContentComponent = ContentComponent;
exports.ContentComponent.displayName = "Optimizely CMS: IContent Container";
exports.ContentComponent.defaultProps = {
    locale: 'en'
};
exports.default = (0, ErrorBoundary_1.withErrorBoundary)(exports.ContentComponent);
//# sourceMappingURL=ContentComponent.jsx.map