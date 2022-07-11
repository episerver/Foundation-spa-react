export declare const enum PriceType {
    AllCustomers = "AllCustomers"
}
export declare type DateTimeString = string;
export declare type PriceInfo = {
    entryCode: string;
    prices: PricePoint[];
    discountedPrices: PricePoint[];
};
export declare type PricePoint = {
    price: number;
    priceType: PriceType;
    priceCode: string;
    validFrom: DateTimeString;
    validUntil: DateTimeString;
    minQuantity: number;
};
