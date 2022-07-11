import type { IContent, IContentData, ErrorContent, ContentReference } from '../models';
import type { IContentDeliveryAPI } from '../content-delivery';
import type { SWRResponse } from 'swr';
export declare type CmsContentBulkFetcher = <T extends IContent[] = IContentData[]>(contentURI: string | URL, api?: IContentDeliveryAPI) => T | Promise<T>;
export declare function useContents<T extends IContent = IContentData>(contentReferences: ContentReference[], select?: (keyof T)[], expand?: (keyof T)[], branch?: string, scope?: string, inEditMode?: boolean): SWRResponse<T[], ErrorContent>;
export declare const contentsFetcher: CmsContentBulkFetcher;
