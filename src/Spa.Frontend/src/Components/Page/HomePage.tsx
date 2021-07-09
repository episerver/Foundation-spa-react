import React, { FunctionComponent as FC } from 'react';
import Helmet from 'react-helmet';
import { Components, usePropertyReader } from '@episerver/spa-core';
import { HomePageProps } from '../../Models/Content/HomePageData';

export const HomePage : FC<HomePageProps> = (props) =>
{
    const read = usePropertyReader();
    let title = read(props.data, "metaTitle") || read(props.data, "name");
    return <div className="home-page">
        <Helmet>
            <title>{ title }</title>
            <meta name="description" content={ read(props.data, "pageDescription") || "" } />
        </Helmet>
        <Components.ContentArea data={ props.data.topContentArea } propertyName="topContentArea" addContainer />
        <Components.ContentArea data={ props.data.mainContentArea } propertyName="mainContentArea" addContainer />
        <Components.ContentArea data={ props.data.bottomContentArea } propertyName="bottomContentArea" addContainer />
    </div>
}
export default HomePage;