"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorContentClass = void 0;
/**
 * A default implmenetation of ErrorContent that is both an Exception
 * (e.g. it extends Error) and implements the ErrorContent interface
 * so it can be rendered as a component
 */
class ErrorContentClass extends Error {
    constructor(errorType, code, message, contentReference, details) {
        super(`ErrorContent: ${errorType}(${code}): ${message}; Content Reference: ${contentReference}`);
        this.contentLink = {
            id: 0,
            guidValue: "00000000-0000-0000-0000-000000000000",
            url: ""
        };
        this.contentType = ["Error", errorType];
        this.name = "Error",
            this.language = {
                displayName: "English",
                name: "en"
            },
            this.isError = true,
            this.errorData = {
                code,
                message,
                details
            },
            this.contentReference = contentReference;
    }
}
exports.ErrorContentClass = ErrorContentClass;
//# sourceMappingURL=error-content.js.map