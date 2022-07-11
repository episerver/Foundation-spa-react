export interface PeeriusHeadless {
    HomeBuilder: TrackBuilderClass
    OtherBuilder: TrackBuilderClass
    ProductBuilder: TrackBuilderClass<ProductBuilder>
    BasketBuilder: TrackBuilderClass<BasketBuilder>

    track (builder: FinalizedTrackBuilder) : Promise<void>
    trackAndRecommend (builder: FinalizedTrackBuilder) : Promise<Recommendations>

    recommend (pageType: "category" | "product" | "attribute" | "brand", pageTypeId: string, widgetId: string | null) : Promise<Recommendations>
    recommend (pageType: "home" | "basket" | "checkout" | "order" | "wishlist" | "other" | "searchresults", pageTypeId: null, widgetId: string | null) : Promise<Recommendations>
}

export type Recommendations = RecsWidget[]

export type RecsWidget = {
    alias: string
    position: string
    widget: string   
    recs: RecsItem[] 
}

export type RecsItem = {
    id: number,
    img?: string,
    prices?: { [currency: string]: { unitPrice: number, salePrice: number } }
    refCode: string,
    title?: string
    url: string
}

export interface TrackBuilderClass<T extends TrackBuilder = TrackBuilder>
{
    new() : T
}

export interface FinalizedTrackBuilder {
    pageType: string
}

export interface TrackBuilder {
    /**
     * Automatically mark all recommendations as shown when they
     * are returned by the API. If set to false, you MUST implement
     * this marking yourself.
     */
    markRecsAsShown: (markRecsAsShown: boolean) => this

    /**
     * Incorporate the product description text with the recommendations
     */
    showRecsDescription: (showRecsDescription: boolean) => this

    /**
     * Set the language for the recommendations
     */
    lang: (lang: string) => this
    build: () => Readonly<FinalizedTrackBuilder>
}

export interface ProductBuilder extends TrackBuilder {
    product: (sku: string) => this
}

export interface BasketBuilder extends TrackBuilder {
    basket: (basket: BasketModel) => this
}

export interface BasketModel {
    items: BasketItemModel[]
    currency: string
    basketId: string
}

export interface BasketItemModel {
    refCode: string
    qty: number
    price: number
}

export default PeeriusHeadless;