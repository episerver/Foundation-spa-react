"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useContentComponent = void 0;
const react_1 = require("react");
const index_1 = require("../provider/index");
function useContentComponent(contentTypePath, prefix, tag) {
    // Get a reference to the loader from the CMS
    const { loader } = (0, index_1.useOptimizelyCms)();
    // Recalculate the parameters only when the context changes
    const { id, importPath, typePath } = (0, react_1.useMemo)(() => {
        const typePath = contentTypePath !== null && contentTypePath !== void 0 ? contentTypePath : ['OptiContentLoading'];
        const id = `${typePath.join('/')}::p-${prefix !== null && prefix !== void 0 ? prefix : "default"}::t-${tag !== null && tag !== void 0 ? tag : "default "}`;
        const importPath = loader === null || loader === void 0 ? void 0 : loader.buildComponentImport(typePath, prefix, tag);
        return { id, importPath, typePath };
    }, [loader, contentTypePath, prefix, tag]);
    // Update the fields & references
    const contentComponent = (0, react_1.useRef)();
    const [loadedComponentType, setLoadedComponentType] = (0, react_1.useState)(contentComponent.current ? id : "-");
    const [isError, setIsError] = (0, react_1.useState)(false);
    contentComponent.current = loader === null || loader === void 0 ? void 0 : loader.tryDynamicSync(typePath, prefix, tag);
    // Fall back to async in case we don't have the component yet
    (0, react_1.useEffect)(() => {
        let isCancelled = false;
        if (!loader)
            return;
        if (contentComponent.current)
            return;
        loader.tryDynamicAsync(typePath, prefix, tag).then(x => {
            if (isCancelled)
                return;
            if (!x) {
                setIsError(true);
                return;
            }
            contentComponent.current = x;
            setLoadedComponentType(id);
        });
        return () => {
            isCancelled = true;
        };
    }, [loader, typePath, prefix, tag, id]);
    return {
        loading: loadedComponentType === "-",
        data: contentComponent.current,
        error: isError,
        id,
        importPath
    };
}
exports.useContentComponent = useContentComponent;
exports.default = useContentComponent;
//# sourceMappingURL=use-content-component.js.map