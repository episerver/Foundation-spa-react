"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommerceApi = void 0;
const tslib_1 = require("tslib");
const cms_1 = require("@optimizely/cms");
class CommerceApi extends cms_1.ContentDelivery.ContentDeliveryAPI {
    prepareCheckout(cartId) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (this._config.debug) {
                console.groupCollapsed("Retrieve cart with Checkout information");
                console.info("Cart ID: ", cartId);
            }
            const response = yield this.doApiRequest("api/episerver/v{ $version }/carts/{ $cartId }/preparecheckout" /* PrepareCheckout */, {
                urlParams: { cartId },
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (this._config.debug)
                console.groupEnd();
            return response !== null && response !== void 0 ? response : null;
        });
    }
    getPricing(product, marketId, currencyCode) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (this._config.debug)
                console.groupCollapsed("Retrieve prices");
            var productIds = Array.isArray(product) ?
                product.map(x => cms_1.Utils.ContentReference.createApiId(x, true)) :
                [product];
            if (this._config.debug)
                console.log("Product IDs:", productIds);
            const response = yield this.doApiRequest("api/episerver/v{ $version }/pricing" /* Prices */, {
                urlParams: {
                    'contentIds[]': productIds.join(','),
                    marketId,
                    currencyCode
                }
            });
            if (this._config.debug)
                console.groupEnd();
            return (Array.isArray(product) ? response : response[0]);
        });
    }
    getCart(cartId) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (this._config.debug) {
                console.groupCollapsed("Retrieve cart");
                console.info("Cart ID: ", cartId);
            }
            const response = yield this.doApiRequest("api/episerver/v{ $version }/carts/{ $cartId }" /* Cart */, { urlParams: { cartId } });
            if (this._config.debug)
                console.groupEnd();
            return response !== null && response !== void 0 ? response : null;
        });
    }
    storeCart(cart) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (this._config.debug) {
                console.groupCollapsed("Store cart");
                console.info("Cart: ", cart);
            }
            // Prepare request
            const urlParams = {};
            if (cart.id)
                urlParams['cartId'] = cart.id;
            const method = cart.id ? 'PUT' : 'POST';
            // Send request
            const response = yield this.doApiRequest("api/episerver/v{ $version }/carts/{ $cartId }" /* Cart */, {
                urlParams,
                method,
                body: JSON.stringify(cart),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            // Return response
            if (this._config.debug)
                console.groupEnd();
            return response !== null && response !== void 0 ? response : null;
        });
    }
    doApiRequest(service, options) {
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
exports.CommerceApi = CommerceApi;
//# sourceMappingURL=commerceapi.js.map