// import startEpiserver, { ServerSideRendering } from '@episerver/spa-core';
// import appConfig from 'app/Config';

//PreLoad components for SSR, auto injected by Webpack
//@Pre-Load("../src/components","PreLoad","app/Components/")

//Bind appropriate rendering function
//declare const global : any;
const dummyResponse : any = {
    Body: ""
};

(global as any).render = (): any => dummyResponse; // () => startEpiserver(appConfig, undefined, undefined, true);