"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUser = void 0;
function isUser(toTest) {
    return typeof (toTest) === 'object' && toTest !== null && toTest.source === 'CMS11OAuth';
}
exports.isUser = isUser;
//# sourceMappingURL=guards.js.map