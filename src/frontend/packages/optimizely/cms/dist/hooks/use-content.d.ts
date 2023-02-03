import type { IContent, IContentData } from '../models/icontent';
import type { ErrorContent } from '../models/error-content';
import type { ContentReference } from '../models/content-link';
import type { IContentDeliveryAPI } from '../content-delivery/icontent-delivery-api';
import type { SWRResponse, Fetcher } from 'swr';
export type CmsContentFetcher = <T extends IContent = IContentData>(contentURI: Parameters<Fetcher<T | null, string | URL>>[0], api?: IContentDeliveryAPI) => ReturnType<Fetcher<T | null, string | URL>>;
export declare function useContent<T extends IContent = IContentData>(contentReference: ContentReference, select?: (keyof T)[], expand?: (keyof T)[], branch?: string, scope?: string, inEditMode?: boolean): SWRResponse<T | null, ErrorContent> | undefined;
export declare const contentFetcher: CmsContentFetcher;
