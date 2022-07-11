import { CMS12OIDC as OptimizelyProvider } from './provider';
import { isRefreshTokenError, refreshToken } from './helpers';
const OptimizelyHost = process.env.OPTIMIZELY_DXP_URL ?? '';
const OptimizelyClientId = process.env.OPTIMIZELY_DXP_WEB_CLIENT_ID ?? process.env.OPTIMIZELY_DXP_CLIENT_ID ?? 'frontend';
export const Cms12NextAuthOptions = {
    providers: [
        OptimizelyProvider({
            host: OptimizelyHost,
            clientId: OptimizelyClientId,
        }),
    ],
    callbacks: {
        jwt: async ({ token, account, user }) => {
            if (account && user) {
                const newToken = {
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    accessTokenExpires: (account.expires_at ?? 0) * 1000,
                    scope: account.scope ?? '',
                    user
                };
                return newToken;
            }
            const now = Date.now();
            const accessTokenExpires = token.accessTokenExpires ?? 0;
            if (accessTokenExpires <= now) {
                const newToken = await refreshToken(OptimizelyHost, token.refreshToken, OptimizelyClientId);
                if (isRefreshTokenError(newToken))
                    token.error = newToken.error;
                else
                    return {
                        ...token,
                        error: null,
                        accessToken: newToken.access_token,
                        refreshToken: newToken.refresh_token,
                        accessTokenExpires: Date.now() + ((newToken.expires_in ?? 0) * 1000),
                    };
            }
            return token;
        },
        session: ({ session, user, token }) => {
            session.user = user ?? token.user;
            session.scope = token.scope ?? '';
            session.at = token.accessToken;
            session.error = token.error;
            return session;
        }
    }
};
//# sourceMappingURL=service.js.map