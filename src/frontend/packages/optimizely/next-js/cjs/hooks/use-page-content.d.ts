import type { ComponentLoader, IContentDeliveryAPI } from '@optimizely/cms/types';
import type { IContentData, ContentTypePath, ContentReference } from '@optimizely/cms/models';
export type PageRenderingProps = {
    contentId: string;
    fallback: Record<string, any>;
    locale: string;
    inEditMode?: boolean;
    prefix?: string;
    component: ContentTypePath;
} & Record<string, any>;
export declare function usePageContent(ref: ContentReference, inEditMode?: boolean, locale?: string): import("swr/_internal").SWRResponse<IContentData | undefined, {}, Partial<import("swr/_internal").PublicConfiguration<IContentData | undefined, {}, (arg: string) => import("swr/_internal").FetcherResponse<IContentData | undefined>>> | undefined>;
export declare function loadPageContentByUrl(url: URL | string, api: IContentDeliveryAPI, locale?: string, inEditMode?: boolean, cLoader?: ComponentLoader): Promise<PageRenderingProps | undefined>;
export declare function loadPageContent(ref: ContentReference, api: IContentDeliveryAPI, locale?: string, inEditMode?: boolean, cLoader?: ComponentLoader): Promise<PageRenderingProps | undefined>;
export default usePageContent;
