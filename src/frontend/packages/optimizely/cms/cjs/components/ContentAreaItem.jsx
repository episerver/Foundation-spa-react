"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentAreaItem = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const hooks_1 = require("../hooks");
const ContentComponent_1 = tslib_1.__importDefault(require("./ContentComponent"));
const ContentAreaItem = props => {
    const ItemContainerElement = props.itemContainer;
    const ct = (0, hooks_1.useContent)(props.item.contentLink, undefined, undefined, props.language, undefined, props.isEditable);
    const data = ct === null || ct === void 0 ? void 0 : ct.data;
    const error = ct === null || ct === void 0 ? void 0 : ct.error;
    const itemData = data !== null && data !== void 0 ? data : error;
    const contentTypePath = itemData === null || itemData === void 0 ? void 0 : itemData.contentType;
    const dataIsLoading = data == undefined;
    const bodyFactory = () => dataIsLoading ? <>Loading...</> : <ContentComponent_1.default content={data} contentType={contentTypePath} locale={props.language} prefix="block"/>;
    const contentId = dataIsLoading ? props.item.contentLink.id : data.contentLink.id;
    //console.log('LIB ContentAreaItem:', props.isEditable, props.passEpiData, contentId)
    if (!props.isEditable)
        return <ItemContainerElement {...props.item} componentIsLoading={false} dataIsLoading={dataIsLoading}>{bodyFactory()}</ItemContainerElement>;
    if (props.passEpiData) {
        return <ItemContainerElement {...props.item} dataEpiBlockId={contentId} componentIsLoading={false} dataIsLoading={dataIsLoading}>{bodyFactory()}</ItemContainerElement>;
    }
    return <div className='content-area-item-edit' data-epi-block-id={contentId}>
        <ItemContainerElement {...props.item} componentIsLoading={false} dataIsLoading={dataIsLoading}>{bodyFactory()}</ItemContainerElement>
    </div>;
};
exports.ContentAreaItem = ContentAreaItem;
exports.ContentAreaItem.defaultProps = {
    passEpiData: false
};
exports.ContentAreaItem.displayName = "Optimizely CMS: Content Area Item";
exports.default = exports.ContentAreaItem;
//# sourceMappingURL=ContentAreaItem.jsx.map