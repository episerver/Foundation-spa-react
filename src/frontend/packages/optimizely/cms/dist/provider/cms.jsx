import React, { useContext, useMemo } from 'react';
import createContentDeliveryApi from '../content-delivery/factory';
import createComponentLoader from '../loader/factory';
const DEFAULT_CMS_BRANCH = 'en';
const DEFAULT_SITE_ID = '00000000-0000-0000-0000-000000000000';
const DEBUG = process.env.NODE_ENV != 'production';
const DXP_DEBUG = process.env.OPTIMIZELY_DXP_DEBUG?.toLowerCase() === 'true' || process.env.OPTIMIZELY_DXP_DEBUG === '1';
export const OptimizelyCmsContext = React.createContext({
    cmsDomain: 'http://localhost:8000',
    defaultBranch: DEFAULT_CMS_BRANCH,
    defaultSiteId: DEFAULT_SITE_ID
});
OptimizelyCmsContext.displayName = "Optimizely CMS Context";
export const OptimizelyCms = ({ children, cmsDomain, defaultBranch, defaultSiteId, ComponentLoaderClass, components }) => {
    const providerProps = useMemo(() => {
        if (DEBUG) {
            console.groupCollapsed("Optimizely - CMS: Context");
            console.time("Optimizely - CMS: Context");
            console.log("Optimizely - CMS: Context > Content Cloud Domain:", cmsDomain);
            console.log("Optimizely - CMS: Context > Default Language:", defaultBranch ?? DEFAULT_CMS_BRANCH);
            console.log("Optimizely - CMS: Context > Default Site ID:", defaultSiteId ?? DEFAULT_SITE_ID);
            console.log("Optimizely - CMS: Context > API Debug:", DXP_DEBUG ? "Enabled" : "Disabled");
        }
        const componentLoader = createComponentLoader({ loaderType: ComponentLoaderClass, args: [components] });
        const api = createContentDeliveryApi({ apiUrl: cmsDomain, defaultBranch: defaultBranch ?? DEFAULT_CMS_BRANCH, debug: DXP_DEBUG });
        if (DEBUG) {
            console.log("Optimizely - CMS: Context > Component Loader:", componentLoader);
            console.log("Optimizely - CMS: Context > API Client:", api);
            console.timeEnd("Optimizely - CMS: Context");
            console.groupEnd();
        }
        return {
            api: api,
            loader: componentLoader,
            cmsDomain: cmsDomain,
            defaultBranch: defaultBranch ?? DEFAULT_CMS_BRANCH,
            defaultSiteId: defaultSiteId ?? DEFAULT_SITE_ID
        };
    }, [cmsDomain, defaultBranch, defaultSiteId, ComponentLoaderClass, components]);
    return <OptimizelyCmsContext.Provider value={providerProps}>{children}</OptimizelyCmsContext.Provider>;
};
OptimizelyCms.displayName = "Optimizely CMS React Framework";
OptimizelyCms.defaultProps = {};
export default OptimizelyCms;
/**
 *
 * @returns
 */
export const useOptimizelyCms = () => useContext(OptimizelyCmsContext);
//# sourceMappingURL=cms.jsx.map