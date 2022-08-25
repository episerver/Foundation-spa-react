export * from './types';
export * from './default-loader';
import type { ComponentLoader, ComponentLoaderStatic } from './types';
export declare type CreateComponentLoaderConfig = {
    loaderType?: ComponentLoaderStatic;
    args: any[];
};
export declare function setup(config?: Partial<CreateComponentLoaderConfig>): ComponentLoader;
