import React, { Component, ReactNode, ReactNodeArray } from 'react';
import { connect } from 'react-redux';
import { merge } from 'lodash';
import { Core, Components } from '@episerver/spa-core';

import CmsHomePageData from 'app/Models/Content/CmsHomePageData';

interface FooterProps {
    startPage: CmsHomePageData
    context: Core.IEpiserverContext
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

        const StartPageProperty : Components.PropertyComponent<CmsHomePageData> = (props) => Components.Property(props);

        return <footer className="border-top mt-5">
            <div className="container">
                <div className="row">
                    <div className="col text-center mt-4 mb-3">
                        <p className="h4"><StartPageProperty iContent={ this.props.startPage } field="introduction" /></p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-lg-4">
                        <h3 className="h5 text-uppercase"><StartPageProperty iContent={ this.props.startPage } field="companyHeader"/></h3>
                        <dl className="row">
                            <dt className="col-3">Phone:</dt>
                            <dd className="col-9"><StartPageProperty iContent={ this.props.startPage } field="companyPhone"/></dd>
                            <dt className="col-3">Email:</dt>
                            <dd className="col-9"><StartPageProperty iContent={ this.props.startPage } field="companyEmail"/></dd>
                        </dl>
                        <p><StartPageProperty iContent={ this.props.startPage } field="companyAddress"/></p>
                    </div>
                    <div className="col-6 col-lg-2">
                        <h3 className="h5 text-uppercase"><StartPageProperty iContent={ this.props.startPage } field="linksHeader"/></h3>
                        { this.renderLinks() }
                    </div>
                    <div className="col-6 col-lg-2">
                        <h3 className="h5 text-uppercase"><StartPageProperty iContent={ this.props.startPage } field="socialHeader"/></h3>
                        { this.renderSocialLinks() }
                    </div>
                    <div className="col-12 col-lg-4">
                        { this.renderContentArea() }
                    </div>
                </div>
                <div className="row">
                    <div className="col my-3"><p className="font-weight-lighter">&copy; <span>{ (new Date()).getFullYear() }</span> <span><StartPageProperty iContent={ this.props.startPage } field="footerCopyrightText" /></span></p></div>
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
        return React.createElement(Components.ContentArea, props);
    }

    protected isEditable()
    {
        return this.props.context.isEditable();
    }

    protected currentPageIsStartPage()
    {
        return false;
        /*let routedId = Services.ContentLink.createApiId(this.props.context.getRoutedContent());
        let startPageId = Services.ContentLink.createApiId(this.props.startPage.contentLink);
        return routedId == startPageId;*/
    }
}

/**
 * Helper intrface to describe the static side of the Footer component
 */
export interface FooterType {
	new (props : FooterProps) : Footer
}

export const ConnectedFooter : FooterType = (connect((state: any, ownProps: FooterProps) => {
    try {
        const contentId = state.iContentRepo.refs['startPage'];
        const content = state.iContentRepo.items[contentId].content;
        const footerProps : FooterProps = merge({}, ownProps);
        footerProps.startPage = content;
        return footerProps;
    } catch (e) {}
    return ownProps;
})(Footer)) as unknown as FooterType;