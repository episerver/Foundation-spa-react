"use strict";
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cms12NextAuthOptions = void 0;
const tslib_1 = require("tslib");
const provider_1 = require("./provider");
const helpers_1 = require("./helpers");
const OptimizelyHost = (_a = process.env.OPTIMIZELY_DXP_URL) !== null && _a !== void 0 ? _a : '';
const OptimizelyClientId = (_c = (_b = process.env.OPTIMIZELY_DXP_WEB_CLIENT_ID) !== null && _b !== void 0 ? _b : process.env.OPTIMIZELY_DXP_CLIENT_ID) !== null && _c !== void 0 ? _c : 'frontend';
exports.Cms12NextAuthOptions = {
    providers: [
        (0, provider_1.CMS12OIDC)({
            host: OptimizelyHost,
            clientId: OptimizelyClientId,
        }),
    ],
    callbacks: {
        jwt: ({ token, account, user }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            var _d, _e, _f, _g;
            if (account && user) {
                const newToken = {
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    accessTokenExpires: ((_d = account.expires_at) !== null && _d !== void 0 ? _d : 0) * 1000,
                    scope: (_e = account.scope) !== null && _e !== void 0 ? _e : '',
                    user
                };
                return newToken;
            }
            const now = Date.now();
            const accessTokenExpires = (_f = token.accessTokenExpires) !== null && _f !== void 0 ? _f : 0;
            if (accessTokenExpires <= now) {
                const newToken = yield (0, helpers_1.refreshToken)(OptimizelyHost, token.refreshToken, OptimizelyClientId);
                if ((0, helpers_1.isRefreshTokenError)(newToken))
                    token.error = newToken.error;
                else
                    return Object.assign(Object.assign({}, token), { error: null, accessToken: newToken.access_token, refreshToken: newToken.refresh_token, accessTokenExpires: Date.now() + (((_g = newToken.expires_in) !== null && _g !== void 0 ? _g : 0) * 1000) });
            }
            return token;
        }),
        session: ({ session, user, token }) => {
            var _a;
            session.user = user !== null && user !== void 0 ? user : token.user;
            session.scope = (_a = token.scope) !== null && _a !== void 0 ? _a : '';
            session.at = token.accessToken;
            session.error = token.error;
            return session;
        }
    }
};
//# sourceMappingURL=service.js.map