import React, { useState, useEffect } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler } from 'reactstrap';

//Import Episerver Libs
import { Components, Taxonomy, useEpiserver, useIContentRepository, Services } from '@episerver/spa-core';

//Import App
import LayoutSettings from '../../Models/Content/LayoutSettingsData';
import './NavBar.scss';

export type NavBarProps = {
    settings: LayoutSettings
}

export const NavBar : React.FunctionComponent<NavBarProps> = (props) => {
    const ctx = useEpiserver();
    const repo = useIContentRepository();
    const [ startPageHref, setStartPageHref ] = useState<string>('/');

    useEffect(() => {
        let isCancelled : boolean = false;
        repo.getByReference('startPage').then(x => {
            if (isCancelled) return;
            if (x) setStartPageHref(Services.ContentLink.createHref(x)); 
        });
        return () => { isCancelled = true }
    }, []);
    const [ isOpen, setIsOpen ] = useState<boolean>(false);
    const toggleNavBar = () => setIsOpen(x => !x);

    return  <div className="header-navbar">
        <div className="container">
            <Navbar light expand="lg">
                <NavbarBrand href={ startPageHref } className="mr-4 mw-60">
                    <Components.Property iContent={ props.settings } field="siteLogo" />
                </NavbarBrand>
                <NavbarToggler className={ `mr-2 ${ isOpen ? '' : 'collapsed'}`} onClick={ toggleNavBar } />
                <Collapse isOpen={ isOpen} navbar>
                    <Nav navbar>
                        <Components.ContentArea context={ ctx } data={ props.settings.mainMenu } itemContentType="NavItem" noWrap />
                    </Nav>
                    <form className="form-inline my-2 my-lg-0 ml-auto">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </Collapse>
            </Navbar>
        </div>
    </div>
}
export default NavBar;