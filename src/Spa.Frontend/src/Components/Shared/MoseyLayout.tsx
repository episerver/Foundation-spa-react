import React, { FunctionComponent, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { useEpiserver, Enums, Layout, State } from '@episerver/spa-core';
import { useSettingsApi, SettingsApi, SettingsContext } from '@episerver/foundation-settings';

import Placeholder from '../Placeholder';
import Header from './Header';
import NavBar from './NavBar';
import Footer from './Footer';

import LayoutSettings from 'app/Models/Content/LayoutSettingsData';

type MoseyLayoutProps = Layout.Props & Partial<State.CmsState>

const LayoutSettingsContainer : string = 'LayoutSettings';

export const MoseyLayout : FunctionComponent<MoseyLayoutProps> = (props) => {
    const settingsApi = useSettingsApi();
    const [layoutSettings, setLayoutSettings] = useState<LayoutSettings | undefined>(settingsApi.getContainerOnServer<LayoutSettings>(LayoutSettingsContainer));

    const language = props.currentLanguage;
    useEffect(() => {
        if (layoutSettings?.language?.name !== language)
            settingsApi.getContainer<LayoutSettings>(LayoutSettingsContainer).then(x => setLayoutSettings(x));
    }, [ language ]);

    if (!layoutSettings) {
        return <div className="mosey-layout">
            <Helmet>
                <title>Frontline Services - A fictitious demo company by Optimizely</title>
                <link rel="shortcut icon" href="/spaview/app.html.spa/favicon.ico" type="image/x-icon" />
            </Helmet>
            <Placeholder style={ { width: '100vw', height: '110px' } } >Header</Placeholder>
            { props.children }
            <Placeholder style={ { width: '100vw', height: '338px' } } >Footer</Placeholder>
        </div>
    }
    return <div className="mosey-layout">
        <Helmet>
            <title>Frontline Services - A fictitious demo company by Optimizely</title>
            <link rel="shortcut icon" href="/spaview/app.html.spa/favicon.ico" type="image/x-icon" />
        </Helmet>
        <Header settings={ layoutSettings } />
        <NavBar settings={ layoutSettings } />
        { props.children }
        <Footer settings={ layoutSettings } />
    </div>
}
MoseyLayout.displayName = "Foundation SPA: Layout";

export const ConnectedMoseyLayout = connect((state : State.CmsAppState, ownProps : MoseyLayoutProps) => {
    const propsFromState = state.OptiContentCloud || {}
    return { ...ownProps, ...propsFromState }
})(MoseyLayout);
ConnectedMoseyLayout.displayName = "Foundation SPA: State aware container"

export const ConnectedSettingsLayout : FunctionComponent<Layout.Props> = (props) => {
    const epi = useEpiserver();
    const settingsApi = new SettingsApi(
        epi.serviceContainer.getService(Enums.DefaultServices.ContentDeliveryAPI_V2),
        epi.serviceContainer.getService(Enums.DefaultServices.IContentRepository_V2),
        epi.serviceContainer.getService(Enums.DefaultServices.ServerContext)
    );
    return <SettingsContext.Provider value={ settingsApi }>
        <ConnectedMoseyLayout { ...props } />
    </SettingsContext.Provider>
}
ConnectedSettingsLayout.displayName = "Foundation SPA: Settings Container";

export default ConnectedSettingsLayout;