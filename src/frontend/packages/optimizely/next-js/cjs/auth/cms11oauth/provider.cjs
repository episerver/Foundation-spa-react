"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CMS11OAuth = void 0;
const tslib_1 = require("tslib");
const CredProvider = require("next-auth/providers/credentials");
const client_1 = require("./client");
const CMS11OAuth = options => {
    var _a;
    const args = Object.assign(Object.assign({}, options), { type: "credentials", credentials: (_a = options.credentials) !== null && _a !== void 0 ? _a : {
            username: {
                label: "E-Mail",
                placeholder: "you@example.com",
                type: "text"
            },
            password: {
                label: "Password",
                type: "password"
            }
        }, authorize: (creds) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const api = new client_1.OAuthClient(options.baseUrl);
            const userToken = yield api.login(creds === null || creds === void 0 ? void 0 : creds.username, creds === null || creds === void 0 ? void 0 : creds.password);
            if (!userToken)
                return null;
            const user = {
                id: userToken.username,
                email: userToken.username,
                token: userToken,
                source: 'CMS11OAuth'
            };
            return user;
        }) });
    return CredProvider.default(args);
};
exports.CMS11OAuth = CMS11OAuth;
exports.default = exports.CMS11OAuth;
//# sourceMappingURL=provider.js.map