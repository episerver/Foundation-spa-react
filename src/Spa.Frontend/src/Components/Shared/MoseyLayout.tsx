import React, { ReactNode } from 'react';
import Helmet from 'react-helmet';
import Layout from 'Episerver/Components/Layout';
import CmsComponent from 'Episerver/Components/CmsComponent';
import Header from 'app/Components/Shared/Header';
import Footer from 'app/Components/Shared/Footer';
import CmsHomePageData from 'app/Models/Content/CmsHomePageData';

export default class MoseyLayout extends Layout
{
    renderLayout() : Array<ReactNode> | ReactNode | null
    {
        if (this.props.context.isDebugActive()) { console.debug('Rendering Mosey Layout'); }
        if (this.props.page) {
            let page : Array<ReactNode> = [];
            let name = this.props.expandedValue && this.props.expandedValue.name ? this.props.expandedValue.name : "";
            page.push(<Helmet key={`website-helmet`}><title>{name + ' :: Mosey Capital'}</title></Helmet>);
            page.push(<Header context={this.props.context} path={this.props.path} startPage={this.props.startPage as CmsHomePageData } key={`website-header`} />);
            page.push(<CmsComponent context={ this.props.context } contentLink={this.props.page} expandedValue={this.props.expandedValue} key={`website-body`} actionName={this.props.actionName} actionData={this.props.actionData} />);
            page.push(<Footer context={this.props.context} startPage={this.props.startPage as CmsHomePageData } key={`website-footer`} />);
            return page;
        }
        if (this.props.context.isDebugActive()) {
            console.warn('No main content link provided to layout', this.props);
        }
        return null;
    }
}