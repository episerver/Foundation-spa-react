import type { OptiCms12Profile, OptiCms12User, RefreshTokenResponse, RefreshTokenError } from './types';
import type { TokenSet } from 'next-auth';
export declare const OptiCms12DefaultRole = "Everyone";
export declare function wellKnownEndpointFor(host: string): string;
export declare function isRefreshTokenError(response: RefreshTokenResponse): response is RefreshTokenError;
export declare function refreshToken(host: string, refresh_token: string, client_id: string, client_secret?: string): Promise<RefreshTokenResponse>;
export declare function loadProfile<P extends OptiCms12Profile = OptiCms12Profile>(wellKnownEndpoint: string, profile: P, token: TokenSet): Promise<OptiCms12User>;
