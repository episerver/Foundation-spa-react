import type { ComponentType } from 'react';
import type { ComponentLoader, DynamicProps } from "./types";
/**
 * Default implementation of the component loader, assuming all
 * components are accessible within: @components/.... to allow
 * for dynamic import building
 */
export declare class DefaultComponentLoader implements ComponentLoader {
    readonly prefix: string;
    get AsyncComponents(): Record<string, Promise<any>>;
    get R(): any;
    get M(): any;
    constructor();
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
