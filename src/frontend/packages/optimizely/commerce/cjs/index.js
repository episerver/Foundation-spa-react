"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInstance = exports.get = exports.setup = exports.isCommerceApi = exports.Utils = exports.Api = exports.Models = void 0;
// Exports
exports.Models = require("./models");
exports.Api = require("./api");
exports.Utils = require("./utils");
var api_1 = require("./api");
Object.defineProperty(exports, "isCommerceApi", { enumerable: true, get: function () { return api_1.isCommerceApi; } });
// Global logic
const cms_1 = require("@optimizely/cms");
const api_2 = require("./api");
let isSetupCompleted = false;
function setup() {
    if (cms_1.ContentDelivery.Container.isInitialized())
        throw new Error('The Commerce API must be initialized prior to the first usage of the ContentDelivery API');
    cms_1.ContentDelivery.Container.apiType = api_2.CommerceApi;
    isSetupCompleted = true;
}
exports.setup = setup;
function get() {
    if (!isSetupCompleted)
        throw new Error('The setup() method must be invoked prior to the get() method');
    const api = cms_1.ContentDelivery.Container.instance;
    if (!(0, api_2.isCommerceApi)(api))
        throw new Error('The ContentDeliveryAPI Client does not have the commerce methods');
    return api;
}
exports.get = get;
function createInstance(config) {
    return cms_1.ContentDelivery.Container.createInstance(config);
}
exports.createInstance = createInstance;
exports.default = get;
//# sourceMappingURL=index.js.map