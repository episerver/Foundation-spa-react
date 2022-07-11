"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInstance = exports.get = exports.setup = exports.Api = exports.Models = void 0;
// Exports
exports.Models = require("./models");
exports.Api = require("./api");
// Global logic
const cms_1 = require("@optimizely/cms");
const commerce_1 = require("@optimizely/commerce");
const api_1 = require("./api");
let isSetupCompleted = false;
function setup() {
    (0, commerce_1.setup)();
    if (cms_1.ContentDelivery.Container.isInitialized())
        throw new Error('The Commerce API must be initialized prior to the first usage of the ContentDelivery API');
    cms_1.ContentDelivery.Container.apiType = api_1.FoundationAPI;
    isSetupCompleted = true;
}
exports.setup = setup;
function get() {
    if (!isSetupCompleted)
        throw new Error('The setup() method must be invoked prior to the get() method');
    const api = cms_1.ContentDelivery.Container.instance;
    if (!((0, commerce_1.isCommerceApi)(api) && (0, api_1.isFoundationApi)(api)))
        throw new Error('The ContentDeliveryAPI Client does not have the foundation methods');
    return api;
}
exports.get = get;
function createInstance(config) {
    const instance = cms_1.ContentDelivery.Container.createInstance(config);
    if (!((0, commerce_1.isCommerceApi)(instance) && (0, api_1.isFoundationApi)(instance)))
        throw new Error('The ContentDeliveryAPI Client does not have the foundation methods');
    return instance;
}
exports.createInstance = createInstance;
exports.default = get;
//# sourceMappingURL=index.js.map