import { useRef, useState, useEffect, useMemo } from 'react';
/**
 * The statuses of the library loading
 */
export var UseLibraryStatus;
(function (UseLibraryStatus) {
    UseLibraryStatus["Loading"] = "ULS-LOADING";
    UseLibraryStatus["Ready"] = "ULS-READY";
    UseLibraryStatus["NotAvailable"] = "ULS-NOTAVAILABLE";
})(UseLibraryStatus || (UseLibraryStatus = {}));
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
export const useLibrary = (script, globalVar, doNotLoad = () => false) => {
    const lib = useRef(undefined);
    const [status, setStatus] = useState(UseLibraryStatus.Loading);
    if (status == UseLibraryStatus.Loading)
        try {
            if (window && window[globalVar]) {
                lib.current = window[globalVar];
                setStatus(UseLibraryStatus.Ready);
            }
        }
        catch {
            // Ignore errors, we're running server side most likely
        }
    useEffect(() => {
        // First check if the effect has been disabled, if not set loading state
        if (doNotLoad()) {
            setStatus(UseLibraryStatus.NotAvailable);
            return;
        }
        if (lib.current)
            return;
        // Cancellation marker for async operations triggered by this effect
        let cancelled = false;
        whenReadyState('complete').then(() => {
            if (cancelled)
                throw new Error("Cancelled process");
            const scriptTag = document.createElement('script');
            scriptTag.setAttribute("data-generator", "useLibrary");
            scriptTag.src = script;
            //script.crossOrigin = "use-credentials"
            //script.referrerPolicy = "strict-origin-when-cross-origin"
            scriptTag.async = false;
            scriptTag.defer = true;
            document.body.appendChild(scriptTag);
            return whenSet(() => window[globalVar], 10);
        }).then(x => {
            if (cancelled)
                throw new Error("Cancelled process");
            lib.current = x;
            setStatus(UseLibraryStatus.Ready);
        }).catch(() => { });
        return () => {
            cancelled = true;
        };
    }, [script, globalVar, doNotLoad]);
    return useMemo(() => {
        return { lib: lib.current, status: status };
    }, [status]);
};
function whenSet(premise, interval = 10) {
    const current = premise();
    if (current !== undefined)
        return Promise.resolve(current);
    return new Promise(resolve => {
        const i = setInterval(() => {
            const value = premise();
            if (value !== undefined) {
                clearInterval(i);
                resolve(value);
            }
        }, interval);
    });
}
function whenReadyState(value) {
    try {
        if (document.readyState === value)
            return Promise.resolve(true);
        return new Promise((resolve, reject) => {
            function handler() {
                try {
                    if (document.readyState === value) {
                        document.removeEventListener('readystatechange', handler);
                        resolve(true);
                    }
                }
                catch (e) {
                    reject(e);
                }
            }
            try {
                document.addEventListener('readystatechange', handler);
            }
            catch (e) {
                reject(e);
            }
        });
    }
    catch (e) {
        return Promise.reject(e);
    }
}
//# sourceMappingURL=use-library.js.map