"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MODE_EDIT = exports.MODE_DELIVERY = exports.createInstance = exports.Current = exports.Container = exports.ApiConfig = exports.Utils = void 0;
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./icontent-delivery-api"), exports);
tslib_1.__exportStar(require("./content-delivery-api"), exports);
exports.Utils = tslib_1.__importStar(require("./util"));
exports.ApiConfig = tslib_1.__importStar(require("./config"));
tslib_1.__exportStar(require("./NetworkError"), exports);
const config_1 = require("./config");
const content_delivery_api_1 = require("./content-delivery-api");
class ContentDeliveryContainer {
    constructor() {
        this.apiType = content_delivery_api_1.ContentDeliveryAPI;
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
        var _a;
        const myConfig = {
            apiUrl: process.env.OPTIMIZELY_DXP_URL || 'http://localhost',
            debug: ((_a = process.env.OPTIMIZELY_DXP_DEBUG) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'true' || process.env.OPTIMIZELY_DXP_DEBUG === '1'
        };
        // Set default branch if configured
        if (process.env.OPTIMIZELY_DXP_DEFAULT_BRANCH)
            myConfig.defaultBranch = process.env.OPTIMIZELY_DXP_DEFAULT_BRANCH;
        const baseConfig = Object.assign(Object.assign(Object.assign({}, config_1.DefaultConfig), myConfig), partial);
        if ((0, config_1.validateConfig)(baseConfig))
            return baseConfig;
        throw new Error("Invalid configuration generated, please update the context or create the configuration manually");
    }
}
exports.Container = new ContentDeliveryContainer();
function Current() {
    return exports.Container.instance;
}
exports.Current = Current;
function createInstance(config) {
    const instance = exports.Container.createInstance(config);
    return instance;
}
exports.createInstance = createInstance;
exports.MODE_DELIVERY = "content" /* OptiContentMode.Delivery */;
exports.MODE_EDIT = "contentmanagement" /* OptiContentMode.Edit */;
exports.default = Current;
//# sourceMappingURL=index.js.map