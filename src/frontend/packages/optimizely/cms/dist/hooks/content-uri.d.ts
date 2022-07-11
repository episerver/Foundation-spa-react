import type { ContentReference } from '../models/content-link';
import type { IContent, IContentData } from '../models/icontent';
export declare const CMS_CONTENT_PROTOCOL = "opti-cms:";
export declare const enum CONTENT_PARAMS {
    Select = "select",
    Expand = "expand",
    InEditMode = "epieditmode",
    Language = "branch",
    Scope = "scope"
}
export declare type ContentUriData<T extends IContent = IContentData> = {
    contentIds: string[];
    select?: (keyof T)[];
    expand?: (keyof T)[];
    editMode: boolean;
    branch?: string;
    scope?: string;
};
export declare function buildContentURI(contentReference: ContentReference | ContentReference[], select?: string[], expand?: string[], branch?: string, inEditMode?: boolean, scope?: string): URL;
export declare function parseContentURI<T extends IContent = IContentData>(contentURI: string | URL): ContentUriData<T>;
