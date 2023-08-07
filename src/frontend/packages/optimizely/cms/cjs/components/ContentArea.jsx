"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentArea = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const property_1 = require("../util/property");
const ContentAreaItem_1 = tslib_1.__importDefault(require("./ContentAreaItem"));
const edit_mode_1 = require("../provider/edit-mode");
const index_1 = require("../provider/index");
const ErrorBoundary_1 = tslib_1.__importDefault(require("./ErrorBoundary"));
const DEBUG = process.env.NODE_ENV != 'production';
function ContentArea(props) {
    var _a, _b, _c, _d, _e, _f, _g;
    const cms = (0, index_1.useOptimizelyCms)();
    const opti = (0, edit_mode_1.useEditMode)();
    var isEditable = opti.inEditMode || opti.isEditable;
    const myId = (0, react_1.useId)();
    if (props.value === undefined && props.content === undefined)
        return <>{props.children}</>;
    if (!props.container)
        throw new Error("The ContentArea was unable to resolve the container");
    if (!props.itemContainer)
        throw new Error("The ContentArea was unable to resolve the item container");
    const propName = props.name.toString();
    const value = (((_a = (0, property_1.processValue)(props.value)) !== null && _a !== void 0 ? _a : (0, property_1.readValue)(props.content, props.name)) || []);
    const language = (_c = (_b = props.language) !== null && _b !== void 0 ? _b : cms.defaultBranch) !== null && _c !== void 0 ? _c : '';
    const contentScope = (_d = props.scope) !== null && _d !== void 0 ? _d : (_e = props.content) === null || _e === void 0 ? void 0 : _e.contentLink.guidValue;
    const contentId = (_f = props.content) === null || _f === void 0 ? void 0 : _f.contentLink.id;
    const contentWorkId = (_g = props.content) === null || _g === void 0 ? void 0 : _g.contentLink.workId;
    const allowEdit = (contentId && (contentId == opti.contentId) ? true : false) &&
        (contentWorkId && opti.contentWorkId ? contentWorkId == opti.contentWorkId : true);
    if (DEBUG) {
        console.groupCollapsed(`Optimizely - CMS: ContentArea [${propName}]`);
        console.log("Optimizely - CMS: ContentArea: contentId", contentId);
        console.log("Optimizely - CMS: ContentArea: contentWorkId", contentWorkId);
        console.log("Optimizely - CMS: ContentArea: contentScope", contentScope);
        console.log("Optimizely - CMS: ContentArea: inEditMode", isEditable ? "Yes" : "No");
        console.log("Optimizely - CMS: ContentArea: allowEdit", allowEdit ? "Yes" : "No");
        console.groupEnd();
    }
    isEditable = allowEdit && isEditable;
    const ContainerElement = props.container;
    const ItemContainerElement = props.itemContainer;
    const items = value.map((item, idx) => {
        const itemKey = `${myId}-${propName}-item-${idx}`;
        // Isolate Blocks within a ContentArea so an error within a block will not break the entire page render
        return <ErrorBoundary_1.default key={itemKey}> 
            <ContentAreaItem_1.default item={item} itemContainer={ItemContainerElement} language={language} scope={contentScope} passEpiData={props.passEpiData} isEditable={isEditable}/>
        </ErrorBoundary_1.default>;
    });
    if (!isEditable)
        return <ContainerElement>{items}</ContainerElement>;
    if (props.passEpiData)
        return <ContainerElement dataEpiEdit={propName}>{items}</ContainerElement>;
    return <div className='content-area-edit' data-epi-edit={propName}><ContainerElement>{items}</ContainerElement></div>;
}
exports.ContentArea = ContentArea;
ContentArea.displayName = "Optimizely CMS: Content Area";
ContentArea.defaultProps = {
    itemContainer: (props) => { return <div className='content-area-item' data-template={props.displayOption}>{props.children}</div>; },
    container: (props) => { return <>{props.children}</>; },
    passEpiData: false
};
exports.default = ContentArea;
//# sourceMappingURL=ContentArea.jsx.map