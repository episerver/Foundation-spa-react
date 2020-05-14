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

export abstract class BaseIContent<T extends IContent> implements IContent {
    public contentLink: ContentLink;
    public name: NameProperty;
    public language?: Language;
    public existingLanguages?: LanguageList;
    public masterLanguage?: Language;
    public contentType: ContentTypePath;
    public parentLink?: ContentLink;
    public routeSegment?: string | null;
    public url?: string | null;
    public changed?: string | null;
    public created?: string | null;
    public startPublish?: string | null;
    public stopPublish?: string | null;
    public saved?: string | null;
    public status?: string | null;

    protected abstract _typeName : string;
    protected abstract _propertyMap : { [propName: string]: string };

    public constructor(baseData: T) {
        Object.assign(this, baseData);
    }

    public getTypeName() {
        return this._typeName;
    }

    public getProperty<K extends keyof T>(prop: K) : T[K]
    {
        let data = this as unknown as T;
        return data[prop];
    }

    public getPropertyType<K extends keyof T>(prop: K) : string
    {
        return this._propertyMap[prop.toString()];
    }
}

/**
 * Static definition for the IContent instance class, so that
 * it can be autoloaded using strong typing using TypeScript.
 */
export interface IContentType {
    new<T extends IContent>(baseData: T) : BaseIContent<T>
}