"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isContentLink = void 0;
function isContentLink(toTest) {
    if (typeof (toTest) !== 'object' || toTest === null)
        return false;
    return typeof (toTest.guidValue) == 'string' || typeof (toTest.id) == 'number';
}
exports.isContentLink = isContentLink;
//# sourceMappingURL=content-link.js.map