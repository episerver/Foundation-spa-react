"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createErrorContent = exports.isIContent = void 0;
const error_content_1 = require("../models/error-content");
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
    return new error_content_1.ErrorContentClass(errorType, code, message, contentReference, details);
}
exports.createErrorContent = createErrorContent;
//# sourceMappingURL=icontent.js.map