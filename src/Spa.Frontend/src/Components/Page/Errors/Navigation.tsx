import React, { ReactNode, ReactNodeArray } from 'react';
import {Helmet} from 'react-helmet';
import IContent from "Episerver/Models/IContent";
import EpiComponent from 'Episerver/EpiComponent';

interface NavigationData extends IContent {
    name: string
}

export default class Navigation extends EpiComponent<NavigationData>
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