import React, { ReactNode, CSSProperties } from 'react';
import {Helmet} from 'react-helmet';
import { Components, Tracking, Taxonomy } from '@episerver/spa-core';
import BaseStandardPageData from 'app/Models/Content/StandardPageData';

import './StandardPage.scss';

interface StandardPageData extends BaseStandardPageData {
    name: string
}

export default class StandardPage extends Components.Page<StandardPageData>
{
    protected pageType = Tracking.PageType.Other;

    public render(): Array<ReactNode> {
        const pageTitle = Taxonomy.Property.readPropertyValue(this.props.data, "metaTitle") || Taxonomy.Property.readPropertyValue(this.props.data, "name") || "Optimizely Content Cloud";
        const pageDescription = Taxonomy.Property.readPropertyValue(this.props.data, "pageDescription");

        return [
            <Helmet key="page-helmet">
                <title>{ pageTitle }</title>
                <meta name="description" content={ pageDescription } />
            </Helmet>,
            <div className="standardpage-bg" key="standardpage-background-container">
                <Components.EpiserverContent contentLink={ this.props.data.pageImage } className="w-100"/>
                <div className="overlay w-100"></div>
            </div>,
            <div className="container standardpage-container pt-3 bg-white rounded" key="standardpage-container">
                <div className="row">
                    <div className="col">
                        <h1><Components.Property iContent={this.props.data} field="name" /></h1>
                        <Components.Property iContent={this.props.data} field="mainBody" />
                    </div>
                </div>
                <Components.ContentArea data={ this.props.data.mainContentArea } propertyName="mainContentArea" />
            </div>,
        ]
    } 
    protected getBlockStyles() : CSSProperties
    {
        return {
            "backgroundColor": Taxonomy.Property.readPropertyValue(this.props.data, "backgroundColor") || "transparent",
            "opacity": Taxonomy.Property.readPropertyValue(this.props.data, "backgroundOpacity") || 1
        }
    }
}