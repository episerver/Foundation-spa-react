import React from 'react';
import Helmet from 'react-helmet';
import { Components } from '@episerver/spa-core';
import { FolderPageProps } from '../../Models/Content/FolderPageData';

export const FolderPage : React.FunctionComponent<FolderPageProps> = (props) => 
{
    return <div className="folder-page">
        <Helmet>
            <title>{ props.data.name }</title>
        </Helmet>
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1><Components.Property iContent={ props.data } field="name" /></h1>
                </div>
            </div>
        </div>
    </div>
}
export default FolderPage;