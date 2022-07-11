import { useEffect, useMemo } from 'react';
import { useSWRConfig } from 'swr';
import { getEditModeInfo, tryGetWindowUrl } from '../util/edit-mode';
import { useLibrary, UseLibraryStatus } from './use-library';
export const useContentEditing = ({ cmsDomain, cmsVersion, cmsPath, communicatorFile }, currentUrl) => {
    // Prepare the SWR Configuration
    const { mutate } = useSWRConfig();
    // Get the Content URL from the window, or fallback to the provided value
    const contentUrl = tryGetWindowUrl(currentUrl);
    // Build the injector script
    const injectorScript = useMemo(() => {
        const scriptPath = [cmsPath?.replace(/\/$/, ""), cmsVersion, communicatorFile?.replace(/^\//, "")].join('/');
        return new URL(scriptPath, cmsDomain).href;
    }, [cmsDomain, cmsPath, cmsVersion, communicatorFile]);
    // Load the mode info from the edit mode
    const info = useMemo(() => {
        const info = getEditModeInfo(contentUrl);
        return {
            info,
            inEditMode: info ? true : false,
            isEditable: info ? !info.isPreviewActive : false
        };
    }, [contentUrl]);
    // Load the editor
    const { status, lib } = useLibrary(injectorScript, 'epi', () => !info.inEditMode);
    const ctx = useMemo(() => {
        return {
            inEditMode: lib ? lib.inEditMode : info.inEditMode,
            isEditable: lib ? lib.isEditable : info.isEditable,
            loading: status == UseLibraryStatus.Loading,
            lib,
            info: info.info
        };
    }, [status, lib, info]);
    useEffect(() => {
        let cancelled = false;
        let rm = () => { };
        if (typeof (lib) == 'object' && lib != null) {
            const onContentSaved = (data) => {
                if (cancelled)
                    return;
                const [contentId, workId] = data.contentLink.split('_', 2);
                mutate(contentId);
                mutate(data.contentLink);
                console.log(`Loading new version for ${contentId} (Version: ${workId})`);
            };
            const { remove } = lib.subscribe("contentSaved", onContentSaved);
            rm = remove;
        }
        return () => {
            cancelled = true;
            rm();
        };
    }, [lib, mutate]);
    return ctx;
};
export default useContentEditing;
//# sourceMappingURL=use-content-editing.js.map