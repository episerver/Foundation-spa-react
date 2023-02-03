"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptimizelyCmsContext = exports.useContentEditMode = exports.useEditMode = exports.useOptimizelyCms = void 0;
const tslib_1 = require("tslib");
const swr_1 = require("swr");
const react_1 = tslib_1.__importDefault(require("react"));
const cms_1 = require("./cms");
const edit_mode_1 = require("./edit-mode");
// Export Hooks from individual providers
var cms_2 = require("./cms");
Object.defineProperty(exports, "useOptimizelyCms", { enumerable: true, get: function () { return cms_2.useOptimizelyCms; } });
var edit_mode_2 = require("./edit-mode");
Object.defineProperty(exports, "useEditMode", { enumerable: true, get: function () { return edit_mode_2.useEditMode; } });
Object.defineProperty(exports, "useContentEditMode", { enumerable: true, get: function () { return edit_mode_2.useContentEditMode; } });
const OptimizelyCmsContext = ({ children, cmsDomain, ComponentLoaderClass, cmsPath, cmsVersion, communicatorFile, components, currentUrl, defaultBranch, defaultSiteId, swrOptions }) => {
    return <cms_1.OptimizelyCms cmsDomain={cmsDomain} ComponentLoaderClass={ComponentLoaderClass} components={components} defaultBranch={defaultBranch} defaultSiteId={defaultSiteId}>
        <swr_1.SWRConfig value={swrOptions}>
            <edit_mode_1.OptimizelyEditMode cmsDomain={cmsDomain} cmsPath={cmsPath} cmsVersion={cmsVersion} communicatorFile={communicatorFile} currentUrl={currentUrl}>
                {children}
            </edit_mode_1.OptimizelyEditMode>
        </swr_1.SWRConfig>
    </cms_1.OptimizelyCms>;
};
exports.OptimizelyCmsContext = OptimizelyCmsContext;
exports.OptimizelyCmsContext.defaultProps = Object.assign(Object.assign({}, cms_1.OptimizelyCms.defaultProps), edit_mode_1.OptimizelyEditMode.defaultProps);
exports.OptimizelyCmsContext.displayName = "Optimizely CMS: Context";
exports.default = exports.OptimizelyCmsContext;
//# sourceMappingURL=index.jsx.map