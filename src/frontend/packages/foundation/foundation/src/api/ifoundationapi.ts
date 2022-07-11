import { Models } from '@optimizely/cms'
import { Api } from '@optimizely/commerce'
import { Product, Customer, Wishlist } from '../models'
import { GetWishlistOptions, GetProductInfoOptions, AddToWishlistOptions, RemoveFromWishlistOptions } from './types'

export interface IFoundationAPI extends Api.ICommerceApi
{
    /**
     * Get the product information, based upon the actual product 
     * structure.
     * 
     * @param contentId The content identifier of the product
     */
    getProductInfo<ProductModel extends Product = Product>(contentId : Models.ContentReference, options ?: GetProductInfoOptions) : Promise<ProductModel[]>

    /**
     * Retrieve the profile of the currently authenticated customer.
     * 
     * This relies on the authentication being properly shared between the
     * frontend and backend (i.e. Single Sign On), OAuth for CMS11/Commerce12 
     * and OIDC for CMS12/Commerce13
     */
    getCurrentCustomer<CustomerModel extends Customer = Customer>() : Promise<CustomerModel>

    /**
     * Retrieve a single wishlist by the options provided.
     * 
     * @param   options 
     */
    getWishlist(options ?: GetWishlistOptions) : Promise<Wishlist>

    addToWishlist(options: AddToWishlistOptions) : Promise<Wishlist>

    removeFromWishlist(options: RemoveFromWishlistOptions) : Promise<Wishlist>
}

export default IFoundationAPI