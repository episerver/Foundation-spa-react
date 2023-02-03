"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOptimizelyCms = exports.OptimizelyCms = exports.OptimizelyCmsContext = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const factory_1 = tslib_1.__importDefault(require("../content-delivery/factory"));
const factory_2 = tslib_1.__importDefault(require("../loader/factory"));
const DEFAULT_CMS_BRANCH = 'en';
const DEFAULT_SITE_ID = '00000000-0000-0000-0000-000000000000';
const DEBUG = process.env.NODE_ENV != 'production';
const DXP_DEBUG = ((_a = process.env.OPTIMIZELY_DXP_DEBUG) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'true' || process.env.OPTIMIZELY_DXP_DEBUG === '1';
exports.OptimizelyCmsContext = react_1.default.createContext({
    cmsDomain: 'http://localhost:8000',
    defaultBranch: DEFAULT_CMS_BRANCH,
    defaultSiteId: DEFAULT_SITE_ID
});
exports.OptimizelyCmsContext.displayName = "Optimizely CMS Context";
const OptimizelyCms = ({ children, cmsDomain, defaultBranch, defaultSiteId, ComponentLoaderClass, components }) => {
    const providerProps = (0, react_1.useMemo)(() => {
        if (DEBUG) {
            console.groupCollapsed("Optimizely - CMS: Context");
            console.time("Optimizely - CMS: Context");
            console.log("Optimizely - CMS: Context > Content Cloud Domain:", cmsDomain);
            console.log("Optimizely - CMS: Context > Default Language:", defaultBranch !== null && defaultBranch !== void 0 ? defaultBranch : DEFAULT_CMS_BRANCH);
            console.log("Optimizely - CMS: Context > Default Site ID:", defaultSiteId !== null && defaultSiteId !== void 0 ? defaultSiteId : DEFAULT_SITE_ID);
            console.log("Optimizely - CMS: Context > API Debug:", DXP_DEBUG ? "Enabled" : "Disabled");
        }
        const componentLoader = (0, factory_2.default)({ loaderType: ComponentLoaderClass, args: [components] });
        const api = (0, factory_1.default)({ apiUrl: cmsDomain, defaultBranch: defaultBranch !== null && defaultBranch !== void 0 ? defaultBranch : DEFAULT_CMS_BRANCH, debug: DXP_DEBUG });
        if (DEBUG) {
            console.log("Optimizely - CMS: Context > Component Loader:", componentLoader);
            console.log("Optimizely - CMS: Context > API Client:", api);
            console.timeEnd("Optimizely - CMS: Context");
            console.groupEnd();
        }
        return {
            api: api,
            loader: componentLoader,
            cmsDomain: cmsDomain,
            defaultBranch: defaultBranch !== null && defaultBranch !== void 0 ? defaultBranch : DEFAULT_CMS_BRANCH,
            defaultSiteId: defaultSiteId !== null && defaultSiteId !== void 0 ? defaultSiteId : DEFAULT_SITE_ID
        };
    }, [cmsDomain, defaultBranch, defaultSiteId, ComponentLoaderClass, components]);
    return <exports.OptimizelyCmsContext.Provider value={providerProps}>{children}</exports.OptimizelyCmsContext.Provider>;
};
exports.OptimizelyCms = OptimizelyCms;
exports.OptimizelyCms.displayName = "Optimizely CMS React Framework";
exports.OptimizelyCms.defaultProps = {};
exports.default = exports.OptimizelyCms;
/**
 *
 * @returns
 */
const useOptimizelyCms = () => (0, react_1.useContext)(exports.OptimizelyCmsContext);
exports.useOptimizelyCms = useOptimizelyCms;
//# sourceMappingURL=cms.jsx.map