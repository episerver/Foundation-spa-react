"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateConfig = exports.DefaultConfig = void 0;
/**
 * Default configuration to use when making requests to the
 * Content Delivery API.
 */
exports.DefaultConfig = {
    apiUrl: '/',
    selectAllProperties: true,
    expandAllProperties: false,
    debug: false,
    defaultBranch: 'en'
};
function validateConfig(config) {
    var _a;
    // No configuration is an invalid configuration
    if (!config)
        return false;
    // The API URL must end in a slash to be valid
    if (((_a = config.apiUrl) === null || _a === void 0 ? void 0 : _a.substr(-1)) !== '/')
        return false;
    // All tests passed
    return true;
}
exports.validateConfig = validateConfig;
//# sourceMappingURL=config.js.map