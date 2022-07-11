"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRecommendations = void 0;
const __1 = require("..");
const react_1 = require("react");
function useRecommendations(builder, transformer) {
    const recs = (0, __1.useProductRecs)();
    const [data, setData] = (0, react_1.useState)({});
    const trackData = builder();
    (0, react_1.useEffect)(() => {
        var _a;
        if (!trackData)
            return;
        if (!recs)
            return;
        let cancelled = false;
        (_a = recs.actions.trackAndRecommend(trackData)) === null || _a === void 0 ? void 0 : _a.then(x => {
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
exports.useRecommendations = useRecommendations;
exports.default = useRecommendations;
//# sourceMappingURL=use-recommendations.js.map