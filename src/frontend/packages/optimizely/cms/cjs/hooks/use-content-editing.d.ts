import type { OptiOnPageEditingContext } from '../opti-on-page-editing';
import type { EditModeContentInfo } from '../util/edit-mode';
export declare type CmsConfiguration = {
    cmsDomain: string;
    cmsVersion: string;
    cmsPath?: string;
    communicatorFile?: string;
};
export declare type EditModeInformation = {
    lib?: OptiOnPageEditingContext;
    info?: EditModeContentInfo;
    loading?: boolean;
    inEditMode: boolean;
    isEditable: boolean;
};
export declare const useContentEditing: ({ cmsDomain, cmsVersion, cmsPath, communicatorFile }: CmsConfiguration, currentUrl?: string | URL | null) => EditModeInformation;
export default useContentEditing;
