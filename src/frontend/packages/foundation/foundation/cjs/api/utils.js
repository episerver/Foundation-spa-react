"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFoundationApi = void 0;
function isFoundationApi(api) {
    return typeof (api.getProductInfo) === 'function';
}
exports.isFoundationApi = isFoundationApi;
//# sourceMappingURL=utils.js.map