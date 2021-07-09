import React, { useState, useEffect, FunctionComponent } from 'react';

//Import Episerver Libs
import { Components, useIContentRepository, Services, Taxonomy } from '@episerver/spa-core';
import useVisible from 'app/CoreComponents/Hooks/useVisible';

//Import App
import SiteSearchBox from './SiteSearchBox';
import LayoutSettings from 'app/Models/Content/LayoutSettingsData';

export type NavBarProps = {
    settings: LayoutSettings
}

export const NavBar : FunctionComponent<NavBarProps> = (props) => 
{
    const repo = useIContentRepository();
    const [ startPageHref, setStartPageHref ] = useState<string>('/');
    const [ containerElement, isVisible, setIsVisible ] = useVisible(false);
    useEffect(() => {
        let isCancelled : boolean = false;
        repo.getByReference('startPage').then(x => {
            if (isCancelled) return;
            if (x) setStartPageHref(Services.ContentLink.createHref(x)); 
        });
        return () => { isCancelled = true }
    }, []);
    const toggleNavBar = () => setIsVisible(x => !x);
    const companyName = Taxonomy.Property.readPropertyValue(props.settings, "companyName") || "Site title";

    return <nav className="navbar navbar-expand-lg navbar-light bg-light" ref={ containerElement }>
        <div className="container">
            <a className="navbar-brand" href={ startPageHref }>
                <Components.Property iContent={ props.settings } field="siteLogo" />
                <span className="sr-only">{ companyName }</span>
            </a>
            <button className={ "navbar-toggler" + (isVisible ? "" : " collapsed") } type="button" data-toggle="collapse" data-target="#componentsSharedNavbar" aria-controls="componentsSharedNavbar" aria-expanded={ isVisible ? "true" : "false" } aria-label="Toggle navigation" onClick={ toggleNavBar }>
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className={ "navbar-collapse collapse" + (isVisible ? " show" : "")} id="componentsSharedNavbar">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <Components.ContentArea data={ props.settings.mainMenu } itemContentType="NavItem" noWrap />
                </ul>
                <SiteSearchBox />
            </div>
        </div>
    </nav>
}

export default NavBar;