export declare class NetworkError extends Error {
    private _response;
    readonly _type: string;
    /**
     * @deprecated      Do not use this as this will make your code dependant on the Response implementations
     */
    get response(): Response;
    get isAuthError(): boolean;
    get status(): number;
    get statusText(): string;
    constructor(message: string, response: Response);
}
export declare function isNetworkError(toTest: any): toTest is NetworkError;
export declare function isNetworkAuthError(toTest: any): toTest is NetworkError;
