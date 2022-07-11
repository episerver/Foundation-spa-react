"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useContentEditing = void 0;
const react_1 = require("react");
const swr_1 = require("swr");
const edit_mode_1 = require("../util/edit-mode");
const use_library_1 = require("./use-library");
const useContentEditing = ({ cmsDomain, cmsVersion, cmsPath, communicatorFile }, currentUrl) => {
    // Prepare the SWR Configuration
    const { mutate } = (0, swr_1.useSWRConfig)();
    // Get the Content URL from the window, or fallback to the provided value
    const contentUrl = (0, edit_mode_1.tryGetWindowUrl)(currentUrl);
    // Build the injector script
    const injectorScript = (0, react_1.useMemo)(() => {
        const scriptPath = [cmsPath === null || cmsPath === void 0 ? void 0 : cmsPath.replace(/\/$/, ""), cmsVersion, communicatorFile === null || communicatorFile === void 0 ? void 0 : communicatorFile.replace(/^\//, "")].join('/');
        return new URL(scriptPath, cmsDomain).href;
    }, [cmsDomain, cmsPath, cmsVersion, communicatorFile]);
    // Load the mode info from the edit mode
    const info = (0, react_1.useMemo)(() => {
        const info = (0, edit_mode_1.getEditModeInfo)(contentUrl);
        return {
            info,
            inEditMode: info ? true : false,
            isEditable: info ? !info.isPreviewActive : false
        };
    }, [contentUrl]);
    // Load the editor
    const { status, lib } = (0, use_library_1.useLibrary)(injectorScript, 'epi', () => !info.inEditMode);
    const ctx = (0, react_1.useMemo)(() => {
        return {
            inEditMode: lib ? lib.inEditMode : info.inEditMode,
            isEditable: lib ? lib.isEditable : info.isEditable,
            loading: status == use_library_1.UseLibraryStatus.Loading,
            lib,
            info: info.info
        };
    }, [status, lib, info]);
    (0, react_1.useEffect)(() => {
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
exports.useContentEditing = useContentEditing;
exports.default = exports.useContentEditing;
//# sourceMappingURL=use-content-editing.js.map