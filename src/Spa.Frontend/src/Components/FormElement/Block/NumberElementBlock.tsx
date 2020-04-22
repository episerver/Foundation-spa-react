import React, { ReactNode, ReactNodeArray } from 'react';
import Property from 'Episerver/Components/Property';
import { ContentLinkService } from 'Episerver/Models/ContentLink';
import NumberElementBlockData from 'app/Models/Content/NumberElementBlockData';
import AbstractElementBlock from 'app/Components/FormElement/AbstractElementBlock';

export default class NumberElementBlock extends AbstractElementBlock<NumberElementBlockData>
{
    public render() : null | ReactNode | ReactNodeArray
    {
        let fieldId : string = `__field_${ContentLinkService.createApiId(this.props.data.contentLink)}`;
        let fieldName : string = fieldId;
        let fieldInfoId : string = `${ fieldId }_Description`;

        return <div className="form-group">
            <label htmlFor={ fieldId }><Property iContent={this.props.data} property="label" context={ this.getContext() }/></label>
            <input type={ this.getFieldType() } id={ fieldId } name={ fieldName } className="form-control" placeholder={ this.props.data.placeHolder?.value } aria-describedby={ fieldInfoId } />
            <small id={ fieldInfoId } className="form-text text-muted"><Property iContent={this.props.data} property="description" context={ this.getContext() }/></small>
        </div>
    }

    protected getFieldType() : string
    {
        return 'number';
    }
}
