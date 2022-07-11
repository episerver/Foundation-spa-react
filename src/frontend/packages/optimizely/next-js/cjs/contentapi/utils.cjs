"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadComponent = exports.loadAdditionalProps = void 0;
const tslib_1 = require("tslib");
const utils_1 = require("@optimizely/cms/utils");
const components_1 = require("@optimizely/cms/components");
const loadModule = (forItem, prefix, tag, componentLoader) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const loader = (0, utils_1.resolve)(componentLoader, components_1.setup);
    const contentType = forItem.contentType;
    return loader.tryDynamicModuleAsync(contentType, prefix, tag);
});
const loadAdditionalProps = (forItem, prefix, tag) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const m = yield loadModule(forItem, prefix, tag);
    if (m === null || m === void 0 ? void 0 : m.loadAdditionalProps)
        return m.loadAdditionalProps(forItem);
    return null;
});
exports.loadAdditionalProps = loadAdditionalProps;
const loadComponent = (forItem, prefix, tag) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    var _a;
    return (_a = (yield loadModule(forItem, prefix, tag))) === null || _a === void 0 ? void 0 : _a.default;
});
exports.loadComponent = loadComponent;
//# sourceMappingURL=utils.js.map