export * from './icontent-delivery-api';
export * from './content-delivery-api';
export * as Utils from './util';
export * as ApiConfig from './config';
export * from './NetworkError';
import { validateConfig, DefaultConfig } from './config';
import { ContentDeliveryAPI } from './content-delivery-api';
import { OptiContentMode } from './util';
class ContentDeliveryContainer {
    constructor() {
        this.apiType = ContentDeliveryAPI;
    }
    get instance() {
        if (!this._instance)
            this._instance = this.setup();
        return this._instance;
    }
    set instance(api) {
        if (this._instance)
            throw new Error('The Content Delivery API Client has already been initialized');
        this._instance = api;
    }
    isInitialized() {
        return this._instance ? true : false;
    }
    set tokenProvider(provider) {
        this._gat = provider;
        // if (this._instance)
        //     this._instance = undefined
    }
    get tokenProvider() {
        return this._gat;
    }
    setup(config) {
        if (this._instance)
            throw new Error('The Content Delivery API Client has already been initialized');
        this._instance = this.createInstance(config);
        return this._instance;
    }
    createInstance(config) {
        // Build the configuration
        const apiConfig = this.createBasicConfig(config);
        if (this._gat && !apiConfig.getAccessToken)
            apiConfig.getAccessToken = this._gat;
        // Create instance
        return new this.apiType(apiConfig);
    }
    createBasicConfig(partial) {
        const myConfig = {
            apiUrl: process.env.OPTIMIZELY_DXP_URL || 'http://localhost:8000',
            debug: process.env.OPTIMIZELY_DXP_DEBUG?.toLowerCase() === 'true' || process.env.OPTIMIZELY_DXP_DEBUG === '1'
        };
        // Set default branch if configured
        if (process.env.OPTIMIZELY_DXP_DEFAULT_BRANCH)
            myConfig.defaultBranch = process.env.OPTIMIZELY_DXP_DEFAULT_BRANCH;
        const baseConfig = { ...DefaultConfig, ...myConfig, ...partial };
        if (validateConfig(baseConfig))
            return baseConfig;
        throw new Error("Invalid configuration generated, please update the context or create the configuration manually");
    }
}
export const Container = new ContentDeliveryContainer();
export function Current() {
    return Container.instance;
}
export function createInstance(config) {
    const instance = Container.createInstance(config);
    return instance;
}
export const MODE_DELIVERY = OptiContentMode.Delivery;
export const MODE_EDIT = OptiContentMode.Edit;
export default Current;
//# sourceMappingURL=index.js.map