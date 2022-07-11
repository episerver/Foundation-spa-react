/// <reference types="react" />
import { BasketModel } from '..';
import type { PeeriusHeadless, TrackBuilder, ProductBuilder, Recommendations, BasketBuilder } from '../peeriusheadless';
import type { ZaiusBrowserSdk } from '@zaiusinc/web-sdk';
export declare type ContextType = {
    readonly lib?: PeeriusHeadless;
    readonly lang: string;
    readonly debug: boolean;
    readonly odp?: ZaiusBrowserSdk;
    actions: Readonly<{
        setLang(lang: string): void;
        setDebug(debug: boolean): void;
        track(builder: TrackBuilder): Promise<void> | null;
        trackAndRecommend(builder: TrackBuilder): Promise<Recommendations> | null;
        recommend(pageType: "category" | "product" | "attribute" | "brand", pageTypeId: string, widgetId: string | null): Promise<Recommendations> | null;
        recommend(pageType: "home" | "basket" | "checkout" | "order" | "wishlist" | "other" | "searchresults", pageTypeId: null, widgetId: string | null): Promise<Recommendations> | null;
    }>;
    build: {
        home: () => TrackBuilder | null;
        other: () => TrackBuilder | null;
        product: (sku: string) => ProductBuilder | null;
        basket: (basket: BasketModel) => BasketBuilder | null;
    };
    readonly isReady: boolean;
};
export declare const Context: import("react").Context<ContextType>;
export default Context;
