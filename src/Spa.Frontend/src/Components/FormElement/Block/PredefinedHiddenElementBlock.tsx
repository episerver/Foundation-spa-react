
import React, { ReactNode, ReactNodeArray } from 'react';

import { Services } from '@episerver/spa-core';

import AbstractElementBlock from '../AbstractElementBlock';
import PredefinedHiddenElementBlockData from '../../../Models/Content/PredefinedHiddenElementBlockData';

export default class PredefinedHiddenElementBlock extends AbstractElementBlock<PredefinedHiddenElementBlockData>
{
    public render() : null | ReactNode | ReactNodeArray
    {
        let fieldId : string = `__field_${Services.ContentLink.createApiId(this.props.data.contentLink)}`;
        let fieldName : string = fieldId;

        return <input type="hidden" id={ fieldId } name={ fieldName } value={ this.props.data.predefinedValue.value } />
    }
}