import React, { useId } from 'react';
import { readValue, processValue } from '../util/property';
import ContentAreaItem from './ContentAreaItem';
import { useOptimizely } from '../index';
export function ContentArea(props) {
    const opti = useOptimizely();
    var isEditable = opti.inEditMode || opti.isEditable;
    const myId = useId();
    if (props.value === undefined && props.content === undefined)
        return <>{props.children}</>;
    if (!props.container)
        throw new Error("The ContentArea was unable to resolve the container");
    if (!props.itemContainer)
        throw new Error("The ContentArea was unable to resolve the item container");
    const propName = props.name.toString();
    const value = ((processValue(props.value) ?? readValue(props.content, props.name)) || []);
    const language = props.language ?? opti.defaultBranch ?? '';
    const contentScope = props.scope ?? props.content?.contentLink.guidValue;
    const editContentId = parseInt(opti?.editableContent?.id || opti?.currentContentId);
    //console.log("LIB ContentArea 1:", isEditable)
    if (isEditable && props.content?.contentLink?.id && editContentId) {
        //console.log("LIB ContentArea 1a:", props.content?.contentLink?.id, editContentId, props.content?.contentLink?.id === editContentId)
        isEditable = props.content?.contentLink?.id === editContentId;
    }
    //console.log("LIB ContentArea 2:", isEditable)
    const ContainerElement = props.container;
    const ItemContainerElement = props.itemContainer;
    const items = value.map((item, idx) => {
        return <ContentAreaItem item={item} key={`${myId}-${propName}-item-${idx}`} itemContainer={ItemContainerElement} language={language} scope={contentScope} passEpiData={props.passEpiData} isEditable={isEditable}/>;
    });
    if (!isEditable)
        return <ContainerElement>{items}</ContainerElement>;
    if (props.passEpiData)
        return <ContainerElement dataEpiEdit={propName}>{items}</ContainerElement>;
    return <div className='content-area-edit' data-epi-edit={propName}><ContainerElement>{items}</ContainerElement></div>;
}
ContentArea.displayName = "Optimizely CMS: Content Area";
ContentArea.defaultProps = {
    itemContainer: (props) => { return <div className='content-area-item' data-template={props.displayOption}>{props.children}</div>; },
    container: (props) => { return <>{props.children}</>; },
    passEpiData: false
};
export default ContentArea;
//# sourceMappingURL=ContentArea.jsx.map