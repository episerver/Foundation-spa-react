import { createContext } from 'react';
function noop() { return null; }
export const Context = createContext({
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
export default Context;
//# sourceMappingURL=context.js.map