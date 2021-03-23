import React from 'react';
import { Components, Services } from '@episerver/spa-core';
import { SelectionElementBlockProps } from '../../../Models/Content/SelectionElementBlockData';

export const SelectionElementBlock : React.FunctionComponent<SelectionElementBlockProps> = (props) =>
{
    let fieldId : string = `__field_${Services.ContentLink.createApiId(props.data.contentLink)}`;
    let fieldName : string = fieldId;
    let fieldInfoId : string = `${ fieldId }_Description`;

    let label = null;
    let description = null;
    if (props.data?.label?.value) 
        label = <label htmlFor={ fieldId }><Components.Property iContent={props.data} field="label" /></label>;
    if (props.data?.description?.value)
        description = <small id={ fieldInfoId } className="form-text text-muted"><Components.Property iContent={props.data} field="description"/></small>;

    return <div className="form-group">
        { label }
        <select id={ fieldId } name={ fieldName } className="form-control" multiple={ props.data.allowMultiSelect?.value } placeholder={ props.data.placeHolder?.value } aria-describedby={ description ? fieldInfoId : undefined } >
        </select>
        { description }            
    </div>
}
export default SelectionElementBlock;