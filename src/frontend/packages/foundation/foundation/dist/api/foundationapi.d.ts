import { Models } from "@optimizely/cms";
import { Api } from "@optimizely/commerce";
import type IFoundationAPI from "./ifoundationapi";
import { Product, Customer, CustomerBase, Wishlist } from "../models";
import type { GetWishlistOptions, GetProductInfoOptions, AddToWishlistOptions, RemoveFromWishlistOptions } from './types';
export declare type APICustomer = Omit<CustomerBase, 'BirthDate'> & {
    BirthDate: string;
    [propertyName: string]: any;
};
export declare class FoundationAPI extends Api.CommerceApi implements IFoundationAPI {
    removeFromWishlist(options: RemoveFromWishlistOptions): Promise<Wishlist>;
    addToWishlist(options: AddToWishlistOptions): Promise<Wishlist>;
    getCurrentCustomer<CustomerModel extends Customer = Customer>(): Promise<CustomerModel>;
    getProductInfo<ProductModel extends Product = Product>(contentId: Models.ContentReference, options: GetProductInfoOptions): Promise<ProductModel[]>;
    getWishlist(options?: GetWishlistOptions): Promise<Wishlist>;
    private doFoundationApiRequest;
}
export default FoundationAPI;
