"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNetworkAuthError = exports.isNetworkError = exports.NetworkError = void 0;
class NetworkError extends Error {
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
    constructor(message, response) {
        super(message);
        this._type = "NetworkError";
        this._response = response;
        console.error(message);
    }
}
exports.NetworkError = NetworkError;
function isNetworkError(toTest) {
    return typeof (toTest) === 'object' && toTest !== null && toTest._type === "NetworkError";
}
exports.isNetworkError = isNetworkError;
function isNetworkAuthError(toTest) {
    return isNetworkError(toTest) && toTest.isAuthError;
}
exports.isNetworkAuthError = isNetworkAuthError;
//# sourceMappingURL=NetworkError.js.map