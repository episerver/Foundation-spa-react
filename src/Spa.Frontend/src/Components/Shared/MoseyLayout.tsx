import React, { ReactNode } from 'react';
import {Helmet} from 'react-helmet';
import Layout from 'episerver/Components/Layout';
import CmsComponent from 'episerver/Components/CmsComponent';
import Header from 'app/Components/Shared/Header';
import Footer from 'app/Components/Shared/Footer';
import CmsHomePageData from 'app/Models/Content/CmsHomePageData';
import IContent from 'episerver/Models/IContent';
import { StringProperty, BooleanProperty, ContentReferenceProperty } from 'episerver/Property';
import { ContentLinkService } from 'episerver/Models/ContentLink';

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
        if (!this.isPage())
        {
            return <CmsComponent context={ this.props.context } contentLink={this.props.page} expandedValue={this.props.expandedValue} key={`website-body`} actionName={this.props.actionName} actionData={this.props.actionData} />;
        }
        if (this.props.page) {
            let page : Array<ReactNode> = [];
            let pageData = this.props.expandedValue as FoundationPageData;
            page.push(<Helmet key={`website-helmet`}>
                <title>{this.getCurrentPageTitle(pageData) + ' :: Mosey Capital'}</title>
                <meta name="description" content={ this.getCurrentPageDescription(pageData) } />
                <meta property="og:title" content={ this.getCurrentPageTitle(pageData) } />
                <meta property="og:image" content={ this.getCurrentPageImageUrl(pageData) } />
                <meta property="og:description" content={ this.getCurrentPageDescription(pageData) } />
                <link rel="canonical" href={ this.getCurrentPageCanonical(pageData) } />
                <link rel="shortcut icon" href="/Spa/favicon.ico" type="image/x-icon" />
            </Helmet>);
            page.push(<Header context={this.props.context} path={this.props.path} startPage={this.props.startPage as CmsHomePageData } key={`website-header`} />);
            page.push(<CmsComponent context={ this.props.context } contentLink={this.props.page} expandedValue={this.props.expandedValue} key={`website-body`} actionName={this.props.actionName} actionData={this.props.actionData} />);
            page.push(<Footer context={ this.props.context } startPage={ this.props.startPage as CmsHomePageData } key='website-footer'/>);
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
        return ContentLinkService.createHref(page.pageImage.value);
    }
}