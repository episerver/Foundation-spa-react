"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthClient = void 0;
const tslib_1 = require("tslib");
const cross_fetch_1 = require("cross-fetch");
const internal_1 = require("./internal");
class OAuthClient {
    constructor(baseUrl) {
        this.baseUrl = "http://localhost:56052/";
        if (baseUrl)
            this.baseUrl = baseUrl;
        this.serviceUrl = new URL(internal_1.CMS11_AUTH_SERVICE, baseUrl);
    }
    login(username, password, clientId = "Default") {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const loginBody = new URLSearchParams();
            loginBody.set('grant_type', 'password');
            loginBody.set('client_id', clientId);
            loginBody.set('username', username || '');
            loginBody.set('password', password || '');
            // Send the actual request
            const res = yield (0, cross_fetch_1.default)(this.serviceUrl.href, {
                method: 'post',
                body: loginBody,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Accept": "application/json"
                }
            });
            if (!res.ok)
                return false;
            return yield res.json();
        });
    }
    refresh(refresh_token, clientId = "Default") {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const loginBody = new URLSearchParams();
            loginBody.set('grant_type', 'refresh_token');
            loginBody.set('client_id', clientId);
            loginBody.set('refresh_token', refresh_token || '');
            // Send the actual request
            const res = yield (0, cross_fetch_1.default)(this.serviceUrl.href, {
                method: 'post',
                body: loginBody,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Accept": "application/json"
                }
            });
            if (!res.ok)
                return false;
            return yield res.json();
        });
    }
}
exports.OAuthClient = OAuthClient;
exports.default = OAuthClient;
//# sourceMappingURL=client.js.map