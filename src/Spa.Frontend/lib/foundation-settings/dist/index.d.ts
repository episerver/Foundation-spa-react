import { Core } from '@episerver/spa-core';
import SettingsApi from './SettingsApi';
export declare enum DefaultServices {
    SettingsApi = "SettingsApi"
}
export declare class SettingsInitialization extends Core.BaseInitializableModule {
    protected name: string;
    SortOrder: Readonly<number>;
    ConfigureContainer(container: Core.IServiceContainer): void;
    StartModule(context: Core.IEpiserverContext): void;
    GetStateReducer(): Core.IStateReducerInfo<any> | null;
}
/**
 * Base type to provide guarded access to the services
 */
export declare type serviceGuard<T> = (value: any) => value is T;
/**
 * React Hook to directly access the SettingsApi
 *
 * @returns { SettingsApi }
 */
export declare const useSettings: () => SettingsApi;
/**
 * Retrieve a strongly typed (and validated) service from the service container.
 *
 * @param { string } key The key of the service in the Service Container
 * @param { serviceGuard<T> } guard The typeguard to apply to ensure the correct return type
 * @returns { T }
 */
export declare const useService: <T>(key: string, guard?: serviceGuard<T>) => T;
export declare const isSettingsApi: serviceGuard<SettingsApi>;
