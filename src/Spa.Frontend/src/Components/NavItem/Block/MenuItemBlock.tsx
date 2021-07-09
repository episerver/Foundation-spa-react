import React, { FunctionComponent } from 'react';
import { Services, Taxonomy } from '@episerver/spa-core';
import { MenuItemBlockProps } from 'app/Models/Content/MenuItemBlockData';

export const MenuItemBlock : FunctionComponent<MenuItemBlockProps> = (props) => {
    const link = Taxonomy.Property.readPropertyValue(props.data, "link");
    const name = Taxonomy.Property.readPropertyValue(props.data, "name");
    const url = Services.ContentLink.createHref( link || '#' );
    return <li className="nav-item">
        <a className="nav-link" href={ url }>{ name }</a>
    </li>
}

export default MenuItemBlock;