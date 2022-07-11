import type { FunctionComponent, PropsWithChildren } from 'react';
import type { ComponentLoaderStatic } from '../loader/types';
import type { OptiEvents } from '../opti-on-page-editing';
export declare type ContextProviderProps = {
    cmsDomain: string;
    cmsVersion?: string;
    cmsPath?: string;
    communicatorFile?: string;
    ComponentLoaderClass?: ComponentLoaderStatic;
    defaultBranch?: string;
    currentContentId?: any;
};
export declare const ContextProvider: FunctionComponent<PropsWithChildren<ContextProviderProps>>;
export default ContextProvider;
export declare class OptimizelyContentEvent<K extends keyof OptiEvents> extends Event {
    private _data;
    get data(): OptiEvents[K];
    constructor(name: K, init: (EventInit & {
        data: OptiEvents[K];
    }));
}
