import startEpiserver, { ServerSideRendering, Core } from '@episerver/spa-core';
import appConfig from 'app/Config';
import preload from '../preload.json';
import models from 'app/Models/Content/schema.json';

// PreLoad components for SSR, auto injected by Webpack. PreLoad is already created by the .Net engine
// @PreLoad("../src/components","PreLoad","app/Components/")

// Prepare start parameters
const serviceContainer : Core.IServiceContainer | undefined = undefined;
const containerElementId : string | undefined = preload.appId;
const ssr : boolean | undefined = true;

// Add the loaded schema into the container, as we're loading it Async in the browser but synchronously
// in the 
appConfig.schema = appConfig.schema || models;

/**
 * Generate a stringified version of the server response
 */
declare let render : () => ServerSideRendering.ServerSideRenderingResponse;
render = () => startEpiserver(appConfig, serviceContainer, containerElementId, ssr);