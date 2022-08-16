import { ContentLink } from '../models';
/**
 * Helper method to get the Window URL (window.location.href), and fall back to
 * the provided URL. The window URL will always be returned as a string, the
 * other return types only appear when current gets returned.
 *
 * This method does neither alter nor recreate the variables
 *
 * @param       current
 * @returns     window.location.href OR current
 */
export declare function tryGetWindowUrl(current?: string | null | URL): string | URL | null | undefined;
export declare type EditModeContentInfo = ContentLink & {
    /**
     * Set to true when we're in edit mode and the preview of the content
     * is active
     */
    isPreviewActive: boolean;
    /**
     * The current content path
     */
    contentPath: string;
    /**
     * The currently selected project, undefined if no project has been
     * selected
     */
    projectId?: number;
    /**
     * The content reference, which includes the version number as well if specified
     */
    contentReference?: string;
};
export declare function isEditModeUrl(currentUrl?: URL | string | null): boolean;
export declare function getEditModeInfo(currentUrl?: URL | string | null): EditModeContentInfo | undefined;
