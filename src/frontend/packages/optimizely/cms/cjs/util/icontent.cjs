"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createErrorContent = exports.isIContent = void 0;
function isIContent(toTest) {
    var _a, _b;
    if (!toTest)
        return false; // IContent may not be undefined
    if (typeof (toTest) !== 'object' || toTest === null)
        return false; // IContent must be an object and may not be null
    return Array.isArray(toTest.contentType) && toTest.contentType.length > 0 && (((_a = toTest.contentLink) === null || _a === void 0 ? void 0 : _a.guidValue) || ((_b = toTest.contentLink) === null || _b === void 0 ? void 0 : _b.id));
}
exports.isIContent = isIContent;
function createErrorContent(errorType, code, message, contentReference, details) {
    return {
        contentLink: {
            id: 0,
            guidValue: "00000000-0000-0000-0000-000000000000",
            url: ""
        },
        contentType: ["Error", errorType],
        name: "Error",
        language: {
            displayName: "English",
            name: "en"
        },
        isError: true,
        errorData: {
            code,
            message,
            details
        },
        contentReference
    };
}
exports.createErrorContent = createErrorContent;
//# sourceMappingURL=icontent.js.map