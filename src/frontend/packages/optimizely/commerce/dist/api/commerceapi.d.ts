import { ContentDelivery, Models } from '@optimizely/cms';
import { ICommerceApi, IContentList } from "./icommerceapi";
import type { PriceInfo, Cart, CartWithTotals } from "../models";
export declare class CommerceApi extends ContentDelivery.ContentDeliveryAPI implements ICommerceApi {
    prepareCheckout(cartId: string): Promise<CartWithTotals | null>;
    getPricing<I extends IContentList = IContentList>(product: I, marketId: string, currencyCode: string): Promise<I extends Models.ContentReference[] ? PriceInfo[] : PriceInfo>;
    getCart(cartId: string): Promise<Cart | null>;
    storeCart(cart: Cart): Promise<Cart | null>;
    private doApiRequest;
}
