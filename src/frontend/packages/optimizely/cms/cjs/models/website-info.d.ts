export type WebsiteInfo = {
    /**
     * The GUID of the website
     */
    id: string;
    /**
     * The name of the website
     */
    name: string;
    /**
     * The reference to the homepage
     */
    startPage: string;
    /**
     * The URL of the homepage
     */
    startPageUrl: string;
    /**
     * All locales registered for this website
     */
    locales: string[];
    /**
     * The default locale of this website
     */
    defaultLocale: string;
    /**
     * The Locale labels configured within the CMS for the
     * locales enabled for this website
     */
    labels: {
        code: string;
        label: string;
    }[];
    /**
     * The primary domain for the current website
     */
    primaryDomain: string;
    /**
     * The list of supported domaines by this website
     */
    domains: string[];
    /**
     * A list of locale/domain bindings specific for this domain
     */
    localeDomains: {
        domain: string;
        defaultLocale: string;
    }[];
} | null;
export default WebsiteInfo;
