import { setup as createComponentLoader } from '../loader/index';
import React, { useMemo } from 'react';
import OptimizelyContext from './context';
import { createInstance as createCdApi } from '../content-delivery/index';
import { useContentEditing } from '../hooks';
const COMMUNICATOR_CMS_PATH = 'episerver/cms';
const COMMUNICATOR_FILE = 'clientresources/epi-cms/communicationInjector.js';
export const ContextProvider = ({ defaultBranch, cmsDomain, children, cmsPath, cmsVersion, communicatorFile, ComponentLoaderClass, currentContentId }) => {
    // Prepare default values
    const contentEditing = useContentEditing({ cmsDomain, cmsPath, cmsVersion: cmsVersion, communicatorFile });
    const api = useMemo(() => createCdApi({ defaultBranch: defaultBranch }), [defaultBranch]);
    const loader = useMemo(() => createComponentLoader({ loaderType: ComponentLoaderClass }), [ComponentLoaderClass]);
    const withActionsAndEvents = useMemo(() => {
        return {
            api,
            loader,
            defaultBranch: defaultBranch || "en",
            inEditMode: contentEditing.inEditMode,
            isEditable: contentEditing.inEditMode,
            isReady: contentEditing.loading === false,
            currentContentId: currentContentId,
            editableContent: contentEditing.info
        };
    }, [api, loader, defaultBranch, contentEditing, currentContentId]);
    return <OptimizelyContext.Provider value={withActionsAndEvents}>{children}</OptimizelyContext.Provider>;
};
ContextProvider.defaultProps = {
    cmsPath: COMMUNICATOR_CMS_PATH,
    communicatorFile: COMMUNICATOR_FILE,
    cmsVersion: 'latest',
    defaultBranch: 'en'
};
export default ContextProvider;
export class OptimizelyContentEvent extends Event {
    constructor(name, init) {
        super(name, init);
        this._data = init.data;
    }
    get data() {
        return this._data;
    }
}
//# sourceMappingURL=provider.jsx.map