import { ContentDelivery, Models, Utils as ApiUtils } from '@optimizely/cms'
import { ICommerceApi, CommerceEndpoints, IContentList } from "./icommerceapi"
import type { PriceInfo, Cart, CartWithTotals } from "../models"

export class CommerceApi extends ContentDelivery.ContentDeliveryAPI implements ICommerceApi
{
    public async prepareCheckout(cartId: string): Promise<CartWithTotals | null> {
        if (this._config.debug)  {
            console.groupCollapsed("Retrieve cart with Checkout information")
            console.info("Cart ID: ", cartId)
        }
        const response = await this.doApiRequest<CartWithTotals>(CommerceEndpoints.PrepareCheckout, { 
            urlParams: { cartId },
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (this._config.debug) console.groupEnd()
        return response ?? null
    }

    public async getPricing<I extends IContentList = IContentList>(product: I, marketId: string, currencyCode: string): Promise<I extends Models.ContentReference[] ? PriceInfo[] : PriceInfo> {
        if (this._config.debug) console.groupCollapsed("Retrieve prices")
        var productIds = Array.isArray(product) ?
            product.map(x => ApiUtils.ContentReference.createApiId(x, true)) :
            [ product ]

        if (this._config.debug) console.log("Product IDs:", productIds)

        const response = await this.doApiRequest<PriceInfo[]>(CommerceEndpoints.Prices, {
            urlParams: {
                'contentIds[]': productIds.join(','),
                marketId,
                currencyCode
            }
        })

        if (this._config.debug) console.groupEnd()
        return (Array.isArray(product) ? response : response[0]) as I extends Models.ContentReference[] ? PriceInfo[] : PriceInfo
    }

    public async getCart(cartId: string) : Promise<Cart | null>
    {
        if (this._config.debug)  {
            console.groupCollapsed("Retrieve cart")
            console.info("Cart ID: ", cartId)
        }
        const response = await this.doApiRequest<Cart>(CommerceEndpoints.Cart, { urlParams: { cartId } })
        if (this._config.debug) console.groupEnd()
        return response ?? null
    }

    public async storeCart(cart: Cart) : Promise<Cart | null>
    {
        if (this._config.debug)  {
            console.groupCollapsed("Store cart")
            console.info("Cart: ", cart)
        }

        // Prepare request
        const urlParams : Record<string, string> = {}
        if (cart.id) urlParams['cartId'] = cart.id
        const method : 'POST' | 'PUT' = cart.id ? 'PUT' : 'POST'
        
        // Send request
        const response = await this.doApiRequest<Cart>(CommerceEndpoints.Cart, {
            urlParams,
            method,
            body: JSON.stringify(cart),
            headers: {
                "Content-Type": "application/json"
            }
        })

        // Return response
        if (this._config.debug) console.groupEnd()
        return response ?? null
    }

    private doApiRequest<T>(service: CommerceEndpoints, options?: ContentDelivery.RequestConfig<ContentDelivery.IContentIfOther<ContentDelivery.BaseType<T>>>) : Promise<T>
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
