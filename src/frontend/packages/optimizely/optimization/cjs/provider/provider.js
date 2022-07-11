"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextProvider = void 0;
const react_1 = require("react");
const context_1 = require("./context");
const web_sdk_1 = require("@zaiusinc/web-sdk");
const ContextProvider = (props) => {
    var _a, _b, _c;
    const [lib, setLib] = (0, react_1.useState)();
    const [lang, setLang] = (0, react_1.useState)((_a = props.defaultLocale) !== null && _a !== void 0 ? _a : "en");
    const [debug, setDebug] = (0, react_1.useState)(props.enableDebug === true);
    const trackerUrl = `https://${props.trackerDomain}/tracker/headless.page`;
    const trackerName = (_b = props.trackerName) !== null && _b !== void 0 ? _b : 'PeeriusHeadless';
    const odpId = (_c = props.odpId) !== null && _c !== void 0 ? _c : '';
    const odpJsUrl = props.odpJsUrl;
    // Initialize Optimizely Data Platform
    (0, react_1.useEffect)(() => {
        web_sdk_1.Zaius.initialize({
            trackerId: odpId !== null && odpId !== void 0 ? odpId : '',
            jsUrl: odpJsUrl
        });
    }, [odpId, odpJsUrl]);
    // Initialize Optimizely Product Recs
    (0, react_1.useEffect)(() => {
        if (window[trackerName] &&
            window[trackerName].track) {
            if (debug)
                console.log("Injecting Optimizely scripts - Skipped as scripts have already loaded");
            setLib(window[trackerName]);
            return;
        }
        const script = document.createElement('script');
        script.src = trackerUrl;
        script.async = true;
        script.onload = () => setLib(window[trackerName]);
        if (debug)
            console.log("Injecting Optimizely scripts");
        document.body.appendChild(script);
        return () => {
            if (debug)
                console.log("Removing Optimizely scripts");
            document.body.removeChild(script);
        };
    }, [trackerUrl, trackerName, debug]);
    // Create context container
    const value = {
        lib,
        lang,
        debug,
        odp: web_sdk_1.Zaius,
        actions: {
            setLang,
            setDebug,
            track: (data) => {
                var _a, _b;
                const event = data.build();
                if (debug)
                    console.log("Track", event);
                web_sdk_1.Zaius.event("pageview", event);
                if (event.pageType == "product" && ((_a = event.product) === null || _a === void 0 ? void 0 : _a.refCode))
                    web_sdk_1.Zaius.event("product", Object.assign({ action: "detail", product_id: event.product.refCode }, event));
                return (_b = lib === null || lib === void 0 ? void 0 : lib.track(event)) !== null && _b !== void 0 ? _b : null;
            },
            //@ts-ignore The signatures of the recommend methods are actually identical, yet as a result of the overloads TypeScript starts complaining
            recommend: (pageTypeId, pageId, widgetId) => { var _a; return (_a = lib === null || lib === void 0 ? void 0 : lib.recommend(pageTypeId, pageId, widgetId)) !== null && _a !== void 0 ? _a : null; },
            trackAndRecommend: (data) => {
                var _a, _b;
                const event = data.build();
                if (debug)
                    console.log("Track & Recommend", event);
                web_sdk_1.Zaius.event("pageview", event);
                if (event.pageType == "product" && ((_a = event.product) === null || _a === void 0 ? void 0 : _a.refCode))
                    web_sdk_1.Zaius.event("product", Object.assign({ action: "detail", product_id: event.product.refCode }, event));
                return (_b = lib === null || lib === void 0 ? void 0 : lib.trackAndRecommend(event)) !== null && _b !== void 0 ? _b : null;
            }
        },
        build: {
            home: () => lib ? (new lib.HomeBuilder().lang(lang)) : null,
            other: () => lib ? (new lib.OtherBuilder().lang(lang)) : null,
            product: (sku) => lib ? (new lib.ProductBuilder().lang(lang).product(sku)) : null,
            basket: (basket) => lib ? (new lib.BasketBuilder().lang(lang).basket(basket)) : null
        },
        isReady: lib ? true : false
    };
    return react_1.default.createElement(context_1.default.Provider, { value: value }, props.children);
};
exports.ContextProvider = ContextProvider;
exports.ContextProvider.displayName = "Optimizely: Optimization Provider";
exports.ContextProvider.defaultProps = {
    trackerDomain: "partnerdemo.peerius.com",
    trackerName: "PeeriusHeadless",
    defaultLocale: "en",
    enableDebug: false,
    odpId: ""
};
exports.default = exports.ContextProvider;
//# sourceMappingURL=provider.js.map