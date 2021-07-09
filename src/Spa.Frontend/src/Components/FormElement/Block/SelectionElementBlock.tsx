import React, { FunctionComponent as FC} from 'react';
import { Components, Services, Taxonomy } from '@episerver/spa-core';
import { SelectionElementBlockProps } from 'app/Models/Content/SelectionElementBlockData';

export const SelectionElementBlock : FC<SelectionElementBlockProps> = (props) =>
{
    const fieldId : string = `__field_${ Services.ContentLink.createApiId(props.data.contentLink) }`;
    const fieldName : string = fieldId;
    const fieldInfoId : string = `${ fieldId }_Description`;
    const allowMultiSelect = Taxonomy.Property.readPropertyValue(props.data, "allowMultiSelect");
    const placeHolder = Taxonomy.Property.readPropertyValue(props.data, "placeHolder");

    const label = (() => {
        const labelText = Taxonomy.Property.readPropertyValue(props.data, "label");
        return labelText ? <label htmlFor={ fieldId }>{ labelText }</label> : null
    })();
    const description = (() => {
        const descriptionText = Taxonomy.Property.readPropertyValue(props.data, "description");
        return descriptionText ? <small id={ fieldInfoId } className="form-text text-muted">{ descriptionText }</small> : null
    })()

    return <div className="form-group">
        { label }
        <select id={ fieldId } name={ fieldName } className="form-control" multiple={ allowMultiSelect } placeholder={ placeHolder } aria-describedby={ description ? fieldInfoId : undefined } >
        </select>
        { description }            
    </div>
}
export default SelectionElementBlock;