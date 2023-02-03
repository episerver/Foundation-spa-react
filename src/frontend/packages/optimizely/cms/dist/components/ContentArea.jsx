import React, { useId } from 'react';
import { readValue, processValue } from '../util/property';
import ContentAreaItem from './ContentAreaItem';
import { useEditMode } from '../provider/edit-mode';
import { useOptimizelyCms } from '../provider/index';
const DEBUG = process.env.NODE_ENV != 'production';
export function ContentArea(props) {
    const cms = useOptimizelyCms();
    const opti = useEditMode();
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
    const language = props.language ?? cms.defaultBranch ?? '';
    const contentScope = props.scope ?? props.content?.contentLink.guidValue;
    const contentId = props.content?.contentLink.id;
    const contentWorkId = props.content?.contentLink.workId;
    const allowEdit = (contentId && (contentId == opti.contentId) ? true : false) &&
        (contentWorkId && opti.contentWorkId ? contentWorkId == opti.contentWorkId : true);
    if (DEBUG) {
        console.groupCollapsed(`Optimizely - CMS: ContentArea [${propName}]`);
        console.log("Optimizely - CMS: ContentArea: contentId", contentId);
        console.log("Optimizely - CMS: ContentArea: contentWorkId", contentWorkId);
        console.log("Optimizely - CMS: ContentArea: contentScope", contentScope);
        console.log("Optimizely - CMS: ContentArea: inEditMode", isEditable ? "Yes" : "No");
        console.log("Optimizely - CMS: ContentArea: allowEdit", allowEdit ? "Yes" : "No");
        console.groupEnd();
    }
    isEditable = allowEdit && isEditable;
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