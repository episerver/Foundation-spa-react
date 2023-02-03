import React from 'react';
import { useEditMode } from '../provider/edit-mode';
/**
 * The EditableField provides the needed wrapping - when in edit mode -
 * to make a field editable. It does not control the rendering of the field,
 * this should be provided as children to this Component
 *
 * @param props The rendering properties for this component
 * @returns
 */
export const EditableField = (props) => {
    const opti = useEditMode();
    const isEditable = props.contentEditable === undefined ? opti.inEditMode || opti.isEditable : props.contentEditable;
    const cssClass = `${props.className ?? ''} opti-edit-container`;
    const htmlContent = props.html ? { __html: props.html } : undefined;
    if (!isEditable)
        return props.html ? <div dangerouslySetInnerHTML={htmlContent}/> : <>{props.children}</>;
    if (props.html)
        return props.inline ?
            <span className={`${cssClass} opti-edit-container-inline`} data-epi-edit={props.field} dangerouslySetInnerHTML={htmlContent}/> :
            <div className={`${cssClass} opti-edit-container-block`} data-epi-edit={props.field} dangerouslySetInnerHTML={htmlContent}/>;
    return props.inline ?
        <span className={`${cssClass} opti-edit-container-inline`} data-epi-edit={props.field}>{props.children}</span> :
        <div className={`${cssClass} opti-edit-container-block`} data-epi-edit={props.field}>{props.children}</div>;
};
EditableField.defaultProps = {
    inline: false,
    className: ""
};
EditableField.displayName = "Optimizely CMS: Editable Field";
/**
 * Higher order component to create a CMS Editable version of the provided component
 *
 * @param       Component   The component to make editable by the CMS
 * @returns     Component made editable in the CMS
 */
export const withOnPageEditing = function (Component) {
    var enabledComponent = (props) => {
        return <EditableField field={props.field} inline={props.inline} className={props.className}><Component {...props}/></EditableField>;
    };
    enabledComponent.displayName = "Editable " + (Component.displayName ?? 'component');
    return enabledComponent;
};
export default EditableField;
//# sourceMappingURL=EditableField.jsx.map