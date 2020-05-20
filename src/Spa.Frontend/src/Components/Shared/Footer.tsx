import React, { Component, ReactNode, ReactNodeArray } from 'react';
import { connect } from 'react-redux';
import Property from 'episerver/Components/Property';
import ContentArea from 'episerver/Components/ContentArea';
import EpiContext, { IEpiserverSpaContext } from 'episerver/Spa';

import CmsHomePageData from 'app/Models/Content/CmsHomePageData';
import { ContentLinkService } from 'episerver/Models/ContentLink';

export interface FooterProps {
    startPage: CmsHomePageData
    context: IEpiserverSpaContext
}
interface FooterState{}

export default class Footer extends Component<FooterProps, FooterState> {
    constructor(props: FooterProps)
    {
        super(props);
    }

    htmlObject(htmlValue : string) : any
    {
        return {
            __html: htmlValue
        };
    }

    shouldComponentUpdate(nextProps: Readonly<FooterProps>, nextState: Readonly<FooterState>, nextContext: any) : boolean
    {
        var needsUpdate = (nextProps.startPage.contentLink.id !== this.props.startPage.contentLink.id);
        return needsUpdate;
    }

    render() : ReactNode
    {
        let socialLinks : ReactNodeArray = [];
        
        try {
            socialLinks = this.props.startPage.socialLinks.value.map(link => {
                let uri : string = link.href.substr(0,5) == 'http:' ? 'https' + link.href.substr(4) : link.href;
                return <a className="nav-item" href={ uri } title={ link.title } target={ link.target } key={ "social-link-"+link.href}>{ link.text }</a>
            });
        } catch (e) { 
            //Intentionally ignored
        }

        return <footer className="border-top mt-5">
            <div className="container">
                <div className="row">
                    <div className="col text-center mt-4 mb-3">
                        <p className="h4"><Property iContent={ this.props.startPage } propName="introduction" context={ this.props.context }/></p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-lg-4">
                        <h3 className="h5 text-uppercase"><Property iContent={ this.props.startPage } propName="companyHeader" context={ this.props.context }/></h3>
                        <dl className="row">
                            <dt className="col-3">Phone:</dt>
                            <dd className="col-9"><Property iContent={ this.props.startPage } propName="companyPhone" context={ this.props.context }/></dd>
                            <dt className="col-3">Email:</dt>
                            <dd className="col-9"><Property iContent={ this.props.startPage } propName="companyEmail" context={ this.props.context }/></dd>
                        </dl>
                        <p><Property iContent={ this.props.startPage } propName="companyAddress" context={ this.props.context }/></p>
                    </div>
                    <div className="col-6 col-lg-2">
                        <h3 className="h5 text-uppercase"><Property iContent={ this.props.startPage } propName="linksHeader" context={ this.props.context }/></h3>
                        { this.renderLinks() }
                    </div>
                    <div className="col-6 col-lg-2">
                        <h3 className="h5 text-uppercase"><Property iContent={ this.props.startPage } propName="socialHeader" context={ this.props.context }/></h3>
                        { this.renderSocialLinks() }
                    </div>
                    <div className="col-12 col-lg-4">
                        { this.renderContentArea() }
                    </div>
                </div>
                <div className="row">
                    <div className="col my-3"><p className="font-weight-lighter">&copy; <span>{ (new Date()).getFullYear() }</span> <span><Property iContent={ this.props.startPage } propName="footerCopyrightText" context={ this.props.context }/></span></p></div>
                </div>
            </div>
        </footer>;
    }

    protected renderLinks()
    {
        let links : ReactNodeArray = [];
        try {
            links = this.props.startPage.links.value.map(link => {
                let uri : string = link.href.substr(0,5) == 'http:' ? 'https' + link.href.substr(4) : link.href;
                return <a className="nav-item" href={ uri } title={ link.title } target={ link.target } key={ "footer-link-"+link.href }>{ link.text}</a>
            });
        } catch (e) { 
            //Intentionally ignored
        }
        let props : any = {
            className: 'nav flex-column',
            children: links
        }
        if (this.isEditable() && this.currentPageIsStartPage()) {
            props['data-epi-edit'] = 'links';
        }
        return React.createElement('nav', props);
    }

    protected renderSocialLinks()
    {
        let links : ReactNodeArray = [];
        try {
            links = this.props.startPage.socialLinks.value.map(link => {
                let uri : string = link.href.substr(0,5) == 'http:' ? 'https' + link.href.substr(4) : link.href;
                return <a className="nav-item" href={ uri } title={ link.title } target={ link.target } key={ "footer-link-"+link.href }>{ link.text}</a>
            });
        } catch (e) { 
            //Intentionally ignored
        }
        let props : any = {
            className: 'nav flex-column',
            children: links
        }
        if (this.isEditable() && this.currentPageIsStartPage()) {
            props['data-epi-edit'] = 'socialLinks';
        }
        return React.createElement('nav', props);
    }

    protected renderContentArea()
    {
        let props : any = {
            context: this.props.context,
            data: this.props.startPage.contentArea,
            noWrap: true
        }
        if (this.currentPageIsStartPage()) {
            props['propertyName'] = 'contentArea';
        }
        return React.createElement(ContentArea, props);
    }

    protected isEditable()
    {
        return this.props.context.isEditable();
    }

    protected currentPageIsStartPage()
    {
        let routedId = ContentLinkService.createApiId(this.props.context.getRoutedContent());
        let startPageId = ContentLinkService.createApiId(this.props.startPage.contentLink);
        return routedId == startPageId;
    }
}

/**
 * Helper intrface to describe the static side of the Footer component
 */
export interface FooterType {
	new (props : FooterProps) : Footer
}