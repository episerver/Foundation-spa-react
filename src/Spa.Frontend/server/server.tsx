import startEpiserver, { ServerSideRendering } from '@episerver/spa-core';
import appConfig from 'app/Config';

//PreLoad components for SSR, auto injected by Webpack
//@Pre-Load("../src/components","PreLoad","app/Components/")

//Bind appropriate rendering function
declare const global : {
    render: () => ServerSideRendering.Response
};
const dummyResponse : ServerSideRendering.Response = { Body: "" };

//global.render = (): any => dummyResponse;
global.render = () => startEpiserver(appConfig, undefined, undefined, true);