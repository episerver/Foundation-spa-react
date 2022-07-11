"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUser = void 0;
/**
 * Guard to verify if the provided user is an Optimizely CMS 11 OAuth
 * user
 *
 * @param       toTest      The Next-Auth User to test
 * @returns     true if it's an Optimizely CMS 11 OAuth user, false otherwise
 */
function isUser(toTest) {
    return typeof (toTest) === 'object' && toTest !== null && toTest.source === 'CMS11OAuth';
}
exports.isUser = isUser;
//# sourceMappingURL=guards.js.map