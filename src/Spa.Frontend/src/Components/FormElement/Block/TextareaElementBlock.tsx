import React, { ReactNode, ReactNodeArray } from 'react';
import Property from '@episerver/spa-core/Components/Property';
import { ContentLinkService } from '@episerver/spa-core/Models/ContentLink';
import TextareaElementBlockData from 'app/Models/Content/TextareaElementBlockData';
import AbstractElementBlock from 'app/Components/FormElement/AbstractElementBlock';

export default class TextareaElementBlock extends AbstractElementBlock<TextareaElementBlockData>
{
    public render() : null | ReactNode | ReactNodeArray
    {
        let fieldId : string = `__field_${ContentLinkService.createApiId(this.props.data.contentLink)}`;
        let fieldName : string = fieldId;
        let fieldInfoId : string = `${ fieldId }_Description`;

        return <div className="form-group">
            <label htmlFor={ fieldId }><Property iContent={this.props.data} field="label" context={ this.getContext() }/></label>
            <textarea id={ fieldId } name={ fieldName } className="form-control" placeholder={ this.props.data.placeHolder?.value } aria-describedby={ fieldInfoId }>
            </textarea>
            <small id={ fieldInfoId } className="form-text text-muted"><Property iContent={this.props.data} field="description" context={ this.getContext() }/></small>
        </div>
    }
}
