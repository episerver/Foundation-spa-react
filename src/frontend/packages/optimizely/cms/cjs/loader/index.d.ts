export * from './types';
export * from './default-loader';
import type { ComponentLoader, ComponentLoaderStatic } from './types';
export declare type CreateComponentLoaderConfig = {
    loaderType?: ComponentLoaderStatic;
};
export declare function setup(config?: Partial<CreateComponentLoaderConfig>): ComponentLoader;
