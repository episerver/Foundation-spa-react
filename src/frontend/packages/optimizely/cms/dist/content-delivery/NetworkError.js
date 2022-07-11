export class NetworkError extends Error {
    constructor(message, response) {
        super(message);
        this._type = "NetworkError";
        this._response = response;
        console.error(message);
    }
    /**
     * @deprecated      Do not use this as this will make your code dependant on the Response implementations
     */
    get response() {
        return this._response;
    }
    get isAuthError() {
        return this._response.status === 401;
    }
    get status() {
        return this._response.status;
    }
    get statusText() {
        return this._response.statusText;
    }
}
export function isNetworkError(toTest) {
    return typeof (toTest) === 'object' && toTest !== null && toTest._type === "NetworkError";
}
export function isNetworkAuthError(toTest) {
    return isNetworkError(toTest) && toTest.isAuthError;
}
//# sourceMappingURL=NetworkError.js.map