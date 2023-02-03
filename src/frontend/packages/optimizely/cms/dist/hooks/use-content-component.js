import { useRef, useState, useEffect, useMemo } from 'react';
import { useOptimizelyCms } from '../provider/index';
export function useContentComponent(contentTypePath, prefix, tag) {
    // Get a reference to the loader from the CMS
    const { loader } = useOptimizelyCms();
    // Recalculate the parameters only when the context changes
    const { id, importPath, typePath } = useMemo(() => {
        const typePath = contentTypePath ?? ['OptiContentLoading'];
        const id = `${typePath.join('/')}::p-${prefix ?? "default"}::t-${tag ?? "default "}`;
        const importPath = loader?.buildComponentImport(typePath, prefix, tag);
        return { id, importPath, typePath };
    }, [loader, contentTypePath, prefix, tag]);
    // Update the fields & references
    const contentComponent = useRef();
    const [loadedComponentType, setLoadedComponentType] = useState(contentComponent.current ? id : "-");
    const [isError, setIsError] = useState(false);
    contentComponent.current = loader?.tryDynamicSync(typePath, prefix, tag);
    // Fall back to async in case we don't have the component yet
    useEffect(() => {
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
export default useContentComponent;
//# sourceMappingURL=use-content-component.js.map