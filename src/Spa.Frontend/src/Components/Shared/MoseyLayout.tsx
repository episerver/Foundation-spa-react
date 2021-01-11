import React, { FunctionComponent, useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Helmet } from 'react-helmet';
import { Layout, useEpiserver, useIContentRepository, useServerSideRendering, Taxonomy } from '@episerver/spa-core';

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

    // Initial load of the startPage
    useEffect(() => {
        repo.getByReference('startPage')
            .then(c => {
                // In edit mode the routed content can be the draft version we actually want to show
                if (ctx.hasRoutedContent() && ctx.getRoutedContent().contentLink.guidValue === c.contentLink.guidValue)
                    setStartPage(ctx.getRoutedContent() as CmsHomePageData)
                else
                    setStartPage(c as CmsHomePageData | null)
            })
            .catch(() => setStartPage(null));
    }, []);

    // Listen to content updates
    useEffect(() => {
        if (!startPage) return;
        const onContentPatched = (link : Taxonomy.ContentLink, oldItem : Taxonomy.IContent, newItem : Taxonomy.IContent) => {
            if (ctx.isDebugActive()) console.log('MoseyLayout updating StartPage...', ctx, startPage, newItem);
            if (!startPage) return;
            if (link.guidValue === startPage.contentLink.guidValue) setStartPage(newItem as CmsHomePageData);
        };
        repo.addListener('afterPatch', onContentPatched);
        return () => repo.removeListener('afterPatch', onContentPatched);
    }, [ startPage ]);

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