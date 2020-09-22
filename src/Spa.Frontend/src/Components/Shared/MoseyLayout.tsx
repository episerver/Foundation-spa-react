import React, { ReactNode } from 'react';
import { Helmet } from 'react-helmet';

import Layout from '@episerver/spa-core/Components/Layout';
import EpiComponent from '@episerver/spa-core/Components/EpiComponent';
import IContent from '@episerver/spa-core/Models/IContent';
import { StringProperty, BooleanProperty, ContentReferenceProperty } from '@episerver/spa-core/Property';
import { ContentLinkService } from '@episerver/spa-core/Models/ContentLink';

import Header, { ConnectedHeader } from 'app/Components/Shared/Header';
import Footer, { ConnectedFooter } from 'app/Components/Shared/Footer';
import CmsHomePageData from 'app/Models/Content/CmsHomePageData';

interface FoundationPageData extends IContent
{
    metaTitle: StringProperty
    keywords: StringProperty
    metaContentType: StringProperty
    disableIndexing: BooleanProperty
    pageDescription: StringProperty
    pageImage: ContentReferenceProperty
}

/**
 * The MoseyLayout defines both the dynamic HTML Head properties for server & client side
 * rendering (SEO!!) and wraps the content with a shared header & footer.
 */
export default class MoseyLayout extends Layout
{
    renderLayout() : Array<ReactNode> | ReactNode | null
    {
        // We are referencing the EpiComponent directly, so have to use the factory method to get the 
        // appropriate type.
        const CmsComponent = EpiComponent.CreateComponent(this.props.context);
        if (!this.isPage())
        {
            return <CmsComponent context={ this.props.context } contentLink={this.props.page} expandedValue={this.props.expandedValue} key={`website-body`} actionName={this.props.actionName} actionData={this.props.actionData} />;
        }
        if (this.props.page) {
            let page : Array<ReactNode> = [];
            let pageData = this.props.expandedValue as FoundationPageData;

            // Header & Footer are custom components, so we need to check manually which version is
            // needed. The connected version will ensure on-page-editing will work correctly.
            const FooterComponent = this.props.context.isServerSideRendering() ? Footer : ConnectedFooter;
            const HeaderComponent = this.props.context.isServerSideRendering() ? Header : ConnectedHeader;

            page.push(<Helmet key={`website-helmet`}>
                <title>{this.getCurrentPageTitle(pageData) + ' :: Mosey Capital'}</title>
                <meta name="description" content={ this.getCurrentPageDescription(pageData) } />
                <meta property="og:title" content={ this.getCurrentPageTitle(pageData) } />
                <meta property="og:image" content={ this.getCurrentPageImageUrl(pageData) } />
                <meta property="og:description" content={ this.getCurrentPageDescription(pageData) } />
                <link rel="canonical" href={ this.getCurrentPageCanonical(pageData) } />
                <link rel="shortcut icon" href="/Spa/favicon.ico" type="image/x-icon" />
            </Helmet>);
            page.push(<HeaderComponent context={this.props.context} path={this.props.path} startPage={this.props.startPage as CmsHomePageData } key={`website-header`} />);
            page.push(<CmsComponent context={ this.props.context } contentLink={this.props.page} expandedValue={this.props.expandedValue} key={`website-body`} actionName={this.props.actionName} actionData={this.props.actionData} />);
            page.push(<FooterComponent context={ this.props.context } startPage={ this.props.startPage as CmsHomePageData } key='website-footer'/>);
            return page;
        }
        if (this.props.context.isDebugActive()) {
            console.warn('No main content link provided to layout', this.props);
        }
        return null;
    }

    protected isPage() {
        return this.props.expandedValue.contentType[0] == 'Page';
    }

    protected getCurrentPageTitle(page: FoundationPageData)
    {
        return page.metaTitle?.value || (typeof(page.name) == "string" ? page.name : (page.name as StringProperty)?.value);
    }

    protected getCurrentPageDescription(page: FoundationPageData)
    {
        return page.pageDescription?.value || "";
    }

    protected getCurrentPageCanonical(page: FoundationPageData)
    {
        return ContentLinkService.createHref(page);
    }

    protected getCurrentPageImageUrl(page: FoundationPageData)
    {
        if (page.pageImage) {
            return ContentLinkService.createHref(page.pageImage.value);
        }
        return '';
    }
}