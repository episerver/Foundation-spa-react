import React, { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import { Components } from '@episerver/spa-core';
import { LandingPageProps } from 'app/Models/Content/LandingPageData';

export const LandingPage : FunctionComponent<LandingPageProps> = (props) => {
    return <div className="container pt-3" key="landingpage-container">
        <Helmet>
            <title>{ props.data.metaTitle?.value || props.data.name }</title>
        </Helmet>
        <Components.Property iContent={ props.data } field="topContentArea" />
        <div className="row">
            <Components.Property iContent={ props.data } field="mainBody" className="col-12" />
        </div>
        <Components.Property iContent={ props.data } field="mainContentArea" />
    </div>;
}
export default LandingPage;

/* Old Class Implementation
export default class LandingPage extends Components.Page<LandingPageData>
{
    protected pageType = Tracking.PageType.Other;

    public render() : null | ReactNode | ReactNodeArray
    {
        return [
            <Helmet key="landingpage-helmet"></Helmet>,
            <div className="container pt-3" key="landingpage-container">
                <div className="row">
                    <div className="col-12">
                        <Components.Property iContent={ this.props.data } field="name" />
                        <h1><Components.Property iContent={ this.props.data } field="name" context={ this.getContext() } /></h1>
                    </div>
                </div>
                <Components.ContentArea context={ this.getContext() } data={ this.props.data.topContentArea } propertyName="topContentArea" />
                <div className="row">
                    <Components.Property iContent={ this.props.data } field="mainBody" context={ this.getContext() } className="col-12" />
                </div>
                <Components.ContentArea context={ this.getContext() } data={ this.props.data.mainContentArea } propertyName="mainContentArea" />
            </div>
        ];
    }
}*/