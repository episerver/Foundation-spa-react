import type { ComponentType, FunctionComponent, PropsWithChildren } from 'react';
import type { ContentAreaPropertyItem, IContent, IContentData } from '../models';
export declare type ContentAreaItemContainerProps = ContentAreaPropertyItem & {
    componentIsLoading: boolean;
    dataIsLoading: boolean;
    dataEpiBlockId?: number;
};
export declare type ContentAreaItemContainer = ComponentType<PropsWithChildren<ContentAreaItemContainerProps>>;
export declare type ContentAreaItemProps<T extends IContent = IContentData> = {
    isEditable: boolean;
    itemContainer: ContentAreaItemContainer;
    item: ContentAreaPropertyItem<T>;
    language: string;
    scope?: string;
    passEpiData?: boolean;
};
export declare const ContentAreaItem: FunctionComponent<ContentAreaItemProps>;
export default ContentAreaItem;
