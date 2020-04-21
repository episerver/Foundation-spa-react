import React, { ReactNode, ReactNodeArray } from 'react';

import EpiComponent from 'Episerver/EpiComponent';
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
        if (this._container) {
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
    }
}