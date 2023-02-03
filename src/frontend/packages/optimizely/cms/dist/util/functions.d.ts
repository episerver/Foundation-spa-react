import type { IContentDeliveryAPI } from '../content-delivery/icontent-delivery-api';
import type { IContent, IContentData } from '../models/icontent';
import type { Property, PropertyContentArea } from '../models/property';
import type { ComponentLoader } from '../loader/index';
export type getPagesForLocaleOptions = {
    debug?: boolean;
    batchSize?: number;
};
/**
 * Normalize URLs, to ensure that they're consistent across Server Side Rendering, Static Site Generation and Client Side Hydration
 *
 * @param       input       The input to normalize
 * @returns     The normalized URL
 */
export declare function normalizeUrl(input: string): string;
/**
 * Helper method to load all pages for a specific locale, making use of the
 * Optimizely Search & Navigation extension for the Content Delivery API.
 *
 * @param       api         The API client instance to use
 * @param       locale      The language branch to load the pages for
 * @returns     A promise resolving in the loaded content items
 */
export declare function getPagesForLocale(api: IContentDeliveryAPI, locale: string, options?: getPagesForLocaleOptions): Promise<IContentData[]>;
/**
 * Test if the given variable is both of type string and contains
 * a value (i.e. the length after trimming is greater then zero).
 *
 * @param      toTest      The variable to test
 * @returns    True if it's a non-empty string, false otherwise
 */
export declare function isNonEmptyString(toTest: any): toTest is string;
/**
 * Helper function that either returns the provided value (when it's
 * not undefied) or invokes the factory method to return the requested
 * instance.
 *
 * @param      providedValue       An optionally provided instance of an object
 * @param      factory             The factory method to create an instance if none was provided
 * @returns    The instance to use
 */
export declare function resolve<T>(providedValue: T | undefined, factory: () => T): T;
export type FilteredContentWithAdditionalProps = {
    /**
     * The content to be filtered and used to load additional
     * properties.
     */
    content: IContent;
    /**
     * The data for useSWR based hooks to render server side and
     * hydrate in the browser.
     */
    fallback?: Record<string, any>;
} & Record<string, Property>;
export declare function loadAdditionalPropsAndFilter(content: IContentData, api: IContentDeliveryAPI, locale?: string, preview?: boolean, prefix?: string, cLoader?: ComponentLoader): Promise<FilteredContentWithAdditionalProps>;
export declare function filterProps(content: IContentData, api: IContentDeliveryAPI, locale?: string, preview?: boolean, cLoader?: ComponentLoader): Promise<IContentData>;
type KeyOfType<T, V> = keyof {
    [P in keyof T as T[P] extends V ? P : never]: any;
};
type AreaConfig<T extends IContent = IContentData> = {
    name: KeyOfType<T, PropertyContentArea>;
    select?: string[];
    expand?: string[];
};
type PrefetchResponse = Record<string, IContentData>;
export declare function prefetchContentAreaRecursive<T extends IContent = IContentData>(content: T, areas: AreaConfig<T>[], locale?: string, inEditMode?: boolean, scope?: string, cdApi?: IContentDeliveryAPI, cLoader?: ComponentLoader): Promise<PrefetchResponse>;
export declare function isDxpDebugActive(): boolean;
export {};
