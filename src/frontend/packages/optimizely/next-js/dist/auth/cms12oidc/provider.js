import { loadProfile, wellKnownEndpointFor } from './helpers';
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
export const CMS12OIDC = (options) => {
    const wellKnown = wellKnownEndpointFor(options.host);
    const scopes = defaultScopes;
    options.scopes?.forEach(scope => {
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
        profile: async (profile, tokens) => loadProfile(wellKnown, profile, tokens)
    };
    const oauthConfig = {
        ...defaultOptions,
        ...options
    };
    if (oauthConfig.host)
        delete oauthConfig.host;
    return oauthConfig;
};
export default CMS12OIDC;
//# sourceMappingURL=provider.js.map