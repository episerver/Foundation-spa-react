import React, { FunctionComponent, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Layout, State } from '@episerver/spa-core';
import { useSettings } from '@episerver/foundation-settings';

import Placeholder from '../Placeholder';
import Header from './Header';
import NavBar from './NavBar';
import Footer from './Footer';

import LayoutSettings from 'app/Models/Content/LayoutSettingsData';

type MoseyLayoutProps = Layout.Props & Partial<State.CmsState>

export const MoseyLayout : FunctionComponent<MoseyLayoutProps> = (props) => {
    const settingsService = useSettings();
    const [layoutSettings, setLayoutSettings] = useState<LayoutSettings | null>(null);
    useEffect(() => {
        settingsService.getContainer<LayoutSettings>('LayoutSettings').then(x => setLayoutSettings(x));
    }, [ props.currentLanguage ]);

    if (!layoutSettings) {
        return <div className="mosey-layout">
            <Helmet>
                <title>Frontline Services</title>
                <link rel="shortcut icon" href="/spaview/app.html.spa/favicon.ico" type="image/x-icon" />
            </Helmet>
            <Placeholder style={ { width: '100vw', height: '253px' } } >Header</Placeholder>
            { props.children }
            <Placeholder style={ { width: '100vw', height: '301px' } } >Footer</Placeholder>
        </div>
    }
    return <div className="mosey-layout">
        <Helmet>
            <title>Frontline Services</title>
            <link rel="shortcut icon" href="/spaview/app.html.spa/favicon.ico" type="image/x-icon" />
        </Helmet>
        <Header settings={ layoutSettings } />
        <NavBar settings={ layoutSettings } />
        { props.children }
        <Footer settings={ layoutSettings } />
    </div>
}

export const ConnectedMoseyLayout = connect((state : State.CmsAppState, ownProps : MoseyLayoutProps) => {
    const propsFromState = state.OptiContentCloud || {}
    return { ...ownProps, ...propsFromState }
})(MoseyLayout);

export default ConnectedMoseyLayout;