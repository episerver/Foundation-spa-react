import type { Models } from '@optimizely/cms';
export declare type IFoundationType = {};
declare type BaseFoundationOptions = {
    /**
     * The Currency to reply in
     */
    currency?: string;
    /**
     * The Market to reply from
     */
    marketId?: string;
};
export declare type BaseWishlistOptions = BaseFoundationOptions & {
    /**
     * The identifier of the wishlist (guid), to be retrieved. If the value
     * is omitted or 'mine', the "default" wishlist is returned.
     */
    wishlistId?: string;
    /**
     * Set to true to force inclusion of full product data
     */
    withProductData?: boolean;
};
export declare type GetProductInfoOptions = BaseFoundationOptions & {};
export declare type GetWishlistOptions = BaseWishlistOptions & {};
export declare type AddToWishlistOptions = BaseWishlistOptions & {
    productId?: Models.ContentReference;
    variantId: Models.ContentReference;
};
export declare type RemoveFromWishlistOptions = BaseWishlistOptions & {
    lineItemId: string;
};
export {};
