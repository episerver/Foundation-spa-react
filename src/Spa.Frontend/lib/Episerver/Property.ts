import IContent from './Models/IContent';
import ContentLink from './Models/ContentLink';
import { ContentAreaPropertyValue } from './Components/ContentArea';

/**
 * Default untyped property definition
 */
export default interface Property<T> {
  propertyDataType: string;
  value: T;
  expandedValue?: any;
}

/**
 * String typed property definition
 */
export interface StringProperty extends Property<string> {}

export interface NumberProperty extends Property<number> {}

export interface BooleanProperty extends Property<boolean> {}

/**
 * Content reference typed property definition
 */
export interface ContentReferenceProperty extends Property<ContentLink> {
  expandedValue?: IContent;
}

export interface ContentAreaProperty extends Property<ContentAreaPropertyValue> {
  expandedValue?: Array<IContent>;
}

export interface LinkListProperty extends Property<Array<LinkProperty>> {}

export interface LinkProperty {
  href: string;
  title: string;
  target: string;
  text: string;
  contentLink: ContentLink;
}
