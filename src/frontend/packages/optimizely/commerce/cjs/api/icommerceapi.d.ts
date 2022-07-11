import type { ContentDelivery, Models } from '@optimizely/cms';
import type { PriceInfo, Cart, CartWithTotals } from '../models';
export declare const enum CommerceEndpoints {
    Prices = "api/episerver/v{ $version }/pricing",
    Cart = "api/episerver/v{ $version }/carts/{ $cartId }",
    PrepareCheckout = "api/episerver/v{ $version }/carts/{ $cartId }/preparecheckout"
}
export declare function isCommerceApi(api: ContentDelivery.IContentDeliveryAPI): api is ICommerceApi;
export declare type IContentList = Models.ContentReference | Models.ContentReference[];
/**
 * This is the generic definition of the Commerce API, which is an extension
 * to the ContentDelivery API
 */
export interface ICommerceApi extends ContentDelivery.IContentDeliveryAPI {
    /**
     * Retrieve the raw pricing information for a product, given the product, market & currency
     *
     * @param   product         The product(s) to fetch the pricing information for
     * @param   marketId        The current market to fetch the pricing within
     * @param   currencyCode    The currently requested currency
     */
    getPricing<I extends IContentList = IContentList>(product: I, marketId: string, currencyCode: string): Promise<I extends Models.ContentReference[] ? PriceInfo[] : PriceInfo>;
    /**
     * Retrieve the cart from the system
     *
     * @param cartId The identifier of the cart
     */
    getCart(cartId: string): Promise<Cart | null>;
    /**
     * Store a cart in the system, the create/update will
     * be determined based upon the presence of a cartId
     *
     * @param cart The cart to store
     */
    storeCart(cart: Cart): Promise<Cart | null>;
    /**
     * Perpare a cart for checkout, by fetching it, including
     * totals calculation and shipment options
     *
     * @param cartId The identifier of the cart
     */
    prepareCheckout(cartId: string): Promise<CartWithTotals | null>;
}
