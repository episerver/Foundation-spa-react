import LanguageList from './language-list';
import Language from './language';
import ContentRootList from './content-root-list';
export type HostDefinition = {
    /**
     * The name of the host (domain name)
     */
    name: string;
    /**
     * The type of the host (or "Undefined" if not set)
     */
    type: string;
    /**
     * The default language for the host
     */
    language: null | undefined | Language;
};
/**
 * Episerver Website Model, as returned by the ContentDelivery API.
 */
export type Website = {
    /**
     * The GUID of the website
     */
    id: string;
    /**
     * The visible name of the website
     */
    name: string;
    /**
     * The languages which have been assigned to the website
     */
    languages: LanguageList;
    /**
     * The content start items for this website
     */
    contentRoots: ContentRootList;
    /**
     * The list of hostnames assigned to this website
     */
    hosts?: HostDefinition[];
};
export default Website;
