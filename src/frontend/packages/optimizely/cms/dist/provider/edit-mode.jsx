import React, { useContext, useMemo, useEffect } from 'react';
import { getEditModeInfo, tryGetWindowUrl } from '../util/edit-mode';
import { useLibrary } from '../hooks/use-library';
import { createApiId } from '../util/content-reference';
import { useSWRConfig } from 'swr';
import { parseContentURI, isContentURI } from '../hooks/content-uri';
const DEFAULT_CMS_PATH = 'episerver/cms';
const DEFAULT_CMS_VERSION = 'latest';
const DEFAULT_CMS_COMMUNICATOR = 'clientresources/epi-cms/communicationInjector.js';
const DEBUG = process.env.NODE_ENV != 'production';
const EditModeContext = React.createContext({
    isEditable: false,
    inEditMode: false,
    isReady: false
});
EditModeContext.displayName = "Optimizely CMS Edit Mode Provider";
export const OptimizelyEditMode = ({ children, currentUrl, cmsDomain, cmsPath, cmsVersion, communicatorFile }) => {
    const url = tryGetWindowUrl(currentUrl);
    const swr = useSWRConfig();
    const info = useMemo(() => getEditModeInfo(url), [url]);
    const injectorScript = useMemo(() => {
        const scriptPath = [cmsPath?.replace(/\/$/, ""), cmsVersion, communicatorFile?.replace(/^\//, "")].join('/');
        return new URL(scriptPath, cmsDomain).href;
    }, [cmsDomain, cmsPath, cmsVersion, communicatorFile]);
    const { lib } = useLibrary(injectorScript, 'epi', () => info ? false : true);
    if (DEBUG) {
        console.log("Optimizely - CMS: Edit Mode > Info:", info);
        console.log("Optimizely - CMS: Edit Mode > Communicator Injector:", info ? "Requested" : "Blocked");
    }
    const contextValue = useMemo(() => {
        const editModeContext = {
            isEditable: lib ? lib.isEditable : (info ? !info.isPreviewActive : false),
            inEditMode: lib ? lib.inEditMode : (info ? true : false),
            isReady: lib ? lib.ready : true,
            contentId: info?.id,
            contentWorkId: info?.workId,
            contentReference: info?.contentReference,
            contentGuid: info?.guidValue
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
    useEffect(() => {
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
                if (!toMutate && typeof (key) == 'string' && isContentURI(key)) {
                    const { contentIds } = parseContentURI(key);
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
OptimizelyEditMode.defaultProps = {
    cmsPath: DEFAULT_CMS_PATH,
    cmsVersion: DEFAULT_CMS_VERSION,
    communicatorFile: DEFAULT_CMS_COMMUNICATOR
};
export const useEditMode = () => useContext(EditModeContext);
export const useContentEditMode = (iContent) => {
    const ctx = useContext(EditModeContext);
    const apiId = iContent ? createApiId(iContent, false, ctx.inEditMode) : '';
    const contentEditable = iContent ? ctx.isEditable && ctx.contentReference == apiId : false;
    return {
        ...ctx,
        contentEditable
    };
};
//# sourceMappingURL=edit-mode.jsx.map