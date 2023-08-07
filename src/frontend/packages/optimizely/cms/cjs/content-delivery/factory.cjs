"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInstance = void 0;
const tslib_1 = require("tslib");
const content_delivery_api_1 = tslib_1.__importDefault(require("./content-delivery-api"));
const config_1 = require("./config");
function createInstance(config, ApiClient) {
    var _a;
    // Read configuration from environment
    const envConfig = {
        apiUrl: process.env.OPTIMIZELY_DXP_URL || 'http://localhost:8000',
        debug: ((_a = process.env.OPTIMIZELY_DXP_DEBUG) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'true' || process.env.OPTIMIZELY_DXP_DEBUG === '1'
    };
    // Set default branch if configured
    if (process.env.OPTIMIZELY_DXP_DEFAULT_BRANCH)
        envConfig.defaultBranch = process.env.OPTIMIZELY_DXP_DEFAULT_BRANCH;
    const instanceConfig = Object.assign(Object.assign(Object.assign({}, config_1.DefaultConfig), envConfig), config);
    if (!(0, config_1.validateConfig)(instanceConfig))
        throw new Error("Optimizely - CMS: Invalid ContentDelivery API Configuration");
    const Client = ApiClient !== null && ApiClient !== void 0 ? ApiClient : content_delivery_api_1.default;
    return new Client(instanceConfig);
}
exports.createInstance = createInstance;
exports.default = createInstance;
//# sourceMappingURL=factory.js.map