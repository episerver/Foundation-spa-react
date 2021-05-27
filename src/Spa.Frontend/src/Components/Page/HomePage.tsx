import React from 'react';
import Helmet from 'react-helmet';
import { Components } from '@episerver/spa-core';
import { HomePageProps } from '../../Models/Content/HomePageData';

export const HomePage : React.FunctionComponent<HomePageProps> = (props) =>
{
    let title : string = props.data?.metaTitle?.value || (typeof(props.data?.name) === 'string' ? props.data.name : props.data?.name?.value);
    return <div className="home-page">
        <Helmet>
            <title>{ title }</title>
            <meta name="description" content={ props.data?.pageDescription?.value || "" } />
        </Helmet>
        <Components.ContentArea data={ props.data.topContentArea } propertyName="topContentArea" addContainer />
        <Components.ContentArea data={ props.data.mainContentArea } propertyName="mainContentArea" addContainer />
        <Components.ContentArea data={ props.data.bottomContentArea } propertyName="bottomContentArea" addContainer />
    </div>
}
export default HomePage;