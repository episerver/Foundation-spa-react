import React, { ReactNode, CSSProperties } from 'react';
import {Helmet} from 'react-helmet';
import { Components, Tracking } from '@episerver/spa-core';
import BaseStandardPageData from 'app/Models/Content/StandardPageData';

import './StandardPage.scss';

interface StandardPageData extends BaseStandardPageData {
    name: string
}

export default class StandardPage extends Components.Page<StandardPageData>
{
    protected pageType = Tracking.PageType.Other;

    public render(): Array<ReactNode> {
        //console.log(this.props.data);
        //<div dangerouslySetInnerHTML={ this.htmlObject(this.props.data.mainBody.value) }></div>
        return [
            <Helmet key="page-helmet">
                <title>{ this.props.data.metaTitle.value ? this.props.data.metaTitle.value : this.props.data.name } :: Mosey Capital</title>
            </Helmet>,
            <div className="standardpage-bg" key="standardpage-background-container">
                <Components.EpiserverContent context={ this.props.context } contentLink={ this.props.data.pageImage.value } expandedValue={ this.props.data.pageImage.expandedValue } className="w-100"/>
               
                <div className="overlay w-100" style={ this.getBlockStyles() }></div>
            </div>,
            <div className="container standardpage-container pt-3 bg-white" key="standardpage-container">
                <div className="row">
                    <div className="col">
                        <h1><Components.Property iContent={this.props.data} field="name" context={this.props.context} /></h1>
                        <Components.Property iContent={this.props.data} field="mainBody" context={this.props.context} />
                    </div>
                </div>
                <Components.ContentArea context={ this.props.context } data={ this.props.data.mainContentArea } />
            </div>,
        ]
    } 
    protected getBlockStyles() : CSSProperties
    {
        return {
            "backgroundColor": this.props.data.backgroundColor?.value || "transparent",
            "opacity": this.props.data.backgroundOpacity?.value || 1
        }
    }
}