"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionCallback = exports.JWTCallback = void 0;
const tslib_1 = require("tslib");
const guards_1 = require("./guards");
const client_1 = require("./client");
/**
 * Update the JWT Token to cary the additional fields needed to support
 * Optimizely CMS 11 authentication
 *
 * @param       params      The handler parameters
 * @returns     The JWT Token
 */
const JWTCallback = baseUrl => (params) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    // Read the current token and user
    const currentToken = params.token;
    const currentUser = params.user;
    if ((0, guards_1.isUser)(currentUser) && !currentToken.refresh) {
        currentToken.refresh = currentUser.token.refresh_token;
        currentToken.auth = currentUser.token.access_token;
        currentToken.expires = currentUser.token['.expires'];
        return currentToken;
    }
    if (currentToken.expires && (new Date(currentToken.expires)) < new Date()) {
        const api = new client_1.default(baseUrl);
        const userToken = yield api.refresh(currentToken.refresh);
        if (!userToken)
            return {}; // we are no longer authenticated, so remove the data
        const token = Object.assign(Object.assign({}, currentToken), { refresh: userToken.refresh_token, auth: userToken.access_token, expires: userToken['.expires'] });
        return token;
    }
    return currentToken;
});
exports.JWTCallback = JWTCallback;
/**
 * Update the Session to cary the additional fields needed to support
 * Optimizely CMS 11 authentication
 *
 * @param       params      The handler parameters
 * @returns     The Session
 */
const SessionCallback = baseUrl => (params) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const session = params.session;
    const apiToken = (_b = (_a = params === null || params === void 0 ? void 0 : params.token) === null || _a === void 0 ? void 0 : _a.auth) !== null && _b !== void 0 ? _b : '';
    if (!apiToken || apiToken === '') {
        delete session.apiToken;
        delete session.user;
    }
    return session;
});
exports.SessionCallback = SessionCallback;
//# sourceMappingURL=callbacks.js.map