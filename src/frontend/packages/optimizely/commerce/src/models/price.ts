
export const enum PriceType {
    AllCustomers = "AllCustomers"
}

export type DateTimeString = string

export type PriceInfo = {
    entryCode: string,
    prices: PricePoint[],
    discountedPrices: PricePoint[]
}

export type PricePoint = {
    price: number
    priceType: PriceType
    priceCode: string
    validFrom: DateTimeString
    validUntil: DateTimeString
    minQuantity: number
}