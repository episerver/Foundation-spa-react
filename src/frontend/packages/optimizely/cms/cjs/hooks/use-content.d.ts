import type { IContent, IContentData, ContentReference, ErrorContent } from '../models';
import { IContentDeliveryAPI } from '../content-delivery';
import type { SWRResponse } from 'swr';
export declare type CmsContentFetcher = <T extends IContent = IContentData>(contentURI: string | URL, api?: IContentDeliveryAPI) => T | Promise<T>;
export declare function useContent<T extends IContent = IContentData>(contentReference: ContentReference, select?: (keyof T)[], expand?: (keyof T)[], branch?: string, scope?: string, inEditMode?: boolean): SWRResponse<T, ErrorContent>;
export declare const contentFetcher: CmsContentFetcher;
