//Import external libraries
import React, { ReactNode } from 'react';
import { NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, Alert, Button } from 'reactstrap';

//Import Episerver Components
import { Components, ComponentTypes } from '@episerver/spa-core';

import MenuItemBlockData from 'app/Models/Content/MenuItemBlockData';

interface MenuItemBlockState {
    linkTarget: string
    show: boolean
}

export default class MenuItemBlock extends ComponentTypes.AbstractComponent<MenuItemBlockData, MenuItemBlockState> {

    protected getInitialState() : MenuItemBlockState {
        return {
            linkTarget : this.props.data.link.value !== null ? this.props.data.link.value : "#",
            show: false
        };
    }

    public componentDidUpdate() {
        let newLinkTarget : string = this.props.data.link.value !== null ? this.props.data.link.value : "#";
        if (this.state.linkTarget !== newLinkTarget) {
            this.setState({linkTarget : this.props.data.link.value !== null ? this.props.data.link.value : "#"});
        }
    }

    public onButtonClick(event: MouseEvent)
    {
        this.navigateTo(this.props.data.buttonLink.value);
        event.preventDefault();
        return false;
    }

    public render() : ReactNode 
    {
        if (this.props.data.menuImage.value !== null) {
            let dropdownButton : ReactNode = null;
            if (this.props.data.buttonLink.value !== null && this.props.data.buttonText.value !== null ) {
                //dropdownButton = <a className="btn btn-primary" href={ this.props.data.buttonLink.value }>{ this.props.data.buttonText.value }</a>
                dropdownButton = <Button color="primary" size="lg" block onClick={ this.onButtonClick.bind(this) }>{ this.props.data.buttonText.value}</Button>
            }
            return <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                    { this.props.data.name.value }
                </DropdownToggle>
                <DropdownMenu className="mega-menu">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-lg-6">
                                <Alert color="info">Links not available in ContentDeliveryAPI</Alert>
                            </div>
                            <div className="col-6 col-lg-3">
                                <Components.EpiserverContent context={ this.props.context } contentLink={ this.props.data.menuImage.value } expandedValue={ this.props.data.menuImage.expandedValue } />
                            </div>
                            <div className="col-6 col-lg-3">
                            <div dangerouslySetInnerHTML={ this.htmlObject(this.props.data.teaserText.value) }></div>
                                { dropdownButton }
                            </div>
                        </div>
                    </div>
                </DropdownMenu>
            </UncontrolledDropdown>

        } else {
            return <NavItem><NavLink href={ this.state.linkTarget } active={ this.state.linkTarget == this.props.path}>{ this.props.data.name.value }</NavLink></NavItem>;
        }
    }
}