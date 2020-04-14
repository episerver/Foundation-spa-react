import React, { Component, ReactNode, ReactNodeArray } from 'react';
import CmsHomePageData from 'app/Models/Content/CmsHomePageData';
import ContentArea from 'Episerver/Components/ContentArea';
import { IEpiserverSpaContext } from 'Episerver/Spa';

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
        let links : ReactNodeArray = [];
        let socialLinks : ReactNodeArray = [];

        try {
            links = this.props.startPage.links.value.map(link => {
                let uri : string = link.href.substr(0,5) == 'http:' ? 'https' + link.href.substr(4) : link.href;
                return <a className="nav-item" href={ uri } title={ link.title } target={ link.target } key={ "footer-link-"+link.href }>{ link.text}</a>
            });
        } catch (e) { 
            //Intentionally ignored
        }
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
                        <p className="h4">{ this.props.startPage.introduction.value }</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-lg-4">
                        <h3 className="h5 text-uppercase">{ this.props.startPage.companyHeader.value }</h3>
                        <dl className="row">
                            <dt className="col-3">Phone:</dt>
                            <dd className="col-9">{ this.props.startPage.companyPhone.value }</dd>
                            <dt className="col-3">Email:</dt>
                            <dd className="col-9">{ this.props.startPage.companyEmail.value }</dd>
                        </dl>
                        <p>{ this.props.startPage.companyAddress.value }</p>
                    </div>
                    <div className="col-6 col-lg-2">
                        <h3 className="h5 text-uppercase">{ this.props.startPage.linksHeader.value }</h3>
                        <nav className="nav flex-column">
                            { links }
                        </nav>
                    </div>
                    <div className="col-6 col-lg-2">
                        <h3 className="h5 text-uppercase">Follow us</h3>
                        <nav className="nav flex-column">
                            { socialLinks }
                        </nav>
                    </div>
                    <div className="col-12 col-lg-4">
                        <ContentArea context={ this.props.context } data={ this.props.startPage.contentArea } noWrap={ true } />
                    </div>
                </div>
                <div className="row">
                    <div className="col my-3"><p className="font-weight-lighter">&copy; <span>{ (new Date()).getFullYear() }</span> <span>{ this.props.startPage.footerCopyrightText.value }</span></p></div>
                </div>
            </div>
        </footer>;
    }
}