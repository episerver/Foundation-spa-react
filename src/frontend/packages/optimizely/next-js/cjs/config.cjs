"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withOptimizelyConfig = void 0;
/**
 * Automatically incorportate the needed configuration to connect with Optimizely
 * Content Cloud within a Next.JS site
 *
 * @param config            The base configuration, which will be extended
 * @param websiteConfig     Contents of the generated website definition file, which will be used
 */
function withOptimizelyConfig(config, websiteConfig) {
    var _a, _b, _c, _d, _e;
    if (!(websiteConfig === null || websiteConfig === void 0 ? void 0 : websiteConfig.name))
        throw new Error("Providing the contents of a generated website definition file is mandatory");
    // Make any Optimizely environment variable available
    config.env = (_a = config.env) !== null && _a !== void 0 ? _a : {};
    for (const key in (_b = process === null || process === void 0 ? void 0 : process.env) !== null && _b !== void 0 ? _b : {})
        if (key.startsWith("OPTIMIZELY_"))
            config.env[key] = process.env[key];
    // Configure i18n based upon the network config
    if (websiteConfig && typeof (websiteConfig === null || websiteConfig === void 0 ? void 0 : websiteConfig.name) === "string") {
        config.i18n = (_c = config.i18n) !== null && _c !== void 0 ? _c : { defaultLocale: '', locales: [] };
        config.i18n.locales = websiteConfig.locales;
        config.i18n.defaultLocale = websiteConfig.defaultLocale;
    }
    // Configure images
    if (process.env["OPTIMIZELY_DXP_URL"]) {
        config.images = (_d = config.images) !== null && _d !== void 0 ? _d : {};
        config.images.domains = (_e = config.images.domains) !== null && _e !== void 0 ? _e : [];
        const imgDomain = new URL(process.env["OPTIMIZELY_DXP_URL"]);
        if (!config.images.domains.includes(imgDomain.host))
            config.images.domains.push(imgDomain.host);
    }
    return config;
}
exports.withOptimizelyConfig = withOptimizelyConfig;
//# sourceMappingURL=config.js.map