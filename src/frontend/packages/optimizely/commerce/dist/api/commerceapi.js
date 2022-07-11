import { ContentDelivery, Utils as ApiUtils } from '@optimizely/cms';
export class CommerceApi extends ContentDelivery.ContentDeliveryAPI {
    async prepareCheckout(cartId) {
        if (this._config.debug) {
            console.groupCollapsed("Retrieve cart with Checkout information");
            console.info("Cart ID: ", cartId);
        }
        const response = await this.doApiRequest("api/episerver/v{ $version }/carts/{ $cartId }/preparecheckout" /* PrepareCheckout */, {
            urlParams: { cartId },
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (this._config.debug)
            console.groupEnd();
        return response ?? null;
    }
    async getPricing(product, marketId, currencyCode) {
        if (this._config.debug)
            console.groupCollapsed("Retrieve prices");
        var productIds = Array.isArray(product) ?
            product.map(x => ApiUtils.ContentReference.createApiId(x, true)) :
            [product];
        if (this._config.debug)
            console.log("Product IDs:", productIds);
        const response = await this.doApiRequest("api/episerver/v{ $version }/pricing" /* Prices */, {
            urlParams: {
                'contentIds[]': productIds.join(','),
                marketId,
                currencyCode
            }
        });
        if (this._config.debug)
            console.groupEnd();
        return (Array.isArray(product) ? response : response[0]);
    }
    async getCart(cartId) {
        if (this._config.debug) {
            console.groupCollapsed("Retrieve cart");
            console.info("Cart ID: ", cartId);
        }
        const response = await this.doApiRequest("api/episerver/v{ $version }/carts/{ $cartId }" /* Cart */, { urlParams: { cartId } });
        if (this._config.debug)
            console.groupEnd();
        return response ?? null;
    }
    async storeCart(cart) {
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
        const response = await this.doApiRequest("api/episerver/v{ $version }/carts/{ $cartId }" /* Cart */, {
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
        return response ?? null;
    }
    doApiRequest(service, options) {
        // Create URL
        if (this._config.debug)
            console.debug("Request configuration", options);
        const opts = this.resolveRequestOptions(options);
        if (this._config.debug)
            console.debug("Processed request configuration", opts);
        const url = ContentDelivery.Utils.buildUrl(this._baseUrl, service, opts.urlParams ?? {});
        if (this._config.debug)
            console.log("Request URL", url.href);
        return this.getResponse(url, opts);
    }
}
//# sourceMappingURL=commerceapi.js.map