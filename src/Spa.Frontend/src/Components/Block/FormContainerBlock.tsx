import React from 'react';

import { Components, useEpiserver } from '@episerver/spa-core';

import { FormContainerBlockProps } from 'app/Models/Content/FormContainerBlockData';
import './FormContainerBlock.scss';

export const FormContainerBlock : React.FunctionComponent<FormContainerBlockProps> = (props) => {
    const ctx = useEpiserver();
    let supportNotice = null;
    if (ctx.isDebugActive()) 
        supportNotice = <div className="alert alert-warning">Episerver Forms support is experimental and incomplete!</div>;

    return <div className="episerver-form">
        { supportNotice }
        <h3><Components.Property iContent={ props.data } field="title" /></h3>
        <p><Components.Property iContent={ props.data } field="description" /></p>
        <form>
            <Components.ContentArea data={ props.data.elementsArea } propertyName="elementsArea" context={ ctx } itemContentType="FormElement" noWrap />
        </form>
    </div>
}
export default FormContainerBlock;
