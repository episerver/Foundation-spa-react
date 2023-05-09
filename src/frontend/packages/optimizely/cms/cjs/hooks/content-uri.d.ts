import type { ContentReference } from '../models/content-link';
import type { IContent, IContentData } from '../models/icontent';
export declare const CMS_CONTENT_PROTOCOL = "opti-cms:";
export declare const enum CONTENT_PARAMS {
    Select = "select",
    Expand = "expand",
    InEditMode = "epieditmode",
    Language = "branch",
    Scope = "scope",
    VisitorGroup = "vg"
}
export type ContentUriData<T extends IContent = IContentData> = {
    contentIds: string[];
    select?: (keyof T)[];
    expand?: (keyof T)[];
    editMode: boolean;
    branch?: string;
    scope?: string;
    visitorGroup?: string;
};
export declare function buildContentURI(contentReference: ContentReference | ContentReference[], select?: string[], expand?: string[], branch?: string, inEditMode?: boolean, scope?: string, visitorGroup?: string): URL;
export declare function parseContentURI<T extends IContent = IContentData>(contentURI: string | URL): ContentUriData<T>;
export declare function isContentURI(toTest: string | URL): boolean;
