import React, { ReactNode } from 'react';
import {Helmet} from "react-helmet";
import Page, { PageType } from 'Episerver/Page';
import ContentArea from 'Episerver/Components/ContentArea';
import CmsHomePageData from 'app/Models/Content/CmsHomePageData';

export default class CmsHomePage extends Page<CmsHomePageData> {
    protected pageType = PageType.Home;

    public render() : Array<ReactNode> {
        return [
            <ContentArea key="topContentArea" context={ this.props.context} data={ this.props.data.topContentArea } propertyName="topContentArea" addContainer/>,
            <ContentArea key="mainContentArea" context={ this.props.context } data={ this.props.data.mainContentArea } propertyName="mainContentArea" addContainer/>,
            <ContentArea key="bottomContentArea" context={ this.props.context } data={ this.props.data.bottomContentArea } propertyName="bottomContentArea" addContainer/>
        ];
    }
}