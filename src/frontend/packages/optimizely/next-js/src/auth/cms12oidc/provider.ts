import type { OAuthConfig } from 'next-auth/providers/oauth'
import type { OptiCms12Provider, OptiCms12Profile, OptiCms12Config } from './types'
import { loadProfile, wellKnownEndpointFor } from './helpers'

const defaultScopes = [
    "openid",
    "offline_access",
    "profile",
    "email",
    "roles",
    "epi_content_delivery",
    "epi_content_management",
    "epi_content_definitions"
  ]

export const CMS12OIDC : OptiCms12Provider = <P extends OptiCms12Profile = OptiCms12Profile>(options: OptiCms12Config<P>) => {

    const wellKnown = wellKnownEndpointFor(options.host)

    const scopes : string[] = defaultScopes
    options.scopes?.forEach(scope => {
        if (!scopes.includes(scope))
            scopes.push(scope)
    })

    const defaultOptions : OAuthConfig<P> = {
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
    }

    const oauthConfig : OAuthConfig<P> & { host ?: string }= {
        ...defaultOptions,
        ...options
    }

    if (oauthConfig.host)
        delete oauthConfig.host

    return oauthConfig
}

export default CMS12OIDC
