import type { IContent } from './icontent';
import type { ContentLink } from './content-link';
export type Weblink = {
    href: string;
    title?: string;
    target?: string;
    text: string;
};
export type PropertyDataType<ValueType> = ValueType extends ContentLink ? "PropertyContentReference" | "PropertyPageReference" : ValueType extends ContentAreaPropertyValue ? "PropertyContentArea" : ValueType extends ContentLink[] ? "PropertyContentReferenceList" : ValueType extends string ? "PropertyLongString" | "PropertyString" | "PropertyXhtmlString" : ValueType extends number ? "PropertyInt" | "PropertyNumber" | "PropertyFloatNumber" : ValueType extends boolean ? "PropertyBoolean" : ValueType extends Weblink ? "PropertyLink" : ValueType extends Weblink[] ? "PropertyLinkCollection" : ValueType extends IContent ? "PropertyBlock" : string;
export type ExpandedTypeFor<DataType> = DataType extends ContentLink ? IContent : DataType extends ContentLink[] ? IContent[] : DataType extends ContentAreaPropertyValue ? IContent[] : never;
/**
 * The contents of the ContentDelivery API response when flattening is enabled,
 * depending on the configuration null values are either included or removed
 * from the response.
 */
export type FlattenedProperty<ValueType = any> = ValueType | null | undefined;
/**
 * If the ContentDelivery API isn't returning flattened responses, there's some
 * additional data available for each property to confirm its type and an
 * expanded value - if it's available
 */
export type VerboseProperty<ValueType = any, ExpandedType = ExpandedTypeFor<ValueType>, ValueTypeIdentifier extends string = PropertyDataType<ValueType>> = {
    propertyDataType: ValueTypeIdentifier;
    value: FlattenedProperty<ValueType>;
    expandedValue?: ExpandedType;
};
/**
 * A simplified convenience type that's satisfied regardless of the ContentDelivery
 * API configuration.
 */
export type Property<ValueType = any, ExpandedType = ExpandedTypeFor<ValueType>, ValueTypeIdentifier extends string = PropertyDataType<ValueType>> = FlattenedProperty<ValueType> | VerboseProperty<ValueType, ExpandedType, ValueTypeIdentifier>;
export type PropertyBag = Record<string, Property<any>>;
export type ExpandedValueType<T> = T extends Property<infer R> ? ExpandedTypeFor<R> : never;
export type ValueType<T> = T extends Property<infer R> ? R : T;
/**
 * Strong typed property definition
 */
/**
 * @deprecated Use PropertyLongString instead, which aligns better with the ContentDefinitions API
 */
export type StringProperty = PropertyLongString;
/**
 * @deprecated Use PropertyNumber instead, which aligns better with the ContentDefinitions API
 */
export type NumberProperty = PropertyNumber;
/**
 * @deprecated Use PropertyBoolean instead, which aligns better with the ContentDefinitions API
 */
export type BooleanProperty = PropertyBoolean;
/**
 * @deprecated Use PropertyContentReference instead, which aligns better with the ContentDefinitions API
 */
export type ContentReferenceProperty = PropertyContentReference;
/**
 * @deprecated Use PropertyContentReferenceList instead, which aligns better with the ContentDefinitions API
 */
export type ContentReferenceListProperty = PropertyContentReferenceList;
/**
 * @deprecated Use PropertyContentArea instead, which aligns better with the ContentDefinitions API
 */
export type ContentAreaProperty = PropertyContentArea;
export type LinkListProperty = Property<LinkPropertyData[]>;
export type LinkProperty = Property<LinkPropertyData>;
export type LinkPropertyData = {
    href: string;
    title: string;
    target: string;
    text: string;
    contentLink: ContentLink;
};
/**
 * Definition of the ContentArea property value as used within the ContentDelivery API
 */
export type ContentAreaPropertyValue = ContentAreaPropertyItem[];
/**
 * A single item within an ContentArea, as returned by the ContentDelivery API
 */
export type ContentAreaPropertyItem<T extends IContent = IContent> = {
    contentLink: ContentLink;
    displayOption: string;
    tag: string;
    expandedValue?: T;
};
/** API Property types */
export type PropertyLongString = Property<string>;
export type PropertyBoolean = Property<boolean>;
export type PropertyContentReferenceList = Property<ContentLink[], IContent[]>;
export type PropertyXhtmlString = Property<string>;
export type PropertyFloatNumber = Property<number>;
export type PropertyNumber = Property<number>;
export type PropertyInt = Property<number>;
export type PropertyContentReference = Property<ContentLink, IContent>;
export type PropertyPageReference = Property<ContentLink, IContent>;
export type PropertyContentArea = Property<ContentAreaPropertyValue, IContent[]>;
export type PropertyLink = Property<Weblink>;
export type PropertyLinkCollection = Property<Weblink[]>;
export type PropertyBlock<T extends IContent> = Property<T>;
/** Default property type */
export default Property;
