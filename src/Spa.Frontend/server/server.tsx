import startEpiserver, { ServerSideRendering } from '@episerver/spa-core';
import appConfig from 'app/Config';

//PreLoad components for SSR, auto injected by Webpack
//@PreLoad("../src/components","PreLoad","app/Components/")

//Bind appropriate rendering function
declare const global : any;
const dummyResponse : ServerSideRendering.Response = {
    Body: ""
}
global.render = (): ServerSideRendering.Response => dummyResponse; // () => startEpiserver(appConfig, undefined, undefined, true);