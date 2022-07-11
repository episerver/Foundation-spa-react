export const enum FoundationApiEndPoints {
    // Catalog
    ProductInfo     = 'api/foundation/v1/catalog/product/{ $contentId }',

    // Profile
    CurrentCustomer = 'api/foundation/v1/profile',

    // Wishlist
    MyWishlists          = 'api/foundation/v1/wishlist/mine/list',
    MyWishlist           = 'api/foundation/v1/wishlist/mine',
    AddToMyWishlist      = 'api/foundation/v1/wishlist/mine/add',
    RemoveFromMyWishlist = 'api/foundation/v1/wishlist/mine/remove',
    Wishlist             = 'api/foundation/v1/wishlist/mine/{ $wishlistId }',
    AddToWishlist        = 'api/foundation/v1/wishlist/mine/{ $wishlistId }/add',
    RemoveFromWishlist   = 'api/foundation/v1/wishlist/mine/{ $wishlistId }/remove',
}