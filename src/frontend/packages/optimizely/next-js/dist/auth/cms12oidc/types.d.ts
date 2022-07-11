import type { User } from 'next-auth';
import type { OAuthConfig } from 'next-auth/providers/oauth';
export declare type OptiCms12Config<P = any> = Partial<Omit<OAuthConfig<P>, 'wellKnown' | 'clientId' | 'clientSecret'>> & Pick<Required<OAuthConfig<P>>, 'clientId'> & Pick<OAuthConfig<P>, 'clientSecret'> & {
    host: string;
    scopes?: string[];
};
export declare type OptiCms12Provider = <P extends OptiCms12Profile = OptiCms12Profile>(options: OptiCms12Config<P>) => OAuthConfig<P>;
export declare type OptiCms12Profile = {
    sub: string;
    oi_au_id: string;
    azp: string;
    at_hash: string;
    oi_tkn_id: string;
    aud: string;
    exp: number;
    iss: string;
    iat: number;
    email?: string;
};
export declare type OptiCms12User = User & {
    role: string;
};
export declare type OidcWellKnownSchema = {
    userinfo_endpoint?: string;
    token_endpoint?: string;
    grant_types_supported?: string[];
};
export declare type RefreshTokenSet = {
    access_token: string;
    access_type: string;
    expires_in: number;
    scope: string;
    id_token: string;
    refresh_token: string;
};
export declare type RefreshTokenError = {
    error: string;
    error_type: "no_service" | "not_supported" | "failed" | "other";
};
export declare type RefreshTokenResponse = RefreshTokenSet | RefreshTokenError;
