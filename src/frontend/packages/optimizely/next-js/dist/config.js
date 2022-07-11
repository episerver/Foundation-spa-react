/**
 * Automatically incorportate the needed configuration to connect with Optimizely
 * Content Cloud within a Next.JS site
 *
 * @param config            The base configuration, which will be extended
 * @param websiteConfig     Contents of the generated website definition file, which will be used
 */
export function withOptimizelyConfig(config, websiteConfig) {
    if (!websiteConfig?.name)
        throw new Error("Providing the contents of a generated website definition file is mandatory");
    // Make any Optimizely environment variable available
    config.env = config.env ?? {};
    for (const key in process?.env ?? {})
        if (key.startsWith("OPTIMIZELY_"))
            config.env[key] = process.env[key];
    // Configure i18n based upon the network config
    if (websiteConfig && typeof (websiteConfig?.name) === "string") {
        config.i18n = config.i18n ?? { defaultLocale: '', locales: [] };
        config.i18n.locales = websiteConfig.locales;
        config.i18n.defaultLocale = websiteConfig.defaultLocale;
    }
    // Configure images
    if (process.env["OPTIMIZELY_DXP_URL"]) {
        config.images = config.images ?? {};
        config.images.domains = config.images.domains ?? [];
        const imgDomain = new URL(process.env["OPTIMIZELY_DXP_URL"]);
        if (!config.images.domains.includes(imgDomain.host))
            config.images.domains.push(imgDomain.host);
    }
    return config;
}
//# sourceMappingURL=config.js.map