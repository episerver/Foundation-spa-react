//Import generic libs
import React, { Component, ReactNodeArray } from 'react';
import { connect } from 'react-redux';
import { Collapse, Nav, Navbar, NavbarToggler } from 'reactstrap';
import { merge } from 'lodash';

//Import Episerver Libs
import IEpiserverContext from '@episerver/spa-core/Core/IEpiserverContext';
import ContentArea from '@episerver/spa-core/Components/ContentArea';
import Property from '@episerver/spa-core/Components/Property';
import Link from '@episerver/spa-core/Components/Link';

//Import App
import CmsHomePageData from 'app/Models/Content/CmsHomePageData';

interface HeaderProps {
    startPage: CmsHomePageData
    context: IEpiserverContext
    path: string
}
interface HeaderState {
    isOpen: boolean
}

export default class Header extends Component<HeaderProps, HeaderState>
{
    public constructor(props: HeaderProps)
    {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    public render(): ReactNodeArray | null
    {
        return [<header key="MoseyHeader">
            <div className="header-top bg-secondary text-white">
                <div className="container">
                    <div className="row">
                        <div className="col text-center pt-3"><Property iContent={this.props.startPage} field="bannerText" context={this.props.context} /></div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col"></div>
                    <div className="col py-4 d-flex justify-content-center">
                        <Link href={this.props.startPage.contentLink}>
                            <Property iContent={this.props.startPage} field="siteLogo" context={this.props.context} />
                        </Link>
                    </div>
                    <div className="col py-4 d-flex">
                    </div>
                </div>
            </div>
        </header>,
        <Navbar expand="lg" key="NewMoseyHeaderNav" dark color="primary" className="sticky-top">
            <div className="container">
                <NavbarToggler onClick={ () => this.setState({isOpen: !this.state.isOpen})} />
                <Collapse isOpen={ this.state.isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <ContentArea context={ this.props.context } data={ this.props.startPage.mainMenu } noWrap={ true } />
                    </Nav>
                </Collapse>
            </div>
        </Navbar>
        ]
    }
}

export type HeaderType = new () => Header;

export const ConnectedHeader : HeaderType = connect( (state : any, ownProps : HeaderProps) => {
    try {
        const contentId = state.iContentRepo.refs['startPage'];
        const content = state.iContentRepo.items[contentId].content;
        return merge({}, ownProps, { startPage: content });
    } catch (e) {}
    return ownProps;
} )(Header) as unknown as HeaderType;