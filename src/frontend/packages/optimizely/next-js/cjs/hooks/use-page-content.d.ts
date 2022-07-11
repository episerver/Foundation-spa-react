import type { ContentDelivery } from '@optimizely/cms';
import type { IContentData, ContentTypePath, ContentReference } from '@optimizely/cms/models';
export declare type PageRenderingProps = {
    /**
     * The identifier for the current content
     */
    contentId: string;
    /**
     * Fallback data for useSWR based hooks used within the
     * page.
     */
    fallback: Record<string, any>;
    /**
     * The locale used to fetch the content
     */
    locale: string;
    /**
     * Marker to tell the system the page is in edit mode
     */
    inEditMode?: boolean;
    /**
     * Marker to indicate the base type of the referenced content
     */
    baseType?: string;
    /**
     * The components required to render the page
     */
    components: ContentTypePath[];
} & Record<string, any>;
export declare function usePageContent(ref: ContentReference, inEditMode?: boolean, locale?: string): import("swr").SWRResponse<IContentData | undefined, {}>;
/**
 * Helper function to load the content needed to render a page, based on a contentId
 *
 * @param ref           The Content Reference to load the content for
 * @param api           The Content Delivery API client to use
 * @param locale        The current language
 * @param inEditMode    Whether or not to load from the draft versions
 * @returns             The data for the apge
 */
export declare function loadPageContent(ref: ContentReference, api: ContentDelivery.IContentDeliveryAPI, locale?: string, inEditMode?: boolean): Promise<PageRenderingProps | undefined>;
/**
 * Helper function to load the content needed to render a page, based on a contentId
 *
 * @param url           The path to load the content for
 * @param api           The Content Delivery API client to use
 * @param locale        The current language
 * @param inEditMode    Whether or not to load from the draft versions
 * @returns             The data for the apge
 */
export declare function loadPageContentByURL(url: string, api: ContentDelivery.IContentDeliveryAPI, locale?: string, inEditMode?: boolean): Promise<PageRenderingProps | undefined>;
export default usePageContent;
