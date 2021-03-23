import { Core, ContentDelivery, useServiceContainer } from '@episerver/spa-core';
import SettingsApi from './SettingsApi';

export enum DefaultServices {
    SettingsApi = "SettingsApi"
}

export class SettingsInitialization extends Core.BaseInitializableModule 
{
    protected name : string = 'Foundation Settings'

    public SortOrder : Readonly<number> = 110

    public ConfigureContainer(container: Core.IServiceContainer): void
    {
        if (!container.hasService(Core.DefaultServices.IContentRepository_V2))
            throw new Error(`The ${ this.name } module requires the Content Repository API to be registered in the container`);
        if (!container.hasService(Core.DefaultServices.ContentDeliveryAPI_V2))
            throw new Error(`The ${ this.name } module requires the Content Delivery API to be registered in the container`);

        const api = container.getService<ContentDelivery.IContentDeliveryAPI_V2>(Core.DefaultServices.ContentDeliveryAPI_V2);
        const repo = container.getService<ContentDelivery.IIContentRepositoryV2>(Core.DefaultServices.IContentRepository_V2);

        container.addService(DefaultServices.SettingsApi, new SettingsApi(api, repo));        
    }

    public StartModule(context: Core.IEpiserverContext): void
    {

    }

    public GetStateReducer(): Core.IStateReducerInfo<any> | null
    {
        return null;
    }
}

/**
 * Base type to provide guarded access to the services
 */
export type serviceGuard<T> = (value: any) => value is T;

/**
 * React Hook to directly access the SettingsApi
 * 
 * @returns { SettingsApi }
 */
export const useSettings : () => SettingsApi = (): SettingsApi => 
{
    return useService(DefaultServices.SettingsApi, isSettingsApi);
}

/**
 * Retrieve a strongly typed (and validated) service from the service container.
 * 
 * @param { string } key The key of the service in the Service Container
 * @param { serviceGuard<T> } guard The typeguard to apply to ensure the correct return type
 * @returns { T }
 */
export const useService : <T>(key: string, guard ?: serviceGuard<T>) => T = <T>(key: string, guard : serviceGuard<T>): T =>
{
    const container = useServiceContainer();
    if (!container.hasService(key))
        throw new Error(`The service ${ key } has not been registered`);
    const val = container.getService(key);
    if (!guard(val))
        throw new Error(`The service registered at ${ key } does not pass the guard check`);
    return val as T;
}

export const isSettingsApi : serviceGuard<SettingsApi> = (val : any) : val is SettingsApi =>
{
    if (typeof(val) != "object")
        return false;
    if (typeof(val.listContainers) != "function")
        return false;
    if (typeof(val.getContainer) != "function")
        return false;
    return true;
}
