import React, { ReactNode, ReactNodeArray } from 'react';
import { Components, Services } from '@episerver/spa-core';
import TextboxElementBlockData from 'app/Models/Content/TextboxElementBlockData';
import AbstractElementBlock from 'app/Components/FormElement/AbstractElementBlock';

export default class TextboxElementBlock extends AbstractElementBlock<TextboxElementBlockData>
{
    public render() : null | ReactNode | ReactNodeArray
    {
        let fieldId : string = `__field_${Services.ContentLink.createApiId(this.props.data.contentLink)}`;
        let fieldName : string = fieldId;
        let fieldInfoId : string = `${ fieldId }_Description`;

        let label = null;
        let description = null;
        if (this.props.data?.label?.value) 
            label = <label htmlFor={ fieldId }><Components.Property iContent={this.props.data} field="label" context={ this.getContext() }/></label>;
        if (this.props.data?.description?.value)
            description = <small id={ fieldInfoId } className="form-text text-muted"><Components.Property iContent={this.props.data} field="description" context={ this.getContext() }/></small>;

        return <div className="form-group">
            { label }
            <input type={ this.getFieldType() } id={ fieldId } name={ fieldName } className="form-control" defaultValue={ this.props.data.predefinedValue?.value } placeholder={ this.props.data.placeHolder?.value } aria-describedby={ description ? fieldInfoId : undefined } />
            { description }            
        </div>
    }

    protected getFieldType() : string
    {
        if (this.props.data.validators.value.indexOf('EPiServer.Forms.Implementation.Validation.EmailValidator', 0) >= 0) {
            return 'email';
        }
        return 'text';
    }
}
