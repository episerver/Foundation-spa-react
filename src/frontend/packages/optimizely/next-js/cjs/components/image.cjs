"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
const react_1 = require("react");
const image_1 = require("next/image");
const __1 = require("..");
const utils_1 = require("@optimizely/cms/utils");
const Image = props => {
    var _a;
    let newSrc = (_a = utils_1.ContentReference.createContentUrl(props.src)) !== null && _a !== void 0 ? _a : "#image";
    const imgProps = Object.assign(Object.assign({}, props), { src: newSrc, loader: __1.OptimizelyImageLoader });
    return react_1.default.createElement(image_1.default, Object.assign({}, imgProps));
};
exports.Image = Image;
exports.Image.displayName = "Optimizely CDN Image Delivery";
//# sourceMappingURL=image.js.map