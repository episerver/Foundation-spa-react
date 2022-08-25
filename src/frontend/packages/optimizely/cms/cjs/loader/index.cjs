"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setup = void 0;
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./types"), exports);
tslib_1.__exportStar(require("./default-loader"), exports);
const default_loader_1 = require("./default-loader");
const defaultConfig = {
    loaderType: default_loader_1.DefaultComponentLoader,
    args: []
};
function validateConfig(toValidate) {
    return typeof (toValidate) === 'object' && toValidate !== null && Array.isArray(toValidate.args);
}
function setup(config) {
    var _a;
    const fullConfig = Object.assign(Object.assign({}, defaultConfig), config);
    if (!validateConfig(fullConfig))
        throw new Error('Invalid component loader configuration');
    const CLoader = (_a = fullConfig.loaderType) !== null && _a !== void 0 ? _a : default_loader_1.DefaultComponentLoader;
    return new CLoader(...fullConfig.args);
}
exports.setup = setup;
//# sourceMappingURL=index.js.map