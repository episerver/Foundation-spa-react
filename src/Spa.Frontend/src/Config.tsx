//Episerver library
import AppConfig from "Episerver/AppConfig";

//Referenced components for configuration
import MoseyLoader from "app/Components/Shared/MoseyLoader";
import MoseyLayout from "app/Components/Shared/MoseyLayout";

//Website configuration
const Config : AppConfig = {
    //Main setup
    enableDebug: true, //Will be forced to false if build with a "production" environment
    autoExpandRequests: true, //Should all properties be expanded by default

    //Connection details
    basePath: "", //There's no prefix, set to /spa if the spa is located at https://your.domain/spa/ - this should match your webpack configuration
    epiBaseUrl: "http://spa-react", //The main URL where Episerver is running
    defaultLanguage: "en", //The language to send to Episerver
    
    //Site layout (i.e. wrapper for routed IContent)
    layout: MoseyLayout,

    //Spinner
    enableSpinner: true,
    spinner: MoseyLoader,
    spinnerTimeout: 250,

    //Content area configuration
    contentArea: {
        displayOptions: {
            'displaymode-screen': 'screen v-100',
            'displaymode-half': 'col-12 col-md-6',
            'displaymode-one-third': 'col-12 col-md-4'
        },
        defaultBlockClass: 'col-12',
        containerBreakBlockClass: 'screen'
    },

    //Preloading of components
    preLoadComponents: [
        "Media/Image/ImageMediaData",
        "Block/Media/Image/ImageMediaData",
        "Block/MenuItemBlock",
        "Block/TextBlock",
        "Block/BreadcrumbBlock",
        "Page/CmsHomePage",
        "Page/LandingPage",
        "Page/StandardPage"
    ]
};
export default Config;