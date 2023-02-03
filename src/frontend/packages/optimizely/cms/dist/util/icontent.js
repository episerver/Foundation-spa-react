import { ErrorContentClass } from '../models/error-content';
export function isIContent(toTest) {
    if (!toTest)
        return false; // IContent may not be undefined
    if (typeof (toTest) !== 'object' || toTest === null)
        return false; // IContent must be an object and may not be null
    return Array.isArray(toTest.contentType) && toTest.contentType.length > 0 && (toTest.contentLink?.guidValue || toTest.contentLink?.id);
}
export function createErrorContent(errorType, code, message, contentReference, details) {
    return new ErrorContentClass(errorType, code, message, contentReference, details);
}
//# sourceMappingURL=icontent.js.map