import { createContext, useContext, Context } from 'react';
import { useEpiserver, Enums } from '@episerver/spa-core';
import SettingsApi from '../SettingsApi';

export const SettingsContext : Context<SettingsApi | undefined> = createContext<SettingsApi | undefined>(undefined);

/**
 * React Hook (for functional components) to retrieve the Episerver Context from 
 * the nearest Provider in the virtual dom.
 * 
 * @returns  { SettingsApi }
 */
export function useSettingsApi() : SettingsApi {
    const settingsContext = useContext(SettingsContext);
    const epi = useEpiserver();
    if (!epi) 
        throw new Error('The SettingsApi is only available as descendant of the EpiserverAPI!');
    
    if (!settingsContext) {
        if (epi.isDebugActive()) console.warn('Using settings without provider, this will generate a new service instance for every usage!');
        return new SettingsApi(
            epi.serviceContainer.getService(Enums.DefaultServices.ContentDeliveryAPI_V2),
            epi.serviceContainer.getService(Enums.DefaultServices.IContentRepository_V2),
            epi.serviceContainer.getService(Enums.DefaultServices.ServerContext)
        )
    }
    
    return settingsContext;
 }

 export default SettingsContext;