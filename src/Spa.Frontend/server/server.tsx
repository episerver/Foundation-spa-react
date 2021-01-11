import startEpiserver, { ServerSideRendering } from '@episerver/spa-core';
import appConfig from 'app/Config';

// PreLoad components for SSR, auto injected by Webpack. PreLoad is already created by the .Net engine
// @PreLoad("../src/components","PreLoad","app/Components/")

// Bind appropriate rendering function
declare const epi : {
    isServerSideRendering: boolean
    render: () => ServerSideRendering.Response
};
epi.render = (): ServerSideRendering.Response => startEpiserver(appConfig, undefined, undefined, true);

// const dummyResponse : ServerSideRendering.Response = { Body: "" };
// global.render = (): any => dummyResponse;*/