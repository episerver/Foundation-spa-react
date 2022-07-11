/// <reference types="react" />
import type { ComponentLoader } from '../loader';
import type { IContentDeliveryAPI } from '../content-delivery';
import type { EditModeContentInfo } from '../util/edit-mode';
export declare type ContextType = {
    api?: IContentDeliveryAPI;
    loader?: ComponentLoader;
    isReady: boolean;
    isEditable: boolean;
    inEditMode: boolean;
    defaultBranch: string;
    editableContent?: EditModeContentInfo;
    currentContentId?: any;
};
export declare const Context: import("react").Context<ContextType>;
export default Context;
