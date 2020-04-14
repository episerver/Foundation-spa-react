import Property, { StringProperty } from '../Property';
import ContentLink from './ContentLink';
import ContentTypePath from './ContentTypePath';
import Language from './Language';
import LanguageList from './LanguageList';

export type NameProperty = string | StringProperty;
export type GenericProperty = string | null | Language | LanguageList | ContentTypePath | ContentLink | Property<any>;

export function namePropertyIsString(prop: NameProperty) : prop is string
{
    if (prop && (prop as string).trim) {
        return true;
    }
    return false;
}

export default interface IContent {
    contentLink: ContentLink,
    name: NameProperty,
    language?: Language,
    existingLanguages?: LanguageList,
    masterLanguage?: Language,
    contentType: ContentTypePath,
    parentLink?: ContentLink,
    routeSegment?: string | null,
    url?: string | null,
    changed?: string | null,
    created?: string | null,
    startPublish?: string | null,
    stopPublish?: string | null,
    saved?: string | null,
    status?: string | null,
}

export interface IContentData extends IContent
{
    [name: string]: GenericProperty
}
