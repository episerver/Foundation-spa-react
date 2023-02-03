import type { FunctionComponent, PropsWithChildren } from 'react';
import { ContentReference } from '../models/content-link';
export type EditModeContextData = {
    isEditable: boolean;
    inEditMode: boolean;
    isReady: boolean;
    contentId?: number;
    contentWorkId?: number;
    contentGuid?: string;
    contentReference?: string;
};
export type OptimizelyEditModeProps = {
    currentUrl?: URL | string | null;
    cmsDomain: string;
    cmsPath?: string;
    cmsVersion?: string;
    communicatorFile?: string;
};
export declare const OptimizelyEditMode: FunctionComponent<PropsWithChildren<OptimizelyEditModeProps>>;
export declare const useEditMode: () => EditModeContextData;
export declare const useContentEditMode: (iContent?: ContentReference) => EditModeContextData & {
    contentEditable: boolean;
};
