import React, { FunctionComponent, useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Helmet } from 'react-helmet';
import { Layout, useEpiserver, useIContentRepository, useServerSideRendering } from '@episerver/spa-core';

import Placeholder from 'app/Components/Placeholder';
import Header from 'app/Components/Shared/Header';
import Footer from 'app/Components/Shared/Footer';
import CmsHomePageData from 'app/Models/Content/CmsHomePageData';

export const MoseyLayout : FunctionComponent<Layout.Props> = (props) => {
    const ctx = useEpiserver();
    const repo = useIContentRepository();
    const ssr = useServerSideRendering();
    const pathname = ctx.isServerSideRendering() ? ssr.Path : useLocation().pathname;
    const [ startPage, setStartPage ] = useState<CmsHomePageData | null>(ssr.StartPage as CmsHomePageData || null);

    useEffect(() => {
        ctx.loadCurrentWebsite().then(w => {
            repo.getByReference('startPage', w)
                .then(c => setStartPage(c as CmsHomePageData | null))
                .catch(() => setStartPage(null));
        });
    }, [])

    if (!startPage) {
        return <div className="mosey-layout">
            <Helmet>
                <title>Mosey Capital</title>
                <link rel="shortcut icon" href="/spaview/app.html.spa/favicon.ico" type="image/x-icon" />
            </Helmet>
            <Placeholder style={ { width: '100vw', height: '253px' } } >Header</Placeholder>
            { props.children }
            <Placeholder style={ { width: '100vw', height: '301px' } } >Footer</Placeholder>
        </div>
    }
    return <div className="mosey-layout">
        <Helmet>
            <title>Mosey Capital</title>
            <link rel="shortcut icon" href="/spaview/app.html.spa/favicon.ico" type="image/x-icon" />
        </Helmet>
        <Header context={ ctx } path={ pathname } startPage={ startPage } />
        { props.children }
        <Footer context={ ctx } startPage={ startPage } />
    </div>
}
export default MoseyLayout;