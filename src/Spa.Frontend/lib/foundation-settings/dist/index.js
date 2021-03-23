import { Core, useServiceContainer } from '@episerver/spa-core';
import SettingsApi from './SettingsApi';
export var DefaultServices;
(function (DefaultServices) {
    DefaultServices["SettingsApi"] = "SettingsApi";
})(DefaultServices || (DefaultServices = {}));
export class SettingsInitialization extends Core.BaseInitializableModule {
    constructor() {
        super(...arguments);
        this.name = 'Foundation Settings';
        this.SortOrder = 110;
    }
    ConfigureContainer(container) {
        if (!container.hasService(Core.DefaultServices.IContentRepository_V2))
            throw new Error(`The ${this.name} module requires the Content Repository API to be registered in the container`);
        if (!container.hasService(Core.DefaultServices.ContentDeliveryAPI_V2))
            throw new Error(`The ${this.name} module requires the Content Delivery API to be registered in the container`);
        const api = container.getService(Core.DefaultServices.ContentDeliveryAPI_V2);
        const repo = container.getService(Core.DefaultServices.IContentRepository_V2);
        container.addService(DefaultServices.SettingsApi, new SettingsApi(api, repo));
    }
    StartModule(context) {
    }
    GetStateReducer() {
        return null;
    }
}
/**
 * React Hook to directly access the SettingsApi
 *
 * @returns { SettingsApi }
 */
export const useSettings = () => {
    return useService(DefaultServices.SettingsApi, isSettingsApi);
};
/**
 * Retrieve a strongly typed (and validated) service from the service container.
 *
 * @param { string } key The key of the service in the Service Container
 * @param { serviceGuard<T> } guard The typeguard to apply to ensure the correct return type
 * @returns { T }
 */
export const useService = (key, guard) => {
    const container = useServiceContainer();
    if (!container.hasService(key))
        throw new Error(`The service ${key} has not been registered`);
    const val = container.getService(key);
    if (!guard(val))
        throw new Error(`The service registered at ${key} does not pass the guard check`);
    return val;
};
export const isSettingsApi = (val) => {
    if (typeof (val) != "object")
        return false;
    if (typeof (val.listContainers) != "function")
        return false;
    if (typeof (val.getContainer) != "function")
        return false;
    return true;
};
