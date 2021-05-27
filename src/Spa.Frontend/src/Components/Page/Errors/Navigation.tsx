import React, { ReactNode, ReactNodeArray } from 'react';
import {Helmet} from 'react-helmet';
import { Taxonomy, ComponentTypes } from "@episerver/spa-core";

interface NavigationData extends Taxonomy.IContent {
    name: string
}

export default class Navigation extends ComponentTypes.AbstractComponent<NavigationData>
{
    render() : ReactNode | ReactNodeArray | null
    {
        return <div className="container" key="error-nav-container">
                <Helmet>
                    <title>{ this.props.data.name }</title>
                </Helmet>
                <div className="row">
                    <div className="col">
                        <h1>An error occured</h1>
                        <div className="alert alert-danger">{ this.props.data.name }</div>
                    </div>
                </div>
            </div>
    }
}