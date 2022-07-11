import type { IContent } from './icontent';
import type { ContentLink } from './content-link';
export declare type Weblink = {
    href: string;
    title?: string;
    target?: string;
    text: string;
};
export declare type PropertyDataType<ValueType> = ValueType extends ContentLink ? "PropertyContentReference" | "PropertyPageReference" : ValueType extends ContentAreaPropertyValue ? "PropertyContentArea" : ValueType extends ContentLink[] ? "PropertyContentReferenceList" : ValueType extends string ? "PropertyLongString" | "PropertyString" | "PropertyXhtmlString" : ValueType extends number ? "PropertyInt" | "PropertyNumber" | "PropertyFloatNumber" : ValueType extends boolean ? "PropertyBoolean" : ValueType extends Weblink ? "PropertyLink" : ValueType extends Weblink[] ? "PropertyLinkCollection" : ValueType extends IContent ? "PropertyBlock" : string;
export declare type ExpandedTypeFor<DataType> = DataType extends ContentLink ? IContent : DataType extends ContentLink[] ? IContent[] : DataType extends ContentAreaPropertyValue ? IContent[] : never;
/**
 * The contents of the ContentDelivery API response when flattening is enabled,
 * depending on the configuration null values are either included or removed
 * from the response.
 */
export declare type FlattenedProperty<ValueType = any> = ValueType | null | undefined;
/**
 * If the ContentDelivery API isn't returning flattened responses, there's some
 * additional data available for each property to confirm its type and an
 * expanded value - if it's available
 */
export declare type VerboseProperty<ValueType = any, ExpandedType = ExpandedTypeFor<ValueType>, ValueTypeIdentifier extends string = PropertyDataType<ValueType>> = {
    propertyDataType: ValueTypeIdentifier;
    value: FlattenedProperty<ValueType>;
    expandedValue?: ExpandedType;
};
/**
 * A simplified convenience type that's satisfied regardless of the ContentDelivery
 * API configuration.
 */
export declare type Property<ValueType = any, ExpandedType = ExpandedTypeFor<ValueType>, ValueTypeIdentifier extends string = PropertyDataType<ValueType>> = FlattenedProperty<ValueType> | VerboseProperty<ValueType, ExpandedType, ValueTypeIdentifier>;
export declare type PropertyBag = Record<string, Property<any>>;
export declare type ExpandedValueType<T> = T extends Property<infer R> ? ExpandedTypeFor<R> : never;
export declare type ValueType<T> = T extends Property<infer R> ? R : T;
/**
 * Strong typed property definition
 */
/**
 * @deprecated Use PropertyLongString instead, which aligns better with the ContentDefinitions API
 */
export declare type StringProperty = PropertyLongString;
/**
 * @deprecated Use PropertyNumber instead, which aligns better with the ContentDefinitions API
 */
export declare type NumberProperty = PropertyNumber;
/**
 * @deprecated Use PropertyBoolean instead, which aligns better with the ContentDefinitions API
 */
export declare type BooleanProperty = PropertyBoolean;
/**
 * @deprecated Use PropertyContentReference instead, which aligns better with the ContentDefinitions API
 */
export declare type ContentReferenceProperty = PropertyContentReference;
/**
 * @deprecated Use PropertyContentReferenceList instead, which aligns better with the ContentDefinitions API
 */
export declare type ContentReferenceListProperty = PropertyContentReferenceList;
/**
 * @deprecated Use PropertyContentArea instead, which aligns better with the ContentDefinitions API
 */
export declare type ContentAreaProperty = PropertyContentArea;
export declare type LinkListProperty = Property<LinkPropertyData[]>;
export declare type LinkProperty = Property<LinkPropertyData>;
export declare type LinkPropertyData = {
    href: string;
    title: string;
    target: string;
    text: string;
    contentLink: ContentLink;
};
/**
 * Definition of the ContentArea property value as used within the ContentDelivery API
 */
export declare type ContentAreaPropertyValue = ContentAreaPropertyItem[];
/**
 * A single item within an ContentArea, as returned by the ContentDelivery API
 */
export declare type ContentAreaPropertyItem<T extends IContent = IContent> = {
    contentLink: ContentLink;
    displayOption: string;
    tag: string;
    expandedValue?: T;
};
/** API Property types */
export declare type PropertyLongString = Property<string>;
export declare type PropertyBoolean = Property<boolean>;
export declare type PropertyContentReferenceList = Property<ContentLink[], IContent[]>;
export declare type PropertyXhtmlString = Property<string>;
export declare type PropertyFloatNumber = Property<number>;
export declare type PropertyNumber = Property<number>;
export declare type PropertyInt = Property<number>;
export declare type PropertyContentReference = Property<ContentLink, IContent>;
export declare type PropertyPageReference = Property<ContentLink, IContent>;
export declare type PropertyContentArea = Property<ContentAreaPropertyValue, IContent[]>;
export declare type PropertyLink = Property<Weblink>;
export declare type PropertyLinkCollection = Property<Weblink[]>;
export declare type PropertyBlock<T extends IContent> = Property<T>;
/** Default property type */
export default Property;
