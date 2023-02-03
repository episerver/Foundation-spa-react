export type WebsiteDefinition = {
    /**
     * The website name as configured within Content Cloud
     */
    name: string;
    /**
     * The identifier of the website
     */
    id: string;
    /**
     * The content identifier of the configured homepage within
     * Content Cloud
     */
    startPage?: string;
    /**
     * The Locales configured for the website, as a list iso country
     * or country-language codes.
     */
    locales: string[];
    /**
     * The default locale to use if none specified
     */
    defaultLocale: string;
    /**
     * Display information about each of the locales configured for
     * the website
     */
    labels: WebsiteLocaleLabel[];
    /**
     * The domains bound to the website
     */
    domains: string[];
    /**
     * Any locale specific domains to be used
     */
    localeDomains: any;
};
export type WebsiteLocaleLabel = {
    code: string;
    label: string;
};
export default WebsiteDefinition;
