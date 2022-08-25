import type { OptiCms12Profile, OptiCms12User, OidcWellKnownSchema, RefreshTokenResponse, RefreshTokenError, RefreshTokenSet } from './types'
import type { TokenSet } from 'next-auth'
import fetch from 'cross-fetch'

export const OptiCms12DefaultRole = 'Everyone'

export function wellKnownEndpointFor(host: string) : string
{
    return (new URL('/.well-known/openid-configuration', host || 'http://localhost')).href
}
export function isRefreshTokenError(response: RefreshTokenResponse) : response is RefreshTokenError
{
    return (response as RefreshTokenError).error ? true : false
}

export async function refreshToken(host: string, refresh_token: string, client_id: string, client_secret?: string) : Promise<RefreshTokenResponse>
{
    const wellKnownUrl = wellKnownEndpointFor(host)
    const wellKnownInfo = await fetch(wellKnownUrl).then(r => r.json() as Promise<OidcWellKnownSchema>).catch(() => Promise.resolve(undefined))
    if (!wellKnownInfo)
        return { error: "Unable to retrieve OIDC Service Descriptor", error_type: "no_service"}

    if (!wellKnownInfo.grant_types_supported?.includes('refresh_token'))
        return { error: "Identity provider does not support refreshing tokens", error_type: "not_supported" }

    const tokenEndpoint = wellKnownInfo.token_endpoint
    if (!tokenEndpoint)
        return { error: "Identity provider does not support tokens", error_type: "not_supported" }

    const refresh_data = new URLSearchParams({
        client_id,
        grant_type: "refresh_token",
        refresh_token
    })
    if (client_secret) 
        refresh_data.set('client_secret', client_secret)

    const refreshResponse = await fetch(tokenEndpoint, {
        method: 'POST',
        body: refresh_data.toString(),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })

    if (!refreshResponse.ok) {
        //const errorBody = await refreshResponse.text()
        //console.error("Service error body", errorBody)
        return {error: `Failed to refresh token. (HTTP ${refreshResponse.status}: ${refreshResponse.statusText})`, error_type: "failed"}
    }
    
    const tokenSet = (await refreshResponse.json()) as RefreshTokenSet

    return tokenSet
}

export async function loadProfile<P extends OptiCms12Profile = OptiCms12Profile>(wellKnownEndpoint: string, profile: P, token: TokenSet) : Promise<OptiCms12User>
{
    const wellKnown = wellKnownEndpoint
    const wellKnownInfo = await fetch(wellKnown).then(r => r.json() as Promise<OidcWellKnownSchema>).catch(() => Promise.resolve(undefined))
    if (!wellKnownInfo)
        return { id: profile.sub, name: '', image: '', role: OptiCms12DefaultRole }

    const userEndpoint = wellKnownInfo.userinfo_endpoint
    if (!userEndpoint)
        return { id: profile.sub, name: '', image: '', role: OptiCms12DefaultRole }

    const profileInfo = await fetch(userEndpoint, {
        headers: {
            "Authorization": `Bearer ${ token.access_token }`
        }
    }).then(r => r.json() as Promise<{
        sub: string
        email: string
        name: string
        role: string[]
    }>).catch(() => Promise.resolve(undefined))
    if (!profileInfo)
        return { id: profile.sub, name: '', image: '', role: OptiCms12DefaultRole }

    const profileData : OptiCms12User = {
        id: profileInfo.sub,
        name: profileInfo.name,
        image: '',
        email: profileInfo.email,
        role: profileInfo.role.join(':')
    }
    return profileData  
}