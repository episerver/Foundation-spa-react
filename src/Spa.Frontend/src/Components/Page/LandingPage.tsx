import React, { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import { Components, usePropertyReader } from '@episerver/spa-core';
import { LandingPageProps } from 'app/Models/Content/LandingPageData';

export const LandingPage : FunctionComponent<LandingPageProps> = (props) => {
    const read = usePropertyReader();
    return <div className="container pt-3" key="landingpage-container">
        <Helmet>
            <title>{ read(props.data, "metaTitle") || read(props.data, "name") }</title>
        </Helmet>
        <Components.Property iContent={ props.data } field="topContentArea" />
        <div className="row">
            <Components.Property iContent={ props.data } field="mainBody" className="col-12" />
        </div>
        <Components.Property iContent={ props.data } field="mainContentArea" />
    </div>;
}
export default LandingPage;