"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withOnPageEditing = exports.EditableField = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const index_1 = require("../index");
/**
 * The EditableField provides the needed wrapping - when in edit mode -
 * to make a field editable. It does not control the rendering of the field,
 * this should be provided as children to this Component
 *
 * @param props The rendering properties for this component
 * @returns
 */
const EditableField = (props) => {
    var _a;
    const opti = (0, index_1.useOptimizely)();
    const isEditable = opti.inEditMode || opti.isEditable;
    const cssClass = `${(_a = props.className) !== null && _a !== void 0 ? _a : ''} opti-edit-container`;
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
exports.EditableField = EditableField;
exports.EditableField.defaultProps = {
    inline: false,
    className: ""
};
exports.EditableField.displayName = "Optimizely CMS: Editable Field";
/**
 * Higher order component to create a CMS Editable version of the provided component
 *
 * @param       Component   The component to make editable by the CMS
 * @returns     Component made editable in the CMS
 */
const withOnPageEditing = function (Component) {
    var _a;
    var enabledComponent = (props) => {
        return <exports.EditableField field={props.field} inline={props.inline} className={props.className}><Component {...props}/></exports.EditableField>;
    };
    enabledComponent.displayName = "Editable " + ((_a = Component.displayName) !== null && _a !== void 0 ? _a : 'component');
    return enabledComponent;
};
exports.withOnPageEditing = withOnPageEditing;
exports.default = exports.EditableField;
//# sourceMappingURL=EditableField.jsx.map