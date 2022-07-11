"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoundationAPI = void 0;
const tslib_1 = require("tslib");
const cms_1 = require("@optimizely/cms");
const commerce_1 = require("@optimizely/commerce");
class FoundationAPI extends commerce_1.Api.CommerceApi {
    removeFromWishlist(options) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const wishlistId = (_a = options === null || options === void 0 ? void 0 : options.wishlistId) !== null && _a !== void 0 ? _a : 'mine';
            const currencyId = options === null || options === void 0 ? void 0 : options.currency;
            const marketId = options === null || options === void 0 ? void 0 : options.marketId;
            const products = (options === null || options === void 0 ? void 0 : options.withProductData) ? '1' : '0';
            const lineId = options === null || options === void 0 ? void 0 : options.lineItemId;
            // Output debug
            if (this._config.debug) {
                console.groupCollapsed("Adding to wishlist");
                console.info("Wishlist ID", wishlistId);
                console.info("Line ID:", lineId);
            }
            // Build headers
            const headers = {
                "Content-Type": "application/x-www-form-urlencoded"
            };
            if (marketId)
                headers["x-marketid"] = marketId;
            if (currencyId)
                headers["x-currency"] = currencyId;
            // Build body
            const bodyData = new URLSearchParams();
            bodyData.set("lineItemId", lineId);
            bodyData.set("quantity", "1");
            const body = bodyData.toString();
            // Method
            const method = "post";
            // Execute request
            const response = wishlistId === 'mine' ?
                yield this.doFoundationApiRequest("api/foundation/v1/wishlist/mine/remove" /* FoundationApiEndPoints.RemoveFromMyWishlist */, { urlParams: { products }, headers, body, method }) :
                yield this.doFoundationApiRequest("api/foundation/v1/wishlist/mine/{ $wishlistId }/remove" /* FoundationApiEndPoints.RemoveFromWishlist */, { urlParams: { wishlistId, products }, headers, body, method });
            if (this._config.debug) {
                console.info("Wishlist data", response);
                console.groupEnd();
            }
            return response;
        });
    }
    addToWishlist(options) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const wishlistId = (_a = options === null || options === void 0 ? void 0 : options.wishlistId) !== null && _a !== void 0 ? _a : 'mine';
            const currencyId = options === null || options === void 0 ? void 0 : options.currency;
            const marketId = options === null || options === void 0 ? void 0 : options.marketId;
            const products = (options === null || options === void 0 ? void 0 : options.withProductData) ? '1' : '0';
            const productId = (options === null || options === void 0 ? void 0 : options.productId) ? cms_1.Utils.ContentReference.createApiId(options.productId, true, false) : undefined;
            const variantId = cms_1.Utils.ContentReference.createApiId(options.variantId, true, false);
            // Output debug
            if (this._config.debug) {
                console.groupCollapsed("Adding to wishlist");
                console.info("Wishlist ID", wishlistId);
                console.info("Product ID:", productId);
                console.info("Variant ID:", variantId);
            }
            // Build headers
            const headers = {
                "Content-Type": "application/x-www-form-urlencoded"
            };
            if (marketId)
                headers["x-marketid"] = marketId;
            if (currencyId)
                headers["x-currency"] = currencyId;
            // Build body
            const bodyData = new URLSearchParams();
            if (productId)
                bodyData.set("productId", productId);
            bodyData.set("variantId", variantId);
            bodyData.set("quantity", "1");
            const body = bodyData.toString();
            // Method
            const method = "post";
            // Execute request
            const response = wishlistId === 'mine' ?
                yield this.doFoundationApiRequest("api/foundation/v1/wishlist/mine/add" /* FoundationApiEndPoints.AddToMyWishlist */, { urlParams: { products }, headers, body, method }) :
                yield this.doFoundationApiRequest("api/foundation/v1/wishlist/mine/{ $wishlistId }/add" /* FoundationApiEndPoints.AddToWishlist */, { urlParams: { wishlistId, products }, headers, body, method });
            if (this._config.debug) {
                console.info("Wishlist data", response);
                console.groupEnd();
            }
            return response;
        });
    }
    getCurrentCustomer() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this._config.debug)
                console.groupCollapsed("Fetching current customer");
            const response = yield this.doFoundationApiRequest("api/foundation/v1/profile" /* FoundationApiEndPoints.CurrentCustomer */);
            if (this._config.debug)
                console.info("Tranforming API Response");
            const customer = Object.assign(Object.assign({}, response), { BirthDate: new Date(response.BirthDate) });
            if (this._config.debug) {
                console.debug("Tranformed object", customer);
                console.groupEnd();
            }
            return customer;
        });
    }
    getProductInfo(contentId, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const currencyId = options === null || options === void 0 ? void 0 : options.currency;
            const marketId = options === null || options === void 0 ? void 0 : options.marketId;
            const headers = {};
            if (marketId)
                headers["x-marketid"] = marketId;
            if (currencyId)
                headers["x-currency"] = currencyId;
            const contentApiId = cms_1.Utils.ContentReference.createApiId(contentId, true);
            if (this._config.debug) {
                console.groupCollapsed("Fetching product information");
                console.info("Product ID", contentApiId, contentId);
            }
            const response = yield this.doFoundationApiRequest("api/foundation/v1/catalog/product/{ $contentId }" /* FoundationApiEndPoints.ProductInfo */, { urlParams: { contentId: contentApiId }, headers });
            if (this._config.debug)
                console.groupEnd();
            return response;
        });
    }
    getWishlist(options) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const wishlistId = (_a = options === null || options === void 0 ? void 0 : options.wishlistId) !== null && _a !== void 0 ? _a : 'mine';
            const currencyId = options === null || options === void 0 ? void 0 : options.currency;
            const marketId = options === null || options === void 0 ? void 0 : options.marketId;
            const products = (options === null || options === void 0 ? void 0 : options.withProductData) ? '1' : '0';
            const headers = {};
            if (marketId)
                headers["x-marketid"] = marketId;
            if (currencyId)
                headers["x-currency"] = currencyId;
            if (this._config.debug) {
                console.groupCollapsed("Fetching wishlist information");
                console.info("Wishlist ID", wishlistId);
            }
            const response = wishlistId === 'mine' ?
                yield this.doFoundationApiRequest("api/foundation/v1/wishlist/mine" /* FoundationApiEndPoints.MyWishlist */, { urlParams: { products }, headers }) :
                yield this.doFoundationApiRequest("api/foundation/v1/wishlist/mine/{ $wishlistId }" /* FoundationApiEndPoints.Wishlist */, { urlParams: { wishlistId, products }, headers });
            if (this._config.debug) {
                console.info("Wishlist data", response);
                console.groupEnd();
            }
            return response;
        });
    }
    doFoundationApiRequest(service, options) {
        var _a;
        // Create URL
        if (this._config.debug)
            console.debug("Request configuration", options);
        const opts = this.resolveRequestOptions(options);
        if (this._config.debug)
            console.debug("Processed request configuration", opts);
        const url = cms_1.ContentDelivery.Utils.buildUrl(this._baseUrl, service, (_a = opts.urlParams) !== null && _a !== void 0 ? _a : {});
        if (this._config.debug)
            console.log("Request URL", url.href);
        return this.getResponse(url, opts);
    }
}
exports.FoundationAPI = FoundationAPI;
exports.default = FoundationAPI;
//# sourceMappingURL=foundationapi.js.map