import type { ComponentLoader, IContentDeliveryAPI } from '@optimizely/cms/types';
import type { IContentData, ContentTypePath, ContentReference } from '@optimizely/cms/models';
export type PageRenderingProps = {
    contentId: string;
    fallback: Record<string, any>;
    locale: string;
    inEditMode?: boolean;
    prefix?: string;
    component: ContentTypePath;
    baseType?: 'Page' | 'Block' | 'Media';
} & Record<string, any>;
export declare function usePageContent(ref: ContentReference, inEditMode?: boolean, locale?: string): import("swr/dist/_internal").SWRResponse<IContentData | undefined, {}, import("swr/dist/_internal").SWRConfiguration<IContentData | undefined, {}, (arg: string) => import("swr/dist/_internal").FetcherResponse<IContentData | undefined>> | undefined>;
export declare function loadPageContentByUrl(url: URL | string, api: IContentDeliveryAPI, locale?: string, inEditMode?: boolean, cLoader?: ComponentLoader): Promise<PageRenderingProps | undefined>;
export declare function loadPageContent(ref: ContentReference, api: IContentDeliveryAPI, locale?: string, inEditMode?: boolean, cLoader?: ComponentLoader): Promise<PageRenderingProps | undefined>;
export default usePageContent;
