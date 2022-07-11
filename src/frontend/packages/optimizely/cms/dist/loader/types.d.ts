import { ComponentType } from 'react';
export declare type DynamicProps = Record<string, any>;
export declare type ComponentLoaderStatic = {
    new (): ComponentLoader;
    name?: string;
};
export interface ComponentLoader {
    readonly prefix: string;
    buildComponentImport(path: string[], prefix?: string, tag?: string): string;
    dynamicSync<P = DynamicProps>(path: string[], prefix?: string, tag?: string): ComponentType<P>;
    dynamicAsync<P = DynamicProps>(path: string[], prefix?: string, tag?: string): Promise<ComponentType<P>>;
    tryDynamicSync<P = DynamicProps>(path: string[], prefix?: string, tag?: string): ComponentType<P> | undefined;
    tryDynamicAsync<P = DynamicProps>(path: string[], prefix?: string, tag?: string): Promise<ComponentType<P> | undefined>;
    dynamicModuleSync<MT = any>(path: string[], prefix?: string, tag?: string): MT | undefined;
    dynamicModuleAsync<MT = any>(path: string[], prefix?: string, tag?: string): Promise<MT | undefined>;
    tryDynamicModuleSync<MT = any>(path: string[], prefix?: string, tag?: string): MT | undefined;
    tryDynamicModuleAsync<MT = any>(path: string[], prefix?: string, tag?: string): Promise<MT | undefined>;
}
