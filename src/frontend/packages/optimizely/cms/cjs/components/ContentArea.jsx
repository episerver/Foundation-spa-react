"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentArea = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const property_1 = require("../util/property");
const ContentAreaItem_1 = tslib_1.__importDefault(require("./ContentAreaItem"));
const index_1 = require("../index");
function ContentArea(props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const opti = (0, index_1.useOptimizely)();
    var isEditable = opti.inEditMode || opti.isEditable;
    const myId = react_1.default.useId();
    if (props.value === undefined && props.content === undefined)
        return <>{props.children}</>;
    if (!props.container)
        throw new Error("The ContentArea was unable to resolve the container");
    if (!props.itemContainer)
        throw new Error("The ContentArea was unable to resolve the item container");
    const propName = props.name.toString();
    const value = (((_a = (0, property_1.processValue)(props.value)) !== null && _a !== void 0 ? _a : (0, property_1.readValue)(props.content, props.name)) || []);
    const language = (_c = (_b = props.language) !== null && _b !== void 0 ? _b : opti.defaultBranch) !== null && _c !== void 0 ? _c : '';
    const contentScope = (_d = props.scope) !== null && _d !== void 0 ? _d : (_e = props.content) === null || _e === void 0 ? void 0 : _e.contentLink.guidValue;
    const editContentId = parseInt(((_f = opti === null || opti === void 0 ? void 0 : opti.editableContent) === null || _f === void 0 ? void 0 : _f.id) || (opti === null || opti === void 0 ? void 0 : opti.currentContentId));
    //console.log("LIB ContentArea 1:", isEditable)
    if (isEditable && ((_h = (_g = props.content) === null || _g === void 0 ? void 0 : _g.contentLink) === null || _h === void 0 ? void 0 : _h.id) && editContentId) {
        //console.log("LIB ContentArea 1a:", props.content?.contentLink?.id, editContentId, props.content?.contentLink?.id === editContentId)
        isEditable = ((_k = (_j = props.content) === null || _j === void 0 ? void 0 : _j.contentLink) === null || _k === void 0 ? void 0 : _k.id) === editContentId;
    }
    //console.log("LIB ContentArea 2:", isEditable)
    const ContainerElement = props.container;
    const ItemContainerElement = props.itemContainer;
    const items = value.map((item, idx) => {
        return <ContentAreaItem_1.default item={item} key={`${myId}-${propName}-item-${idx}`} itemContainer={ItemContainerElement} language={language} scope={contentScope} passEpiData={props.passEpiData} isEditable={isEditable}/>;
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