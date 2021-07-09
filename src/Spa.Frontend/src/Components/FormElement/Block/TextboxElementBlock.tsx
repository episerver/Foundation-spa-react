import React, { ReactNode, ReactNodeArray } from 'react';
import { Services, Taxonomy } from '@episerver/spa-core';
import TextboxElementBlockData from 'app/Models/Content/TextboxElementBlockData';
import AbstractElementBlock from 'app/Components/FormElement/AbstractElementBlock';

export default class TextboxElementBlock extends AbstractElementBlock<TextboxElementBlockData>
{
    public render() : null | ReactNode | ReactNodeArray
    {
        const fieldId : string = `__field_${Services.ContentLink.createApiId(this.props.data.contentLink)}`;
        const fieldName : string = fieldId;
        const fieldInfoId : string = `${ fieldId }_Description`;
        const placeHolder = Taxonomy.Property.readPropertyValue(this.props.data, "placeHolder");
        const defaultValue = Taxonomy.Property.readPropertyValue(this.props.data, "predefinedValue");

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
            <input type={ this.getFieldType() } id={ fieldId } name={ fieldName } className="form-control" defaultValue={ defaultValue } placeholder={ placeHolder } aria-describedby={ description ? fieldInfoId : undefined } />
            { description }            
        </div>
    }

    protected getFieldType() : string
    {
        const validators = Taxonomy.Property.readPropertyValue(this.props.data, "validators");
        if ((validators?.indexOf('EPiServer.Forms.Implementation.Validation.EmailValidator', 0) || 0) >= 0) {
            return 'email';
        }
        return 'text';
    }
}
