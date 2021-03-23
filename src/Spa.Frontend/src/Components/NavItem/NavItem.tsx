import React from 'react';
import { NavItem, NavLink } from 'reactstrap';

import { Taxonomy, Services } from '@episerver/spa-core';

export type NavItemProps = {
    item: Taxonomy.IContent
}

export const EpiNavItem : React.FunctionComponent<NavItemProps> = (props) => {
    return <NavItem>
        <NavLink href={ Services.ContentLink.createHref(props.item) }>{ props.item.name }</NavLink>
    </NavItem>
}

export default EpiNavItem;