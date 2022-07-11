import type { ComponentType, FunctionComponent, PropsWithChildren } from 'react'
import type {  ContentAreaPropertyItem, IContent, IContentData, ErrorContent } from '../models'
import React from 'react'
import { useContent } from '../hooks'
import ContentComponent from './ContentComponent'

export type ContentAreaItemContainerProps = ContentAreaPropertyItem & {
    componentIsLoading: boolean
    dataIsLoading: boolean
    dataEpiBlockId?: number
}

export type ContentAreaItemContainer = ComponentType<PropsWithChildren<ContentAreaItemContainerProps>>

export type ContentAreaItemProps<T extends IContent = IContentData> = {
    isEditable: boolean
    itemContainer : ContentAreaItemContainer
    item: ContentAreaPropertyItem<T>
    language: string
    scope?: string
    passEpiData?: boolean
}

export const ContentAreaItem : FunctionComponent<ContentAreaItemProps> = props => {    
    const ItemContainerElement = props.itemContainer
    const { data, error } = useContent(props.item.contentLink, undefined, undefined, props.language, undefined, props.isEditable)
    const itemData : IContentData | ErrorContent | undefined = data ?? error;
    const contentTypePath = itemData?.contentType
    const dataIsLoading = data == undefined
    const bodyFactory = () => dataIsLoading ?  <>Loading...</> : <ContentComponent content={ data } contentType={ contentTypePath } locale={ props.language } prefix="block" />
    const contentId = dataIsLoading ? props.item.contentLink.id : data.contentLink.id;

    //console.log('LIB ContentAreaItem:', props.isEditable, props.passEpiData, contentId)
    if (!props.isEditable)
        return <ItemContainerElement {...props.item} componentIsLoading={false} dataIsLoading={dataIsLoading}>{ bodyFactory() }</ItemContainerElement>

    if (props.passEpiData) {
        return <ItemContainerElement {...props.item} dataEpiBlockId={ contentId } componentIsLoading={false} dataIsLoading={dataIsLoading}>{ bodyFactory() }</ItemContainerElement>
    }

    return <div className='content-area-item-edit' data-epi-block-id={ contentId }>
        <ItemContainerElement {...props.item} componentIsLoading={false} dataIsLoading={dataIsLoading}>{ bodyFactory() }</ItemContainerElement>
    </div>
}
ContentAreaItem.defaultProps = {
    passEpiData: false
}
ContentAreaItem.displayName = "Optimizely CMS: Content Area Item"

export default ContentAreaItem