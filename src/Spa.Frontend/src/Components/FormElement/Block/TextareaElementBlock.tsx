import React, { ReactNode, ReactNodeArray } from 'react';
import { Taxonomy, Services } from '@episerver/spa-core';
import TextareaElementBlockData from 'app/Models/Content/TextareaElementBlockData';
import AbstractElementBlock from 'app/Components/FormElement/AbstractElementBlock';

export default class TextareaElementBlock extends AbstractElementBlock<TextareaElementBlockData>
{
    public render() : null | ReactNode | ReactNodeArray
    {
        const fieldId : string = `__field_${Services.ContentLink.createApiId(this.props.data.contentLink)}`;
        const fieldName : string = fieldId;
        const fieldInfoId : string = `${ fieldId }_Description`;
        const placeHolder = Taxonomy.Property.readPropertyValue(this.props.data, "placeHolder");

        const label = (() => {
            const labelText = Taxonomy.Property.readPropertyValue(this.props.data, "label");
            return labelText ? <label htmlFor={ fieldId }>{ labelText }</label> : null
        })();
        const description = (() => {
            const descriptionText = Taxonomy.Property.readPropertyValue(this.props.data, "description");
            return descriptionText ? <small id={ fieldInfoId } className="form-text text-muted">{ descriptionText }</small> : null
        })()

        return <div className="form-group">
            { label }
            <textarea id={ fieldId } name={ fieldName } className="form-control" placeholder={ placeHolder } aria-describedby={ fieldInfoId }>
            </textarea>
            { description }
        </div>
    }
}
