/**
 * A UUID type string, should follow the pattern:
 * "00000000-0000-0000-0000-000000000000"
 */
 export type UUID = string

/**
 * A string that is parsable by the date-object
 */
 export type DateString = string

 export type ShippingAddress = {
     firstName ?: string,
     lastName ?: string,
     line1 ?: string,
     line2 ?: string,
     city ?: string,
     countryName ?: string,
     postalCode ?: string,
     regionName ?: string,
     email ?: string,
     phoneNumber? : string
 }
 
 export type LineItemModel = (
     {
         contentId: UUID,
         code?: string,
     } | 
     {
         contentId?: UUID,
         code: string,
     }
 ) & {
     id ?: UUID,
     placedPrice ?: number,
     quantity: number,
     displayName ?: string,
     isGift ?: true
 }
 
 export type ShipmentModel = {
     id?: UUID
     shippingAddress?: ShippingAddress,
     shippingMethodId?: UUID,
     lineItems: LineItemModel[]
 }
 
 export type Cart = {
     id ?: UUID
     name: string
     customerId : UUID
     market: string
     currency: string
     lastUpdated ?: DateString
     shipments?: ShipmentModel[]
     couponCodes?: string[]
 }
 
 export type CartTotals = {
     total: number
     subTotal: number
     shippingTotal: number
     handlingTotal: number
     taxTotal: number
     discountTotal: number
     shippingTotals: CartShippingTotals[]
 }
 
 export type CartShippingTotals = {
     shipmentId: string
     shippingCost: number
     shippingTax: number
     itemsTotal: number
     lineItemPrices: CartLineItemTotals[]
 }
 
 export type CartLineItemTotals = {
     lineItemId: string
     extendedPrice: number
     discountedPrice: number
 }
 
 export type CartAvailableShippingMethod = {
     shipmentId: string,
     id: string,
     displayName: string,
     price: number
 }
 
 export type CartWithTotals = {
     cart: Cart
     totals: CartTotals
     availableShippingMethods: CartAvailableShippingMethod[]
     validationIssues: any[]
 }

export default Cart