import React from 'react';
import { Components, ContentDelivery, useEpiserver } from '@episerver/spa-core';
import LayoutSettings from 'app/Models/Content/LayoutSettingsData';
import "./Footers.scss";

export type FooterProps = {
    settings: LayoutSettings
}

export const Footer : React.FunctionComponent<FooterProps> = (props) =>
{
    const ctx = useEpiserver();

    return <footer className="border-top mt-5">
        <div className="container">
            <div className="row">
                <div className="col text-center mt-4 mb-3">
                    <p className="h4"><Components.Property iContent={ props.settings } field="introduction" /></p>
                </div>
            </div>
            <div className="row">
                <CompanyAddressBlock { ...props } className="col-12 col-lg-4" />
                <LinksListBlock { ...props } className="col-6 col-lg-2" listProp="links" titleProp="linksHeader" />
                <LinksListBlock { ...props } className="col-6 col-lg-2" listProp="socialLinks" titleProp="socialHeader" />
                <div className="col-12 col-lg-4">
                    <Components.ContentArea context={ ctx } data={ props.settings.contentArea } noWrap />
                </div>
            </div>
            <div className="row">
                <div className="col my-3"><p className="font-weight-lighter">&copy; <span>{ (new Date()).getFullYear() }</span> <span><Components.Property iContent={ props.settings } field="footerCopyrightText" /></span></p></div>
            </div>
        </div>
    </footer>
}
export default Footer;

type LinksListBlockProps = FooterProps & {
    className?: string,
    titleProp: keyof LayoutSettings,
    listProp: keyof LayoutSettings
}

const LinksListBlock : React.FunctionComponent<LinksListBlockProps> = (props) => {

    const transformLink = (link: ContentDelivery.LinkProperty) => {
        const url = new URL(link.href);
        let offDomain : boolean = true;
        try {
            if (window.location.protocol !== url.protocol && window.location.host === url.host) url.protocol = window.location.protocol;
            offDomain = window.location.host !== url.host
        } catch (e) {
            // Ignored on purpose
        }
        const linkProps : React.AnchorHTMLAttributes<HTMLAnchorElement> & { key: string } = {
            title: link.title,
            target: link.target,
            className: "nav-item",
            href: url.href,
            key: `footer.${ props.listProp }.link.${ link.contentLink?.id || link.href }`
        }
        if (offDomain) {
            linkProps.rel = "noreferrer"
        }
        return <a { ...linkProps }>{link.text}</a>
    }

    const links : JSX.Element[] = [];
    (props.settings[props.listProp] as ContentDelivery.LinkListProperty)?.value.forEach(x => links.push(transformLink(x)));

    return <div className={ props.className }>
        <p className="h5 footer__heading"><Components.Property iContent={ props.settings } field={ props.titleProp }/></p>
        <nav className="nav flex-column">
            { links }
        </nav>
    </div>
}

const CompanyAddressBlock : React.FunctionComponent<FooterProps & { className ?: string }> = (props) => {
    return <div className={ props.className }>
        <p className="h5 footer__heading"><Components.Property iContent={ props.settings } field="companyHeader"/></p>
        <dl className="row">
            <dt className="col-3">Phone:</dt>
            <dd className="col-9"><Components.Property iContent={ props.settings } field="companyPhone"/></dd>
            <dt className="col-3">Email:</dt>
            <dd className="col-9"><Components.Property iContent={ props.settings } field="companyEmail"/></dd>
        </dl>
        <p><Components.Property iContent={ props.settings } field="companyAddress"/></p>
    </div>
}