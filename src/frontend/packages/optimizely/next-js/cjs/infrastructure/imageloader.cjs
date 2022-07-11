"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptimizelyImageLoader = void 0;
const OptimizelyImageLoader = props => {
    var _a;
    const imgUrl = new URL(props.src, 'http://localhost');
    if (props.width)
        imgUrl.searchParams.set('width', `${props.width}`);
    imgUrl.searchParams.set('quality', `${(_a = props.quality) !== null && _a !== void 0 ? _a : 85}`);
    return imgUrl.href;
};
exports.OptimizelyImageLoader = OptimizelyImageLoader;
//# sourceMappingURL=imageloader.js.map