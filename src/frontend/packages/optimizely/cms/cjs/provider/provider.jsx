"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptimizelyContentEvent = exports.ContextProvider = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../loader/index");
const react_1 = tslib_1.__importStar(require("react"));
const context_1 = tslib_1.__importDefault(require("./context"));
const index_2 = require("../content-delivery/index");
const hooks_1 = require("../hooks");
const COMMUNICATOR_CMS_PATH = 'episerver/cms';
const COMMUNICATOR_FILE = 'clientresources/epi-cms/communicationInjector.js';
const ContextProvider = ({ defaultBranch, cmsDomain, children, cmsPath, cmsVersion, communicatorFile, ComponentLoaderClass, currentContentId }) => {
    // Prepare default values
    const contentEditing = (0, hooks_1.useContentEditing)({ cmsDomain, cmsPath, cmsVersion: cmsVersion, communicatorFile });
    const api = (0, react_1.useMemo)(() => (0, index_2.createInstance)({ defaultBranch: defaultBranch }), [defaultBranch]);
    const loader = (0, react_1.useMemo)(() => (0, index_1.setup)({ loaderType: ComponentLoaderClass }), [ComponentLoaderClass]);
    const withActionsAndEvents = (0, react_1.useMemo)(() => {
        return {
            api,
            loader,
            defaultBranch: defaultBranch || "en",
            inEditMode: contentEditing.inEditMode,
            isEditable: contentEditing.inEditMode,
            isReady: contentEditing.loading === false,
            currentContentId: currentContentId,
            editableContent: contentEditing.info
        };
    }, [api, loader, defaultBranch, contentEditing, currentContentId]);
    return <context_1.default.Provider value={withActionsAndEvents}>{children}</context_1.default.Provider>;
};
exports.ContextProvider = ContextProvider;
exports.ContextProvider.defaultProps = {
    cmsPath: COMMUNICATOR_CMS_PATH,
    communicatorFile: COMMUNICATOR_FILE,
    cmsVersion: 'latest',
    defaultBranch: 'en'
};
exports.default = exports.ContextProvider;
class OptimizelyContentEvent extends Event {
    constructor(name, init) {
        super(name, init);
        this._data = init.data;
    }
    get data() {
        return this._data;
    }
}
exports.OptimizelyContentEvent = OptimizelyContentEvent;
//# sourceMappingURL=provider.jsx.map