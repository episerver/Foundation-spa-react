import type { TrackBuilder, RecsItem } from '../peeriusheadless'
import { useProductRecs } from '..'
import { useState, useEffect } from 'react'

export type RecommendationTransformer<TOut = any> = (item: RecsItem) => TOut
export type TrackBuilderFactory = () => TrackBuilder

export function useRecommendations<TOut = any, T extends RecommendationTransformer<TOut> = RecommendationTransformer<TOut>>(builder: TrackBuilderFactory, transformer: T) : { [position: string ]: T extends undefined ? RecsItem[] : (T extends RecommendationTransformer<infer R> ? R[] : undefined)}
{
    const recs = useProductRecs()
    const [ data, setData ] = useState<{ [position: string ]: T extends undefined ? RecsItem[] : (T extends RecommendationTransformer<infer R> ? R[] : undefined)}>({})
    const trackData = builder()

    useEffect(() => {
        if (!trackData) return
        if (!recs) return
        let cancelled = false

        recs.actions.trackAndRecommend(trackData)?.then(x => {
            const newData : typeof data = {}
            x.forEach(y => 
                newData[y.position] = (transformer ? y.recs.map(rec => transformer(rec)) : y.recs) as T extends undefined ? RecsItem[] : (T extends RecommendationTransformer<infer R> ? R[] : undefined)
            )
            setData(newData)
        }).catch((e: any) => {
            console.error("Error fetching recommendations", e)
        })

        return () => {
            cancelled = true
        }
    }, [ trackData, recs, transformer ])

    return data
}

export default useRecommendations