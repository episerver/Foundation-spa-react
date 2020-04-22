import React, { ReactNode, ReactNodeArray } from 'react';

import EpiComponent from 'Episerver/EpiComponent';
import Property from 'Episerver/Components/Property';
import ContentArea from 'Episerver/Components/ContentArea';
import FormRenderingService, { ContentApiFormModel } from 'EPiServer.ContentApi.Forms/FormRenderingService';

import BaseFormContainerBlockData from 'app/Models/Content/FormContainerBlockData';
import './FormContainerBlock.scss';

interface FormContainerBlockData extends BaseFormContainerBlockData {
    name: string
    formModel?: ContentApiFormModel
}

export default class FormContainerBlock extends EpiComponent<FormContainerBlockData> {
    private _container : HTMLElement;

    componentDidMount()
    {
        console.log(this.props.data);
        if (this._container && this.props.data.formModel) {
            try {
                FormRenderingService.render(this.props.data.formModel, this._container);
            } catch (e) {
                if (this.isDebugActive()) {
                    console.error("Form error:", e);
                }
                this._container.innerHTML=`<div class="alert alert-danger" role="alert">Error rendering form: ${e}</div>`;
            }
        } else {
            if (this.isDebugActive()) console.info("Could not embed the Episerver form.");
        }
    }

    render() : ReactNode | ReactNodeArray
    {
        return <div className="form-container" ref={container => this._container = container}></div>

        //Render using React - Not yet supported by ContentDeliveryAPI
        return <div className="episerver-form">
            <h3><Property context={ this.getContext() } iContent={ this.props.data } property="title" /></h3>
            <p><Property context={ this.getContext() } iContent={ this.props.data } property="description" /></p>
            <form>
                <ContentArea data={ this.props.data.elementsArea } propertyName="elementsArea" context={ this.getContext() } itemContentType="FormElement" noWrap />
            </form>
        </div>
    }
}