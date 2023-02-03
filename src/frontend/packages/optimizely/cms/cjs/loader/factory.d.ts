import type { ComponentLoader, ComponentLoaderStatic } from './types';
export type CreateComponentLoaderConfig = {
    loaderType?: ComponentLoaderStatic;
    args: any[];
};
export declare function createComponentLoader(config?: Partial<CreateComponentLoaderConfig>): ComponentLoader;
export default createComponentLoader;
