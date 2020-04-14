import ReactDOM from "react-dom";
import React from "react";
import CmsSite from './Components/CmsSite';
import AppConfig from './AppConfig';
import EpiContext from './Spa';
import History from './Routing/History';
import ComponentPreLoader, { IComponentPreloadList } from "./Loaders/ComponentPreLoader";

export default function InitBrowser(config: AppConfig, containerId?: string)
{
    EpiContext.init(config);

    if ((new URLSearchParams(window.location.search)).get('epieditmode') != 'True') {
        History.setupPageBinding(EpiContext);
    }
    
    let container = document.getElementById(containerId ? containerId : "epi-page-container");
    if (container.childElementCount > 0) {
        if (EpiContext.isDebugActive()) console.info('Hydrating existing render, Stage 1. Preloading components ...');
        const components : IComponentPreloadList = EpiContext.config().preLoadComponents || [];
        const loader = EpiContext.componentLoader();
        ComponentPreLoader.load(components, loader).finally(() => {
            if (EpiContext.isDebugActive()) console.info('Hydrating existing render, Stage 2. Hydration ...');
            ReactDOM.hydrate(<CmsSite context={EpiContext} />, container);
        });
    } else {
        if (EpiContext.isDebugActive()) console.info('Building new application');
        ReactDOM.render(<CmsSite context={EpiContext} />, container);
    }
}