import type { PropsWithChildren, ReactElement, ComponentType } from 'react';
import type { PropertyContentArea } from '../models/property';
import type { IContent, IContentData } from '../models/icontent';
import { ContentAreaItemContainer } from './ContentAreaItem';
export declare type KeyOfType<T, V> = keyof {
    [P in keyof T as T[P] extends V ? P : never]: any;
};
export declare type ContentAreaContainerProps = {
    dataEpiEdit?: string;
};
export declare type ContentAreaContainer = ComponentType<PropsWithChildren<ContentAreaContainerProps>>;
export declare type ContentAreaProps<T extends IContent = IContent, I extends T | undefined = T | undefined> = {
    /**
     * The name of the ContentArea property, to be fetched from
     * the content and used to render the properties to make it
     * editable.
     */
    name: KeyOfType<T, PropertyContentArea>;
    /**
     * The current language to render the content with
     */
    language?: string;
    /**
     * Override the default container used to wrap content area items
     * within
     */
    itemContainer?: ContentAreaItemContainer;
    /**
     * Override the default conatiner used to wrap the entire contentarea
     * within
     */
    container?: ContentAreaContainer;
    /**
     * If set to true, the contentarea won't render additional html elements
     * in edit mode, but expect the renderer to use dataEpi* properties to
     * output the needed props.
     */
    passEpiData?: boolean;
} & ({
    /**
     * The IContent item to read the property from. This value will be
     * ignored when you provide the value as well.
     */
    content: I;
    /**
     * The value of the ContentArea property, if provided this takes
     * presendence over the content item.
     */
    value?: undefined;
    /**
     * The scope used when dynamically loading the content, this is typically
     * the guidValue of the IContent containing the ContentArea
     */
    scope?: undefined;
} | {
    content?: undefined;
    /**
     * The value of the ContentArea property, if provided this takes
     * presendence over the content item.
     */
    value: PropertyContentArea;
    /**
     * The scope used when dynamically loading the content, this is typically
     * the guidValue of the IContent containing the ContentArea
     */
    scope: string;
});
export declare function ContentArea<T extends IContent = IContentData>(props: PropsWithChildren<ContentAreaProps<T>>): ReactElement<any, any> | null;
export declare namespace ContentArea {
    var displayName: string;
    var defaultProps: Partial<ContentAreaProps<IContent, IContent | undefined>>;
}
export default ContentArea;
