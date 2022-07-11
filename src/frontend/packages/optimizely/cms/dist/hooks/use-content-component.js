import { useRef, useState, useEffect, useMemo } from 'react';
import { useOptimizely } from '../provider/use';
export function useContentComponent(contentTypePath, prefix, tag) {
    const opti = useOptimizely();
    const loader = opti?.loader;
    const typePath = useMemo(() => contentTypePath ?? ['OptiContentLoading'], [contentTypePath]);
    const id = `${typePath.join('/')}::p-${prefix ?? "default"}::t-${tag ?? "default "}`;
    const contentComponent = useRef();
    const [loadedComponentType, setLoadedComponentType] = useState(contentComponent.current ? id : "-");
    const [isError, setIsError] = useState(false);
    contentComponent.current = loader?.tryDynamicSync(typePath, prefix, tag);
    const importPath = loader?.buildComponentImport(typePath, prefix, tag);
    //console.log("ContentComponent.Current", loader, contentTypePath, contentComponent.current);
    useEffect(() => {
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
export default useContentComponent;
//# sourceMappingURL=use-content-component.js.map