import React from 'react';
import { Components } from '@episerver/spa-core';
import { HomePageProps } from '../../Models/Content/HomePageData';

export const HomePage : React.FunctionComponent<HomePageProps> = (props) =>
{
    return <div className="home-page">
        <Components.ContentArea data={ props.data.topContentArea } propertyName="topContentArea" addContainer />
        <Components.ContentArea data={ props.data.mainContentArea } propertyName="mainContentArea" addContainer />
        <Components.ContentArea data={ props.data.bottomContentArea } propertyName="bottomContentArea" addContainer />
    </div>
}
export default HomePage;