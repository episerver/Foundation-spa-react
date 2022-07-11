import * as ProductInfo from './productinfo';
export declare type Wishlist = {
    readonly id?: string;
    name: string;
    marketId: string;
    currency: string;
    items: WishlistItem[];
};
export declare type WishlistItem = {
    readonly lineId?: string;
    productId: string;
    variantId: string;
    quantity: number;
    placedPrice: number;
    product: ProductInfo.Product | null;
};
