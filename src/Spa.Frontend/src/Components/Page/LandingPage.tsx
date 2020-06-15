import React, { ReactNode, ReactNodeArray } from 'react';
import {Helmet} from 'react-helmet';

import ContentArea from '@episerver/spa-core/Components/ContentArea';
import Property from '@episerver/spa-core/Components/Property';
import Page, { PageType } from '@episerver/spa-core/Page';

import LandingPageData from 'app/Models/Content/LandingPageData';

export default class LandingPage extends Page<LandingPageData>
{
    protected pageType = PageType.Other;

    public render() : null | ReactNode | ReactNodeArray
    {
        return [
            <Helmet key="landingpage-helmet"></Helmet>,
            <div className="container pt-3" key="landingpage-container">
                <div className="row">
                    <div className="col-12">
                        <h1><Property iContent={ this.props.data } field="name" context={ this.getContext() } /></h1>
                    </div>
                </div>
                <ContentArea context={ this.getContext() } data={ this.props.data.topContentArea } propertyName="topContentArea" />
                <div className="row">
                    <Property iContent={ this.props.data } field="mainBody" context={ this.getContext() } className="col-12" />
                </div>
                <ContentArea context={ this.getContext() } data={ this.props.data.mainContentArea } propertyName="mainContentArea" />
            </div>
        ];
    }
}