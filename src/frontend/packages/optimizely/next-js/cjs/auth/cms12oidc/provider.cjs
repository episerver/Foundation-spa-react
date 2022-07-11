"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CMS12OIDC = void 0;
const tslib_1 = require("tslib");
const helpers_1 = require("./helpers");
const defaultScopes = [
    "openid",
    "offline_access",
    "profile",
    "email",
    "roles",
    "epi_content_delivery",
    "epi_content_management",
    "epi_content_definitions"
];
const CMS12OIDC = (options) => {
    var _a;
    const wellKnown = (0, helpers_1.wellKnownEndpointFor)(options.host);
    const scopes = defaultScopes;
    (_a = options.scopes) === null || _a === void 0 ? void 0 : _a.forEach(scope => {
        if (!scopes.includes(scope))
            scopes.push(scope);
    });
    const defaultOptions = {
        id: "opticms12",
        name: "Optimizely Content Cloud",
        type: "oauth",
        wellKnown,
        authorization: { params: { scope: scopes.join(' ') } },
        idToken: true,
        checks: ["pkce", "state"],
        client: {
            token_endpoint_auth_method: 'none',
            introspection_endpoint_auth_method: 'none',
            revocation_endpoint_auth_method: 'none',
        },
        profile: (profile, tokens) => tslib_1.__awaiter(void 0, void 0, void 0, function* () { return (0, helpers_1.loadProfile)(wellKnown, profile, tokens); })
    };
    const oauthConfig = Object.assign(Object.assign({}, defaultOptions), options);
    if (oauthConfig.host)
        delete oauthConfig.host;
    return oauthConfig;
};
exports.CMS12OIDC = CMS12OIDC;
exports.default = exports.CMS12OIDC;
//# sourceMappingURL=provider.js.map