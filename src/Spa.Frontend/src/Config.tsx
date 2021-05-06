// Episerver library
import { Core, ContentDelivery } from "@episerver/spa-core";

// Modules
import { SettingsInitialization as SettingsModule } from '@episerver/foundation-settings';

// Referenced components for configuration
import Loader from "app/Components/Shared/MoseyLoader";
import Layout, { MoseyLayout as ServerSideLayout } from "app/Components/Shared/MoseyLayout";

// Referenced implementation
import MoseyComponentLoader from "app/Infrastructure/ComponentLoader";

// Enable caching of action calls
// ContentDelivery.FetchAdapter.isCachable.push(url => url.pathname.indexOf('/api/episerver/v3/action/') >= 0 && !url.searchParams.has('epieditmode') && !url.searchParams.has('EpiEditMode'));

const appDebug = false;

// Website configuration
export const Config : Core.IConfig = {
    // Main setup
    enableDebug: appDebug,

    // Connection details
    basePath: process.env.WEB_PATH, //There's no prefix, set to /spa if the spa is located at https://your.domain/spa/ - this should match your webpack configuration
    epiBaseUrl: process.env.EPI_URL, //The main URL where Episerver is running
    defaultLanguage: "en", //The language to send to Episerver
    
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
        defaultRowClass: 'row no-gutters',
        defaultBlockClass: 'col-12',
        defaultContainerClass: 'container',
        containerBreakBlockClass: 'displaymode-screen'
    },

    // (Pre)Loading of components, pre-load those components that make up your key landing pages
    preLoadComponents: [
        "app/Components/Image/Media/ImageMediaData",
        "app/Components/NavItem/Block/MenuItemBlock",
        "app/Components/NavItem/Page/LandingPage",
        "app/Components/NavItem/Page/LocationListPage",
        "app/Components/Block/Image/Media/ImageMediaData",
        "app/Components/Block/TextBlock",
        "app/Components/Block/BreadcrumbBlock",
        "app/Components/Block/HeroBlock",
        "app/Components/Block/ContainerBlock",
        "app/Components/Block/PageListBlock",
        "app/Components/Block/TeaserBlock",
        "app/Components/Block/FormContainerBlock",
        "app/Components/Page/HomePage",
        "app/Components/Page/LandingPage",
        "app/Components/Page/StandardPage"
    ],

    // List SPA Modules that inject into the bootstrapping process
    modules: [
        new SettingsModule()
    ],

    // List of custom component loaders, app/Components is handled by the core library,
    // so the MoseyComponentLoader is here as example.
    componentLoaders: [
        /*MoseyComponentLoader*/
    ],

    // Configuration of the V2 Content Repository
    iContentRepository: {
        debug: appDebug,
        policy: ContentDelivery.IRepositoryPolicy.LocalStorageFirst
    },

    // Configuration of the V2 Content Delivery API, this overrides the old configuration
    iContentDelivery: {
        Debug: false,
        AutoExpandAll: false,
    }
};
Config.componentLoaders.debug = false; // Override global debug to disable debug within the component loaders
export default Config;