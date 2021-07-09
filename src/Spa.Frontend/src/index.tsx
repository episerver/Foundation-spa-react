// Import framework
import start, { __doPreload__, ImplementationPreLoader, Core } from '@episerver/spa-core'

// Import configuration
import config from 'app/Config'
import preload from '../preload.json';

// Get global styles
import './global.scss'

// Prepare start parameters
const serviceContainer : Core.IServiceContainer | undefined = undefined; // Use default
const containerElementId : string | undefined = preload.appId;
const ssr : boolean | undefined = false;
const preLoad: ImplementationPreLoader = () => __doPreload__();

// Start the website
start(config, serviceContainer, containerElementId, ssr, preLoad);