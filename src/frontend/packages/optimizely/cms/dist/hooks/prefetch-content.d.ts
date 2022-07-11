import type { ContentReference } from '../models/content-link';
import type { IContent, IContentData } from '../models/icontent';
import { IContentDeliveryAPI } from '../content-delivery';
export declare type PreFetchContentResult<T extends IContent = IContentData> = {
    fallback: Record<string, T>;
    errors: Record<string, any>;
};
/**
 * Helper function to pre-fetch content for the useContent / useContents hooks, which enables SSR/SSG of these content items
 *
 * @param contentReferences     The references to the content items to fetch
 * @param select                The fields to select (same for all referenced items)
 * @param expand                The fields to automatically expand (same for all referenced items)
 * @param branch                The language to use
 * @param inEditMode
 * @param scope
 * @returns
 */
export declare function preFetchContent<T extends IContent = IContentData>(contentReferences: ContentReference[], select?: string[], expand?: string[], branch?: string, inEditMode?: boolean, scope?: string, api?: IContentDeliveryAPI): Promise<PreFetchContentResult<T>>;
