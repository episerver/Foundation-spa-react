"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
const react_1 = require("react");
function noop() { return null; }
exports.Context = (0, react_1.createContext)({
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
});
exports.default = exports.Context;
//# sourceMappingURL=context.js.map