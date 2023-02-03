import { SWRConfig } from 'swr';
import React from 'react';
import { OptimizelyCms } from './cms';
import { OptimizelyEditMode } from './edit-mode';
// Export Hooks from individual providers
export { useOptimizelyCms } from './cms';
export { useEditMode, useContentEditMode } from './edit-mode';
export const OptimizelyCmsContext = ({ children, cmsDomain, ComponentLoaderClass, cmsPath, cmsVersion, communicatorFile, components, currentUrl, defaultBranch, defaultSiteId, swrOptions }) => {
    return <OptimizelyCms cmsDomain={cmsDomain} ComponentLoaderClass={ComponentLoaderClass} components={components} defaultBranch={defaultBranch} defaultSiteId={defaultSiteId}>
        <SWRConfig value={swrOptions}>
            <OptimizelyEditMode cmsDomain={cmsDomain} cmsPath={cmsPath} cmsVersion={cmsVersion} communicatorFile={communicatorFile} currentUrl={currentUrl}>
                {children}
            </OptimizelyEditMode>
        </SWRConfig>
    </OptimizelyCms>;
};
OptimizelyCmsContext.defaultProps = {
    ...OptimizelyCms.defaultProps,
    ...OptimizelyEditMode.defaultProps
};
OptimizelyCmsContext.displayName = "Optimizely CMS: Context";
export default OptimizelyCmsContext;
//# sourceMappingURL=index.jsx.map