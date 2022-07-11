import type { FunctionComponent } from 'react';
export declare type ContextProviderProps = {
    trackerDomain?: string;
    trackerName?: string;
    enableDebug?: boolean;
    defaultLocale?: string;
    odpJsUrl?: string;
    odpId?: string;
};
export declare const ContextProvider: FunctionComponent<ContextProviderProps>;
export default ContextProvider;
