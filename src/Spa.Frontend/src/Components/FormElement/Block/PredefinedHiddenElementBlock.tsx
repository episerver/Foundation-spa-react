
import React, { ReactNode, ReactNodeArray } from 'react';

import { Services, Taxonomy } from '@episerver/spa-core';

import AbstractElementBlock from '../AbstractElementBlock';
import PredefinedHiddenElementBlockData from '../../../Models/Content/PredefinedHiddenElementBlockData';

export default class PredefinedHiddenElementBlock extends AbstractElementBlock<PredefinedHiddenElementBlockData>
{
    public render() : null | ReactNode | ReactNodeArray
    {
        const fieldId : string = `__field_${Services.ContentLink.createApiId(this.props.data.contentLink)}`;
        const fieldName : string = fieldId;
        const defaultValue = Taxonomy.Property.readPropertyValue(this.props.data, "predefinedValue");

        return <input type="hidden" id={ fieldId } name={ fieldName } value={ defaultValue } />
    }
}