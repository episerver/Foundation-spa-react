import React, { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import { Layout } from '@episerver/spa-core';

import Header from 'app/Components/Shared/Header';
import Footer from 'app/Components/Shared/Footer';
import CmsHomePageData from 'app/Models/Content/CmsHomePageData';

export const MoseyLayout : FunctionComponent<Layout.Props> = (props) => {
    return <div className="mosey-layout">
        <Helmet>
            <title>Mosey Capital</title>
            <link rel="shortcut icon" href="/Spa/favicon.ico" type="image/x-icon" />
        </Helmet>
        <Header context={ props.context } path={ props.path } startPage={ props.startPage as CmsHomePageData } />
        { props.children }
        <Footer context={ props.context } startPage={ props.startPage as CmsHomePageData } />
    </div>
}
export default MoseyLayout;