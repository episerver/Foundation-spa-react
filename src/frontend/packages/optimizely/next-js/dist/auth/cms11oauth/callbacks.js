import { isUser } from './guards';
import OAuthClient from './client';
export const JWTCallback = baseUrl => async (params) => {
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
            return {};
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