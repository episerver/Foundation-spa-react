"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useContentComponent = void 0;
const react_1 = require("react");
const use_1 = require("../provider/use");
function useContentComponent(contentTypePath, prefix, tag) {
    const opti = (0, use_1.useOptimizely)();
    const loader = opti === null || opti === void 0 ? void 0 : opti.loader;
    const typePath = (0, react_1.useMemo)(() => contentTypePath !== null && contentTypePath !== void 0 ? contentTypePath : ['OptiContentLoading'], [contentTypePath]);
    const id = `${typePath.join('/')}::p-${prefix !== null && prefix !== void 0 ? prefix : "default"}::t-${tag !== null && tag !== void 0 ? tag : "default "}`;
    const contentComponent = (0, react_1.useRef)();
    const [loadedComponentType, setLoadedComponentType] = (0, react_1.useState)(contentComponent.current ? id : "-");
    const [isError, setIsError] = (0, react_1.useState)(false);
    contentComponent.current = loader === null || loader === void 0 ? void 0 : loader.tryDynamicSync(typePath, prefix, tag);
    const importPath = loader === null || loader === void 0 ? void 0 : loader.buildComponentImport(typePath, prefix, tag);
    //console.log("ContentComponent.Current", loader, contentTypePath, contentComponent.current);
    (0, react_1.useEffect)(() => {
        let isCancelled = false;
        if (!loader)
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