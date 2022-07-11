import { createContext } from 'react'
import { BasketModel } from '..';
import type { PeeriusHeadless, TrackBuilder, ProductBuilder, Recommendations, BasketBuilder } from '../peeriusheadless'
import type { ZaiusBrowserSdk } from '@zaiusinc/web-sdk'

function noop() { return null; }

export type ContextType = {
    readonly lib?: PeeriusHeadless
    readonly lang: string
    readonly debug : boolean
    readonly odp?: ZaiusBrowserSdk
    actions: Readonly<{
        setLang (lang: string) : void
        setDebug (debug: boolean) : void

        track (builder: TrackBuilder) : Promise<void> | null
        trackAndRecommend (builder: TrackBuilder) : Promise<Recommendations> | null
    
        recommend (pageType: "category" | "product" | "attribute" | "brand", pageTypeId: string, widgetId: string | null) : Promise<Recommendations> | null
        recommend (pageType: "home" | "basket" | "checkout" | "order" | "wishlist" | "other" | "searchresults", pageTypeId: null, widgetId: string | null) : Promise<Recommendations> | null
    }>
    build: {
        home: () => TrackBuilder | null
        other: () => TrackBuilder | null
        product: (sku: string) => ProductBuilder | null
        basket: (basket: BasketModel) => BasketBuilder | null
    },
    readonly isReady: boolean
}

type TrackingIdTypes = {
    product: string
    category: string
    home: null
}

type RecommendMethod<K extends keyof TrackingIdTypes = keyof TrackingIdTypes> = (pageType: K, id: TrackingIdTypes[K], widgetId ?: string) => Promise<{}> | null

export const Context = createContext<ContextType>({
    actions: {
        setLang: noop,
        setDebug: noop,
        track: noop,
        trackAndRecommend: noop,
        recommend: noop
    },
    build: {
        home: noop,
        product: noop,
        other: noop,
        basket: noop
    },
    lang: "",
    debug: false,
    isReady: false
})

export default Context