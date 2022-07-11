export declare const enum FoundationApiEndPoints {
    ProductInfo = "api/foundation/v1/catalog/product/{ $contentId }",
    CurrentCustomer = "api/foundation/v1/profile",
    MyWishlists = "api/foundation/v1/wishlist/mine/list",
    MyWishlist = "api/foundation/v1/wishlist/mine",
    AddToMyWishlist = "api/foundation/v1/wishlist/mine/add",
    RemoveFromMyWishlist = "api/foundation/v1/wishlist/mine/remove",
    Wishlist = "api/foundation/v1/wishlist/mine/{ $wishlistId }",
    AddToWishlist = "api/foundation/v1/wishlist/mine/{ $wishlistId }/add",
    RemoveFromWishlist = "api/foundation/v1/wishlist/mine/{ $wishlistId }/remove"
}
