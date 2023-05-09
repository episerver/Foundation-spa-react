"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useContentEditMode = exports.useEditMode = exports.OptimizelyEditMode = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const edit_mode_1 = require("../util/edit-mode");
const use_library_1 = require("../hooks/use-library");
const content_reference_1 = require("../util/content-reference");
const swr_1 = require("swr");
const content_uri_1 = require("../hooks/content-uri");
const DEFAULT_CMS_PATH = 'episerver/cms';
const DEFAULT_CMS_VERSION = 'latest';
const DEFAULT_CMS_COMMUNICATOR = 'clientresources/epi-cms/communicationInjector.js';
const DEBUG = process.env.NODE_ENV != 'production';
const EditModeContext = react_1.default.createContext({
    isEditable: false,
    inEditMode: false,
    isReady: false
});
EditModeContext.displayName = "Optimizely CMS Edit Mode Provider";
const OptimizelyEditMode = ({ children, currentUrl, cmsDomain, cmsPath, cmsVersion, communicatorFile }) => {
    const url = (0, edit_mode_1.tryGetWindowUrl)(currentUrl);
    const swr = (0, swr_1.useSWRConfig)();
    const info = (0, react_1.useMemo)(() => (0, edit_mode_1.getEditModeInfo)(url), [url]);
    const injectorScript = (0, react_1.useMemo)(() => {
        const scriptPath = [cmsPath === null || cmsPath === void 0 ? void 0 : cmsPath.replace(/\/$/, ""), cmsVersion, communicatorFile === null || communicatorFile === void 0 ? void 0 : communicatorFile.replace(/^\//, "")].join('/');
        return new URL(scriptPath, cmsDomain).href;
    }, [cmsDomain, cmsPath, cmsVersion, communicatorFile]);
    const { lib } = (0, use_library_1.useLibrary)(injectorScript, 'epi', () => info ? false : true);
    if (DEBUG) {
        console.log("Optimizely - CMS: Edit Mode > Info:", info);
        console.log("Optimizely - CMS: Edit Mode > Communicator Injector:", info ? "Requested" : "Blocked");
    }
    const contextValue = (0, react_1.useMemo)(() => {
        const editModeContext = {
            isEditable: lib ? lib.isEditable : (info ? !info.isPreviewActive : false),
            inEditMode: lib ? lib.inEditMode : (info ? true : false),
            isReady: lib ? lib.ready : true,
            contentId: info === null || info === void 0 ? void 0 : info.id,
            contentWorkId: info === null || info === void 0 ? void 0 : info.workId,
            contentReference: info === null || info === void 0 ? void 0 : info.contentReference,
            contentGuid: info === null || info === void 0 ? void 0 : info.guidValue
        };
        if (DEBUG) {
            console.groupCollapsed("Optimizely - CMS: Edit Mode > Context");
            console.log("Optimizely - CMS: Edit Mode > Context > Library loaded:", lib ? "Yes" : "No");
            console.log("Optimizely - CMS: Edit Mode > Context > URL parsed:", info ? "Yes" : "No");
            console.log("Optimizely - CMS: Edit Mode > Context > isEditable:", editModeContext.isEditable);
            console.log("Optimizely - CMS: Edit Mode > Context > inEditMode", editModeContext.inEditMode);
            console.log("Optimizely - CMS: Edit Mode > Context > isReady", editModeContext.isReady);
            console.log("Optimizely - CMS: Edit Mode > Context > contentId", editModeContext.contentId);
            console.log("Optimizely - CMS: Edit Mode > Context > contentWorkId", editModeContext.contentWorkId);
            console.log("Optimizely - CMS: Edit Mode > Context > contentReference", editModeContext.contentReference);
            console.log("Optimizely - CMS: Edit Mode > Context > contentGuid", editModeContext.contentGuid);
            console.groupEnd();
        }
        return editModeContext;
    }, [lib, info]);
    (0, react_1.useEffect)(() => {
        if (!lib)
            return;
        if (!swr)
            return;
        let unmounted = false;
        const handler = (event) => {
            if (unmounted)
                return;
            const [contentId] = event.contentLink.split('_');
            if (DEBUG) {
                console.log("Optimizely - CMS: Edit Mode > Received contentSaved event:", contentId, event);
            }
            swr.mutate((key) => {
                let toMutate = key == contentId || key == event.contentLink;
                if (!toMutate && typeof (key) == 'string' && (0, content_uri_1.isContentURI)(key)) {
                    const { contentIds } = (0, content_uri_1.parseContentURI)(key);
                    toMutate = contentIds.includes(contentId) || contentIds.includes(event.contentLink);
                }
                if (DEBUG && toMutate)
                    console.log("Optimizely - CMS: Edit Mode > Refreshing SWR Data for key:", key);
                return toMutate;
            });
        };
        lib.subscribe("contentSaved", handler);
        return () => {
            unmounted = true;
        };
    }, [lib, swr]);
    return <EditModeContext.Provider value={contextValue}>{children}</EditModeContext.Provider>;
};
exports.OptimizelyEditMode = OptimizelyEditMode;
exports.OptimizelyEditMode.defaultProps = {
    cmsPath: DEFAULT_CMS_PATH,
    cmsVersion: DEFAULT_CMS_VERSION,
    communicatorFile: DEFAULT_CMS_COMMUNICATOR
};
const useEditMode = () => (0, react_1.useContext)(EditModeContext);
exports.useEditMode = useEditMode;
const useContentEditMode = (iContent) => {
    const ctx = (0, react_1.useContext)(EditModeContext);
    const apiId = iContent ? (0, content_reference_1.createApiId)(iContent, false, ctx.inEditMode) : '';
    const contentEditable = iContent ? ctx.isEditable && ctx.contentReference == apiId : false;
    return Object.assign(Object.assign({}, ctx), { contentEditable });
};
exports.useContentEditMode = useContentEditMode;
//# sourceMappingURL=edit-mode.jsx.map