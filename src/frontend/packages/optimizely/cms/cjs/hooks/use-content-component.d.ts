import type { ContentTypePath } from '../models/content-type-path';
import type { IContentComponent } from '../models/components';
import type { ComponentType } from 'react';
export type UseContentComponentResult<T extends ComponentType = IContentComponent> = {
    loading: boolean;
    data?: T | undefined;
    error: boolean;
    id?: string;
    importPath?: string;
};
export declare function useContentComponent<T extends ComponentType = IContentComponent, PropsType = T extends ComponentType<infer R> ? R : any>(contentTypePath?: ContentTypePath, prefix?: string, tag?: string): UseContentComponentResult<T>;
export default useContentComponent;
