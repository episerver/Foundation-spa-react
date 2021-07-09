import React, { FunctionComponent } from 'react';
import { useLocation } from 'react-router';

import { Taxonomy, Services } from '@episerver/spa-core';

export type NavItemProps = {
    item: Taxonomy.IContent
}

export const EpiNavItem : FunctionComponent<NavItemProps> = (props) => {
    const location = useLocation();
    const targetURL = new URL(Services.ContentLink.createHref(props.item));
    const isActive = location.pathname == targetURL.pathname && location.search == targetURL.search && location.hash == targetURL.hash
    return <li className={ "nav-item" + (isActive ? " active" : "") }>
        <a className="nav-link" href={ targetURL.toString() }>{ props.item.name }</a>
    </li>;
}

export default EpiNavItem;