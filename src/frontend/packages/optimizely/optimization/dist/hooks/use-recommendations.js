import { useProductRecs } from '..';
import { useState, useEffect } from 'react';
export function useRecommendations(builder, transformer) {
    const recs = useProductRecs();
    const [data, setData] = useState({});
    const trackData = builder();
    useEffect(() => {
        if (!trackData)
            return;
        if (!recs)
            return;
        let cancelled = false;
        recs.actions.trackAndRecommend(trackData)?.then(x => {
            const newData = {};
            x.forEach(y => newData[y.position] = (transformer ? y.recs.map(rec => transformer(rec)) : y.recs));
            setData(newData);
        }).catch((e) => {
            console.error("Error fetching recommendations", e);
        });
        return () => {
            cancelled = true;
        };
    }, [trackData, recs, transformer]);
    return data;
}
export default useRecommendations;
//# sourceMappingURL=use-recommendations.js.map