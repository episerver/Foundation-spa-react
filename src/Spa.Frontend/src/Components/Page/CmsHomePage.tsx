import React, { ReactNode } from 'react';
import { Components, Tracking } from '@episerver/spa-core';
import CmsHomePageData from 'app/Models/Content/CmsHomePageData';

export default class CmsHomePage extends Components.Page<CmsHomePageData> {
    protected pageType = Tracking.PageType.Home;

    public render() : Array<ReactNode> {
        return [
            <Components.ContentArea key="topContentArea" context={ this.props.context} data={ this.props.data.topContentArea } propertyName="topContentArea" addContainer/>,
            <Components.ContentArea key="mainContentArea" context={ this.props.context } data={ this.props.data.mainContentArea } propertyName="mainContentArea" addContainer/>,
            <Components.ContentArea key="bottomContentArea" context={ this.props.context } data={ this.props.data.bottomContentArea } propertyName="bottomContentArea" addContainer/>
        ];
    }
}