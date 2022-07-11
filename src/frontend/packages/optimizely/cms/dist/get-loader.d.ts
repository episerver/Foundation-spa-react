import type { ComponentLoader } from './loader/types';
/**
 *
 * @deprecated      Applications should maintain their own reference to the desired loader instance
 * @param loader
 */
export declare const setLoader: (loader: ComponentLoader) => void;
/**
 *
 * @deprecated      Applications should maintain their own reference to the desired loader instance
 * @returns         They dynamic component loader
 */
export declare const getLoader: () => ComponentLoader;
/**
 *
 * @deprecated      Applications should maintain their own reference to the desired loader instance
 * @returns
 */
export declare const hasLoader: () => boolean;
export default getLoader;
