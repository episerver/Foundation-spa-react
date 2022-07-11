import type  { Models } from '@optimizely/cms'
export type IFoundationType = {}

type BaseFoundationOptions = {
    /**
     * The Currency to reply in
     */
    currency ?: string, 

    /**
     * The Market to reply from
     */
    marketId ?: string
}

export type BaseWishlistOptions = BaseFoundationOptions & {
    /**
     * The identifier of the wishlist (guid), to be retrieved. If the value
     * is omitted or 'mine', the "default" wishlist is returned.
     */
    wishlistId ?: string, 

    /**
     * Set to true to force inclusion of full product data
     */
    withProductData ?: boolean
}

export type GetProductInfoOptions = BaseFoundationOptions & {}

export type GetWishlistOptions = BaseWishlistOptions & {}

export type AddToWishlistOptions = BaseWishlistOptions & {
    productId ?: Models.ContentReference
    variantId  : Models.ContentReference
}

export type RemoveFromWishlistOptions = BaseWishlistOptions & {
    lineItemId : string
}