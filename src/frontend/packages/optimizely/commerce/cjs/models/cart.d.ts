/**
 * A UUID type string, should follow the pattern:
 * "00000000-0000-0000-0000-000000000000"
 */
export declare type UUID = string;
/**
 * A string that is parsable by the date-object
 */
export declare type DateString = string;
export declare type ShippingAddress = {
    firstName?: string;
    lastName?: string;
    line1?: string;
    line2?: string;
    city?: string;
    countryName?: string;
    postalCode?: string;
    regionName?: string;
    email?: string;
    phoneNumber?: string;
};
export declare type LineItemModel = ({
    contentId: UUID;
    code?: string;
} | {
    contentId?: UUID;
    code: string;
}) & {
    id?: UUID;
    placedPrice?: number;
    quantity: number;
    displayName?: string;
    isGift?: true;
};
export declare type ShipmentModel = {
    id?: UUID;
    shippingAddress?: ShippingAddress;
    shippingMethodId?: UUID;
    lineItems: LineItemModel[];
};
export declare type Cart = {
    id?: UUID;
    name: string;
    customerId: UUID;
    market: string;
    currency: string;
    lastUpdated?: DateString;
    shipments?: ShipmentModel[];
    couponCodes?: string[];
};
export declare type CartTotals = {
    total: number;
    subTotal: number;
    shippingTotal: number;
    handlingTotal: number;
    taxTotal: number;
    discountTotal: number;
    shippingTotals: CartShippingTotals[];
};
export declare type CartShippingTotals = {
    shipmentId: string;
    shippingCost: number;
    shippingTax: number;
    itemsTotal: number;
    lineItemPrices: CartLineItemTotals[];
};
export declare type CartLineItemTotals = {
    lineItemId: string;
    extendedPrice: number;
    discountedPrice: number;
};
export declare type CartAvailableShippingMethod = {
    shipmentId: string;
    id: string;
    displayName: string;
    price: number;
};
export declare type CartWithTotals = {
    cart: Cart;
    totals: CartTotals;
    availableShippingMethods: CartAvailableShippingMethod[];
    validationIssues: any[];
};
export default Cart;
