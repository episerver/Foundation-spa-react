"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasLoader = exports.getLoader = exports.setLoader = void 0;
const default_loader_1 = require("./loader/default-loader");
console.warn("The loader instance management has been deprectad and must be implemented in the application - these methods will be removed");
let currentLoader;
/**
 *
 * @deprecated      Applications should maintain their own reference to the desired loader instance
 * @param loader
 */
const setLoader = loader => {
    currentLoader = loader;
};
exports.setLoader = setLoader;
/**
 *
 * @deprecated      Applications should maintain their own reference to the desired loader instance
 * @returns         They dynamic component loader
 */
const getLoader = () => {
    if (!currentLoader) {
        if (!default_loader_1.DefaultComponentLoader)
            throw new Error("Unable to create the default loader, please invoke 'setLoader' manually with the desired loader.");
        currentLoader = new default_loader_1.DefaultComponentLoader();
    }
    return currentLoader;
};
exports.getLoader = getLoader;
/**
 *
 * @deprecated      Applications should maintain their own reference to the desired loader instance
 * @returns
 */
const hasLoader = () => {
    return typeof (currentLoader) == "object" && currentLoader !== null && typeof (currentLoader.dynamicModuleAsync) === 'function';
};
exports.hasLoader = hasLoader;
exports.default = exports.getLoader;
//# sourceMappingURL=get-loader.js.map