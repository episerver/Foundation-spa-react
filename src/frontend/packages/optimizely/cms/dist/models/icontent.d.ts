import Property, { PropertyLongString } from './property';
import ContentLink from './content-link';
import ContentTypePath from './content-type-path';
import Language from './language';
import LanguageList from './language-list';
export type IContent = {
    contentLink: ContentLink;
    name: PropertyLongString;
    language: Language;
    existingLanguages?: LanguageList;
    masterLanguage?: Language;
    contentType: ContentTypePath;
    parentLink?: ContentLink;
    routeSegment?: string | null;
    url?: string | null;
    changed?: string | null;
    created?: string | null;
    startPublish?: string | null;
    stopPublish?: string | null;
    saved?: string | null;
    status?: ContentStatus;
};
export declare const enum ContentStatus {
    Published = "Published",
    Draft = "Draft"
}
export type IContentData = IContent & Record<string, Property<any>>;
export type CatalogContent = IContent & {
    code: Property<string | null | undefined, never, 'PropertyLongString'>;
};
export type CatalogContentData = IContent & {
    code: Property<string | null | undefined, never, 'PropertyLongString'>;
} & Record<string, Property<any>>;
export default IContent;
