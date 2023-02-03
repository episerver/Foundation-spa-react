import { DefaultComponentLoader } from './loader/default-loader';
console.warn("The loader instance management has been deprectad and must be implemented in the application - these methods will be removed");
let currentLoader;
/**
 *
 * @deprecated      Applications should maintain their own reference to the desired loader instance
 * @param loader
 */
export const setLoader = loader => {
    currentLoader = loader;
};
/**
 *
 * @deprecated      Applications should maintain their own reference to the desired loader instance
 * @returns         They dynamic component loader
 */
export const getLoader = () => {
    if (!currentLoader) {
        if (!DefaultComponentLoader)
            throw new Error("Unable to create the default loader, please invoke 'setLoader' manually with the desired loader.");
        currentLoader = new DefaultComponentLoader();
    }
    return currentLoader;
};
/**
 *
 * @deprecated      Applications should maintain their own reference to the desired loader instance
 * @returns
 */
export const hasLoader = () => {
    return typeof (currentLoader) == "object" && currentLoader !== null && typeof (currentLoader.dynamicModuleAsync) === 'function';
};
export default getLoader;
//# sourceMappingURL=get-loader.js.map