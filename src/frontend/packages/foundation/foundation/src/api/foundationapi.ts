import { ContentDelivery, Utils, Models } from "@optimizely/cms"
import { Api } from "@optimizely/commerce"
import type IFoundationAPI from "./ifoundationapi"
import { FoundationApiEndPoints } from "./consts"
import { Product, Customer, CustomerBase, Wishlist } from "../models"
import type { GetWishlistOptions, GetProductInfoOptions, AddToWishlistOptions, RemoveFromWishlistOptions } from './types'

export type APICustomer = Omit<CustomerBase, 'BirthDate'> & {
    BirthDate: string
    [ propertyName: string ]: any
}

export class FoundationAPI extends Api.CommerceApi implements IFoundationAPI
{
    public async removeFromWishlist(options: RemoveFromWishlistOptions): Promise<Wishlist> {
        const wishlistId = options?.wishlistId ?? 'mine'
        const currencyId = options?.currency
        const marketId   = options?.marketId
        const products   = options?.withProductData ? '1' : '0'
        const lineId     = options?.lineItemId

        // Output debug
        if (this._config.debug) {
            console.groupCollapsed("Adding to wishlist")
            console.info("Wishlist ID", wishlistId)
            console.info("Line ID:", lineId)
        }

        // Build headers
        const headers : Record<string, string> = {
            "Content-Type": "application/x-www-form-urlencoded"
        }
        if (marketId)   headers["x-marketid"] = marketId
        if (currencyId) headers["x-currency"] = currencyId

        // Build body
        const bodyData = new URLSearchParams();
        bodyData.set("lineItemId", lineId)
        bodyData.set("quantity", "1")
        const body = bodyData.toString()

        // Method
        const method = "post";

        // Execute request
        const response : Wishlist = wishlistId === 'mine' ?
                await this.doFoundationApiRequest<Wishlist>(FoundationApiEndPoints.RemoveFromMyWishlist, { urlParams: { products }, headers, body, method }) :
                await this.doFoundationApiRequest<Wishlist>(FoundationApiEndPoints.RemoveFromWishlist, { urlParams: { wishlistId, products }, headers, body, method })

        if (this._config.debug) {
            console.info("Wishlist data", response)
            console.groupEnd()
        }

        return response
    }

    public async addToWishlist(options: AddToWishlistOptions): Promise<Wishlist> {
        const wishlistId = options?.wishlistId ?? 'mine'
        const currencyId = options?.currency
        const marketId   = options?.marketId
        const products   = options?.withProductData ? '1' : '0'
        const productId  = options?.productId ? Utils.ContentReference.createApiId(options.productId, true, false) : undefined
        const variantId  = Utils.ContentReference.createApiId(options.variantId, true, false)

        // Output debug
        if (this._config.debug) {
            console.groupCollapsed("Adding to wishlist")
            console.info("Wishlist ID", wishlistId)
            console.info("Product ID:", productId)
            console.info("Variant ID:", variantId)
        }

        // Build headers
        const headers : Record<string, string> = {
            "Content-Type": "application/x-www-form-urlencoded"
        }
        if (marketId)   headers["x-marketid"] = marketId
        if (currencyId) headers["x-currency"] = currencyId

        // Build body
        const bodyData = new URLSearchParams();
        if (productId) bodyData.set("productId", productId)
        bodyData.set("variantId", variantId)
        bodyData.set("quantity", "1")
        const body = bodyData.toString()

        // Method
        const method = "post";

        // Execute request
        const response : Wishlist = wishlistId === 'mine' ?
                await this.doFoundationApiRequest<Wishlist>(FoundationApiEndPoints.AddToMyWishlist, { urlParams: { products }, headers, body, method }) :
                await this.doFoundationApiRequest<Wishlist>(FoundationApiEndPoints.AddToWishlist, { urlParams: { wishlistId, products }, headers, body, method })

        if (this._config.debug) {
            console.info("Wishlist data", response)
            console.groupEnd()
        }

        return response
    }

    public async getCurrentCustomer<CustomerModel extends Customer = Customer>() : Promise<CustomerModel>
    {
        if (this._config.debug) console.groupCollapsed("Fetching current customer")
        const response = await this.doFoundationApiRequest<APICustomer>(FoundationApiEndPoints.CurrentCustomer)

        if (this._config.debug) console.info("Tranforming API Response")
        const customer : CustomerModel = { 
            ...response,
            BirthDate: new Date(response.BirthDate)
        } as CustomerModel
        if (this._config.debug) {
            console.debug("Tranformed object", customer)
            console.groupEnd()
        }
        return customer
    }

    public async getProductInfo<ProductModel extends Product = Product>(contentId: Models.ContentReference, options: GetProductInfoOptions): Promise<ProductModel[]> {
        const currencyId = options?.currency
        const marketId   = options?.marketId

        const headers : Record<string, string> = {}
        if (marketId)   headers["x-marketid"] = marketId
        if (currencyId) headers["x-currency"] = currencyId

        const contentApiId = Utils.ContentReference.createApiId(contentId, true)
        if (this._config.debug) {
            console.groupCollapsed("Fetching product information")
            console.info("Product ID", contentApiId, contentId)
        }
        const response = await this.doFoundationApiRequest<ProductModel[]>(FoundationApiEndPoints.ProductInfo, { urlParams: { contentId: contentApiId }, headers })
        if (this._config.debug) console.groupEnd()
        return response
    }

    public async getWishlist(options?: GetWishlistOptions): Promise<Wishlist> {
        const wishlistId = options?.wishlistId ?? 'mine'
        const currencyId = options?.currency
        const marketId   = options?.marketId
        const products   = options?.withProductData ? '1' : '0'

        const headers : Record<string, string> = {}
        if (marketId)   headers["x-marketid"] = marketId
        if (currencyId) headers["x-currency"] = currencyId

        if (this._config.debug) {
            console.groupCollapsed("Fetching wishlist information")
            console.info("Wishlist ID", wishlistId)
        }

        const response : Wishlist = wishlistId === 'mine' ?
                await this.doFoundationApiRequest<Wishlist>(FoundationApiEndPoints.MyWishlist, { urlParams: { products }, headers }) :
                await this.doFoundationApiRequest<Wishlist>(FoundationApiEndPoints.Wishlist, { urlParams: { wishlistId, products }, headers })

        if (this._config.debug) {
            console.info("Wishlist data", response)
            console.groupEnd()
        }

        return response
    }

    private doFoundationApiRequest<T>(service: FoundationApiEndPoints, options?: ContentDelivery.RequestConfig<ContentDelivery.IContentIfOther<ContentDelivery.BaseType<T>>>) : Promise<T>
    {
        // Create URL
        if (this._config.debug) console.debug("Request configuration", options)
        const opts = this.resolveRequestOptions(options)
        if (this._config.debug) console.debug("Processed request configuration", opts)
        const url = ContentDelivery.Utils.buildUrl(this._baseUrl, service, opts.urlParams ?? {})
        if (this._config.debug) console.log("Request URL", url.href)

        return this.getResponse(url, opts)
    }
}

export default FoundationAPI