"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadProfile = exports.refreshToken = exports.isRefreshTokenError = exports.wellKnownEndpointFor = exports.OptiCms12DefaultRole = void 0;
const tslib_1 = require("tslib");
const cross_fetch_1 = tslib_1.__importDefault(require("cross-fetch"));
exports.OptiCms12DefaultRole = 'Everyone';
function wellKnownEndpointFor(host) {
    return (new URL('/.well-known/openid-configuration', host || 'http://localhost')).href;
}
exports.wellKnownEndpointFor = wellKnownEndpointFor;
function isRefreshTokenError(response) {
    return response.error ? true : false;
}
exports.isRefreshTokenError = isRefreshTokenError;
function refreshToken(host, refresh_token, client_id, client_secret) {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const wellKnownUrl = wellKnownEndpointFor(host);
        const wellKnownInfo = yield (0, cross_fetch_1.default)(wellKnownUrl).then(r => r.json()).catch(() => Promise.resolve(undefined));
        if (!wellKnownInfo)
            return { error: "Unable to retrieve OIDC Service Descriptor", error_type: "no_service" };
        if (!((_a = wellKnownInfo.grant_types_supported) === null || _a === void 0 ? void 0 : _a.includes('refresh_token')))
            return { error: "Identity provider does not support refreshing tokens", error_type: "not_supported" };
        const tokenEndpoint = wellKnownInfo.token_endpoint;
        if (!tokenEndpoint)
            return { error: "Identity provider does not support tokens", error_type: "not_supported" };
        const refresh_data = new URLSearchParams({
            client_id,
            grant_type: "refresh_token",
            refresh_token
        });
        if (client_secret)
            refresh_data.set('client_secret', client_secret);
        const refreshResponse = yield (0, cross_fetch_1.default)(tokenEndpoint, {
            method: 'POST',
            body: refresh_data.toString(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        if (!refreshResponse.ok) {
            return { error: `Failed to refresh token. (HTTP ${refreshResponse.status}: ${refreshResponse.statusText})`, error_type: "failed" };
        }
        const tokenSet = (yield refreshResponse.json());
        return tokenSet;
    });
}
exports.refreshToken = refreshToken;
function loadProfile(wellKnownEndpoint, profile, token) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const wellKnown = wellKnownEndpoint;
        const wellKnownInfo = yield (0, cross_fetch_1.default)(wellKnown).then(r => r.json()).catch(() => Promise.resolve(undefined));
        if (!wellKnownInfo)
            return { id: profile.sub, name: '', image: '', role: exports.OptiCms12DefaultRole };
        const userEndpoint = wellKnownInfo.userinfo_endpoint;
        if (!userEndpoint)
            return { id: profile.sub, name: '', image: '', role: exports.OptiCms12DefaultRole };
        const profileInfo = yield (0, cross_fetch_1.default)(userEndpoint, {
            headers: {
                "Authorization": `Bearer ${token.access_token}`
            }
        }).then(r => r.json()).catch(() => Promise.resolve(undefined));
        if (!profileInfo)
            return { id: profile.sub, name: '', image: '', role: exports.OptiCms12DefaultRole };
        const profileData = {
            id: profileInfo.sub,
            name: profileInfo.name,
            image: '',
            email: profileInfo.email,
            role: profileInfo.role.join(':')
        };
        return profileData;
    });
}
exports.loadProfile = loadProfile;
//# sourceMappingURL=helpers.js.map