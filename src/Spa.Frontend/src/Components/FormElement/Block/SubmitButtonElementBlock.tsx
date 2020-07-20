import React, { ReactNode, ReactNodeArray } from 'react';

import Property from '@episerver/spa-core/Components/Property';
import { ContentLinkService } from '@episerver/spa-core/Models/ContentLink';

import AbstractElementBlock from '../AbstractElementBlock';
import SubmitButtonElementBlockData from '../../../Models/Content/SubmitButtonElementBlockData';

export default class SubmitButtonElementBlock extends AbstractElementBlock<SubmitButtonElementBlockData>
{
    public render() : null | ReactNode | ReactNodeArray
    {
        let fieldId : string = `__field_${ContentLinkService.createApiId(this.props.data.contentLink)}`;
        let fieldName : string = fieldId;
        let fieldInfoId : string = `${ fieldId }_Description`;

        return <div className="form-group">
            <input type={ this.getFieldType() } id={ fieldId } name={ fieldName } className="btn btn-primary" aria-describedby={ fieldInfoId } />
            <small id={ fieldInfoId } className="form-text text-muted"><Property iContent={this.props.data} field="description" context={ this.getContext() }/></small>
        </div>
    }

    protected getFieldType() : string
    {
        return 'submit';
    }
}