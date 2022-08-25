import type { ComponentType } from 'react';
import type { ComponentLoader, DynamicProps } from "./types";
import type { ContextType } from '../provider/context';
export declare type ComponentsCache = Required<ContextType>['components'];
/**
 * Default implementation of the component loader, assuming all
 * components are accessible within: @components/cms.... to allow
 * for dynamic import building
 */
export declare class DefaultComponentLoader implements ComponentLoader {
    readonly prefix: string;
    protected readonly cache: ComponentsCache;
    get AsyncComponents(): Record<string, Promise<any>>;
    constructor(cache?: ComponentsCache);
    buildComponentImport(path: string[], prefix?: string, tag?: string): string;
    dynamicSync<P = DynamicProps>(path: string[], prefix?: string, tag?: string): ComponentType<P>;
    dynamicAsync<P = DynamicProps>(path: string[], prefix?: string, tag?: string): Promise<ComponentType<P>>;
    dynamicModuleSync<MT>(path: string[], prefix?: string, tag?: string): MT | undefined;
    dynamicModuleAsync<MT = any>(path: string[], prefix?: string, tag?: string): Promise<any>;
    tryDynamicSync<P = DynamicProps>(path: string[], prefix?: string, tag?: string): ComponentType<P> | undefined;
    tryDynamicModuleSync<MT = any>(path: string[], prefix?: string, tag?: string): MT | undefined;
    tryDynamicAsync<P = DynamicProps>(path: string[], prefix?: string, tag?: string): Promise<ComponentType<P> | undefined>;
    tryDynamicModuleAsync(path: string[], prefix?: string, tag?: string): Promise<any>;
}
