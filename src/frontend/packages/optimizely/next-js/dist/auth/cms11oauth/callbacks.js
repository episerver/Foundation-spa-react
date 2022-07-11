import { isUser } from './guards';
import OAuthClient from './client';
/**
 * Update the JWT Token to cary the additional fields needed to support
 * Optimizely CMS 11 authentication
 *
 * @param       params      The handler parameters
 * @returns     The JWT Token
 */
export const JWTCallback = baseUrl => async (params) => {
    // Read the current token and user
    const currentToken = params.token;
    const currentUser = params.user;
    if (isUser(currentUser) && !currentToken.refresh) {
        currentToken.refresh = currentUser.token.refresh_token;
        currentToken.auth = currentUser.token.access_token;
        currentToken.expires = currentUser.token['.expires'];
        return currentToken;
    }
    if (currentToken.expires && (new Date(currentToken.expires)) < new Date()) {
        const api = new OAuthClient(baseUrl);
        const userToken = await api.refresh(currentToken.refresh);
        if (!userToken)
            return {}; // we are no longer authenticated, so remove the data
        const token = {
            ...currentToken,
            refresh: userToken.refresh_token,
            auth: userToken.access_token,
            expires: userToken['.expires']
        };
        return token;
    }
    return currentToken;
};
/**
 * Update the Session to cary the additional fields needed to support
 * Optimizely CMS 11 authentication
 *
 * @param       params      The handler parameters
 * @returns     The Session
 */
export const SessionCallback = baseUrl => async (params) => {
    const session = params.session;
    const apiToken = params?.token?.auth ?? '';
    if (!apiToken || apiToken === '') {
        delete session.apiToken;
        delete session.user;
    }
    return session;
};
//# sourceMappingURL=callbacks.js.map