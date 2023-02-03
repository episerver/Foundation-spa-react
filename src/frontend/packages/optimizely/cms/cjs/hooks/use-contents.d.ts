import type { IContent, IContentData } from '../models/icontent';
import type { ErrorContent } from '../models/error-content';
import type { ContentReference } from '../models/content-link';
import type { IContentDeliveryAPI } from '../content-delivery/icontent-delivery-api';
import type { SWRResponse } from 'swr';
export type CmsContentBulkFetcher = <T extends IContent[] = IContentData[]>(contentURI: string | URL, api?: IContentDeliveryAPI) => T | Promise<T>;
export declare function useContents<T extends IContent = IContentData>(contentReferences: ContentReference[], select?: (keyof T)[], expand?: (keyof T)[], branch?: string, scope?: string, inEditMode?: boolean): SWRResponse<T[], ErrorContent>;
export declare const contentsFetcher: CmsContentBulkFetcher;
