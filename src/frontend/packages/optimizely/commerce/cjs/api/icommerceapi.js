"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCommerceApi = void 0;
function isCommerceApi(api) {
    return typeof (api.getPricing) === 'function';
}
exports.isCommerceApi = isCommerceApi;
//# sourceMappingURL=icommerceapi.js.map