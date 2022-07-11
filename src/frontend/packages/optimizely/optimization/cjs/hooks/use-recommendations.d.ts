import type { TrackBuilder, RecsItem } from '../peeriusheadless';
export declare type RecommendationTransformer<TOut = any> = (item: RecsItem) => TOut;
export declare type TrackBuilderFactory = () => TrackBuilder;
export declare function useRecommendations<TOut = any, T extends RecommendationTransformer<TOut> = RecommendationTransformer<TOut>>(builder: TrackBuilderFactory, transformer: T): {
    [position: string]: T extends undefined ? RecsItem[] : (T extends RecommendationTransformer<infer R> ? R[] : undefined);
};
export default useRecommendations;
