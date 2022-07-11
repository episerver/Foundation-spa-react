import IContent from './icontent';
export declare type ContentReference = IContent | ContentLink | string;
export declare type ContentApiId = string;
/**
 * Describe a content-link item as returned by the Episerver
 * Content Delivery API.
 */
export declare type ContentLink<T extends IContent = IContent> = {
    id: number;
    workId?: number;
    guidValue: string;
    providerName?: string;
    url: string;
    expanded?: T;
};
export default ContentLink;
