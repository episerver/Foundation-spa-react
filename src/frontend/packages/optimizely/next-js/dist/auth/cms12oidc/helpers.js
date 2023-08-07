import fetch from 'cross-fetch';
export const OptiCms12DefaultRole = 'Everyone';
export function wellKnownEndpointFor(host) {
    return (new URL('/.well-known/openid-configuration', host || 'http://localhost')).href;
}
export function isRefreshTokenError(response) {
    return response.error ? true : false;
}
export async function refreshToken(host, refresh_token, client_id, client_secret) {
    const wellKnownUrl = wellKnownEndpointFor(host);
    console.log("CMS12OIDC.refreshToken: Fetching schema");
    const wellKnownInfo = await fetch(wellKnownUrl).then(r => r.json()).catch(() => Promise.resolve(undefined));
    if (!wellKnownInfo)
        return { error: "Unable to retrieve OIDC Service Descriptor", error_type: "no_service" };
    if (!wellKnownInfo.grant_types_supported?.includes('refresh_token'))
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
    console.log("CMS12OIDC.refreshToken: Refreshing schema");
    const refreshResponse = await fetch(tokenEndpoint, {
        method: 'POST',
        body: refresh_data.toString(),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    if (!refreshResponse.ok) {
        return { error: `Failed to refresh token. (HTTP ${refreshResponse.status}: ${refreshResponse.statusText})`, error_type: "failed" };
    }
    const tokenSet = (await refreshResponse.json());
    return tokenSet;
}
export async function loadProfile(wellKnownEndpoint, profile, token) {
    const wellKnown = wellKnownEndpoint;
    console.log("CMS12OIDC.loadProfile: Fetching schema");
    const wellKnownInfo = await fetch(wellKnown).then(r => r.json()).catch(() => Promise.resolve(undefined));
    if (!wellKnownInfo)
        return { id: profile.sub, name: '', image: '', role: OptiCms12DefaultRole };
    const userEndpoint = wellKnownInfo.userinfo_endpoint;
    if (!userEndpoint)
        return { id: profile.sub, name: '', image: '', role: OptiCms12DefaultRole };
    console.log("CMS12OIDC.loadProfile: Fetching profile");
    const profileInfo = await fetch(userEndpoint, {
        headers: {
            "Authorization": `Bearer ${token.access_token}`
        }
    }).then(r => r.json()).catch(() => Promise.resolve(undefined));
    if (!profileInfo)
        return { id: profile.sub, name: '', image: '', role: OptiCms12DefaultRole };
    const profileData = {
        id: profileInfo.sub,
        name: profileInfo.name,
        image: '',
        email: profileInfo.email,
        role: profileInfo.role.join(':')
    };
    return profileData;
}
//# sourceMappingURL=helpers.js.map