import React from 'react';
import { useContent } from '../hooks';
import ContentComponent from './ContentComponent';
export const ContentAreaItem = props => {
    const ItemContainerElement = props.itemContainer;
    const ct = useContent(props.item.contentLink, undefined, undefined, props.language, undefined, props.isEditable);
    const data = props.item.contentLink.id == 0 ? props.item.inlineBlock : ct?.data;
    const error = props.item.contentLink.id == 0 ? undefined : ct?.error;
    const itemData = data ?? error;
    const contentTypePath = itemData?.contentType;
    const dataIsLoading = itemData == undefined;
    if (itemData && itemData.contentLink == undefined)
        itemData.contentLink = { id: 0, workId: -1 };
    //console.log('ContentAreaItem', itemData, contentTypePath,  dataIsLoading)
    const bodyFactory = () => dataIsLoading ? <>Loading...</> : <ContentComponent content={itemData} contentType={contentTypePath} locale={props.language} prefix="block"/>;
    const contentId = dataIsLoading ? props.item.contentLink.id : (itemData.contentLink?.id ?? props.item.contentLink.id);
    //console.log('LIB ContentAreaItem:', props.isEditable, props.passEpiData, contentId)
    if (!props.isEditable)
        return <ItemContainerElement {...props.item} componentIsLoading={false} dataIsLoading={dataIsLoading}>{bodyFactory()}</ItemContainerElement>;
    if (props.passEpiData) {
        return <ItemContainerElement {...props.item} dataEpiBlockId={contentId} componentIsLoading={false} dataIsLoading={dataIsLoading}>{bodyFactory()}</ItemContainerElement>;
    }
    return <div className='content-area-item-edit' data-epi-block-id={contentId}>
        <ItemContainerElement {...props.item} componentIsLoading={false} dataIsLoading={dataIsLoading}>{bodyFactory()}</ItemContainerElement>
    </div>;
};
ContentAreaItem.defaultProps = {
    passEpiData: false
};
ContentAreaItem.displayName = "Optimizely CMS: Content Area Item";
export default ContentAreaItem;
//# sourceMappingURL=ContentAreaItem.jsx.map