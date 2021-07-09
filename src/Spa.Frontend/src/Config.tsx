// Episerver library
import { Core, ContentDelivery } from "@episerver/spa-core";

// Referenced components for configuration
import Loader from "app/Components/Shared/MoseyLoader";
import Layout from "app/Components/Shared/MoseyLayout";

// Referenced implementation
//import preload from '../preload.json';

// Enable caching of action calls
// ContentDelivery.FetchAdapter.isCachable.push(url => url.pathname.indexOf('/api/episerver/v3/action/') >= 0 && !url.searchParams.has('epieditmode') && !url.searchParams.has('EpiEditMode'));

const appDebug = process.env.NODE_ENV === 'development';

// Website configuration
export const Config : Core.IConfig = {
    // Main setup
    enableDebug: appDebug,

    // Connection details
    basePath: process.env.WEB_PATH, //There's no prefix, set to /spa if the spa is located at https://your.domain/spa/ - this should match your webpack configuration
    epiBaseUrl: process.env.EPI_URL, //The main URL where Episerver is running
    defaultLanguage: "en", //The language to send to Episerver
    autoExpandRequests: true,
    
    // Site layout
    layout: Layout,

    // Spinner section
    enableSpinner: true,
    spinner: Loader,
    spinnerTimeout: 250,

    // Content area configuration
    contentArea: {
        displayOptions: {
            'displaymode-screen': 'displaymode-screen',
            'displaymode-three-quarters': 'col-12 col-md-9',
            'displaymode-two-thirds': 'col-12 col-md-8',
            'displaymode-half': 'col-12 col-md-6',
            'displaymode-one-third': 'col-12 col-md-4',
            'displaymode-one-quarter': 'col-12 col-md-6 col-lg-3',
            'displaymode-one-sixth' : 'col-12 col-md-4 col-lg-2'
        },
        defaultRowClass: 'row gap-0 g-0',
        defaultBlockClass: 'col-12',
        defaultContainerClass: 'container',
        containerBreakBlockClass: 'displaymode-screen'
    },

    // (Pre)Loading of components, pre-load those components that make up your key landing pages
    preLoadComponents: [], //preload.components,

    // List SPA Modules that inject into the bootstrapping process
    modules: [],

    // List of custom component loaders, app/Components is handled by the core library,
    // so the MoseyComponentLoader is here as example.
    componentLoaders: [],

    // Configuration of the V2 Content Repository
    iContentRepository: {
        debug: appDebug,
        policy: ContentDelivery.IRepositoryPolicy.PreferOffline
    },

    // Configuration of the V2 Content Delivery API, this overrides the old configuration
    iContentDelivery: {
        Debug: appDebug,
        AutoExpandAll: true,
    }
};
Config.componentLoaders.debug = appDebug; // Override global debug to disable debug within the component loaders
export default Config;