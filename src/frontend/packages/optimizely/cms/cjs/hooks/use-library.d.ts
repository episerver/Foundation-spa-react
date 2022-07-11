/**
 * The statuses of the library loading
 */
export declare enum UseLibraryStatus {
    Loading = "ULS-LOADING",
    Ready = "ULS-READY",
    NotAvailable = "ULS-NOTAVAILABLE"
}
export declare type UseLibraryResponse<K extends keyof Window> = {
    lib: Window[K] | undefined;
    status: UseLibraryStatus;
};
/**
 * React Hook to load an external script into the browser (if it's not already
 * available) and return the loaded script.
 *
 * @param       script          The URL of the script to load if the library is
 *                              not yet available.
 * @param       globalVar       The global variable (in the window scope) that
 *                              will be populated by the script.
 * @param       doNotLoad       A function that should return a value evaluating
 *                              to "true" when the script should not be injected.
 * @returns     A response containing both the loading status and
 */
export declare const useLibrary: <K extends keyof Window>(script: string, globalVar: K, doNotLoad?: () => boolean) => UseLibraryResponse<K>;
