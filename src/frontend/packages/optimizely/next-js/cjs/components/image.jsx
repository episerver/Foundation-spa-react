"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const image_1 = tslib_1.__importDefault(require("next/image"));
const __1 = require("..");
const utils_1 = require("@optimizely/cms/utils");
const Image = props => {
    var _a;
    let newSrc = (_a = utils_1.ContentReference.createContentUrl(props.src)) !== null && _a !== void 0 ? _a : "#image";
    const imgProps = Object.assign(Object.assign({}, props), { src: newSrc, loader: __1.OptimizelyImageLoader });
    return <image_1.default {...imgProps}/>;
};
exports.Image = Image;
exports.Image.displayName = "Optimizely CDN Image Delivery";
//# sourceMappingURL=image.jsx.map