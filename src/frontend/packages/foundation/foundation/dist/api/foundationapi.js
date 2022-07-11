import { ContentDelivery, Utils } from "@optimizely/cms";
import { Api } from "@optimizely/commerce";
export class FoundationAPI extends Api.CommerceApi {
    async removeFromWishlist(options) {
        const wishlistId = options?.wishlistId ?? 'mine';
        const currencyId = options?.currency;
        const marketId = options?.marketId;
        const products = options?.withProductData ? '1' : '0';
        const lineId = options?.lineItemId;
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
            await this.doFoundationApiRequest("api/foundation/v1/wishlist/mine/remove" /* FoundationApiEndPoints.RemoveFromMyWishlist */, { urlParams: { products }, headers, body, method }) :
            await this.doFoundationApiRequest("api/foundation/v1/wishlist/mine/{ $wishlistId }/remove" /* FoundationApiEndPoints.RemoveFromWishlist */, { urlParams: { wishlistId, products }, headers, body, method });
        if (this._config.debug) {
            console.info("Wishlist data", response);
            console.groupEnd();
        }
        return response;
    }
    async addToWishlist(options) {
        const wishlistId = options?.wishlistId ?? 'mine';
        const currencyId = options?.currency;
        const marketId = options?.marketId;
        const products = options?.withProductData ? '1' : '0';
        const productId = options?.productId ? Utils.ContentReference.createApiId(options.productId, true, false) : undefined;
        const variantId = Utils.ContentReference.createApiId(options.variantId, true, false);
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
            await this.doFoundationApiRequest("api/foundation/v1/wishlist/mine/add" /* FoundationApiEndPoints.AddToMyWishlist */, { urlParams: { products }, headers, body, method }) :
            await this.doFoundationApiRequest("api/foundation/v1/wishlist/mine/{ $wishlistId }/add" /* FoundationApiEndPoints.AddToWishlist */, { urlParams: { wishlistId, products }, headers, body, method });
        if (this._config.debug) {
            console.info("Wishlist data", response);
            console.groupEnd();
        }
        return response;
    }
    async getCurrentCustomer() {
        if (this._config.debug)
            console.groupCollapsed("Fetching current customer");
        const response = await this.doFoundationApiRequest("api/foundation/v1/profile" /* FoundationApiEndPoints.CurrentCustomer */);
        if (this._config.debug)
            console.info("Tranforming API Response");
        const customer = {
            ...response,
            BirthDate: new Date(response.BirthDate)
        };
        if (this._config.debug) {
            console.debug("Tranformed object", customer);
            console.groupEnd();
        }
        return customer;
    }
    async getProductInfo(contentId, options) {
        const currencyId = options?.currency;
        const marketId = options?.marketId;
        const headers = {};
        if (marketId)
            headers["x-marketid"] = marketId;
        if (currencyId)
            headers["x-currency"] = currencyId;
        const contentApiId = Utils.ContentReference.createApiId(contentId, true);
        if (this._config.debug) {
            console.groupCollapsed("Fetching product information");
            console.info("Product ID", contentApiId, contentId);
        }
        const response = await this.doFoundationApiRequest("api/foundation/v1/catalog/product/{ $contentId }" /* FoundationApiEndPoints.ProductInfo */, { urlParams: { contentId: contentApiId }, headers });
        if (this._config.debug)
            console.groupEnd();
        return response;
    }
    async getWishlist(options) {
        const wishlistId = options?.wishlistId ?? 'mine';
        const currencyId = options?.currency;
        const marketId = options?.marketId;
        const products = options?.withProductData ? '1' : '0';
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
            await this.doFoundationApiRequest("api/foundation/v1/wishlist/mine" /* FoundationApiEndPoints.MyWishlist */, { urlParams: { products }, headers }) :
            await this.doFoundationApiRequest("api/foundation/v1/wishlist/mine/{ $wishlistId }" /* FoundationApiEndPoints.Wishlist */, { urlParams: { wishlistId, products }, headers });
        if (this._config.debug) {
            console.info("Wishlist data", response);
            console.groupEnd();
        }
        return response;
    }
    doFoundationApiRequest(service, options) {
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
export default FoundationAPI;
//# sourceMappingURL=foundationapi.js.map