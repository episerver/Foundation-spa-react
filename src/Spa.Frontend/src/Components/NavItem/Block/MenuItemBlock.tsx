import React from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { useEpiserver } from '@episerver/spa-core';
import { MenuItemBlockProps } from '../../../Models/Content/MenuItemBlockData';

export const MenuItemBlock : React.FunctionComponent<MenuItemBlockProps> = (props) => {
    const ctx = useEpiserver();
    return <NavItem>
        <NavLink href={ ctx.getSpaRoute( props.data.link?.value || '#' ) }>{ props.data.name?.value }</NavLink>
    </NavItem>
}

export default MenuItemBlock;