import type { JWTCallback as JWTCallbackType, SessionCallback as SessionCallbackType } from './types';
/**
 * Update the JWT Token to cary the additional fields needed to support
 * Optimizely CMS 11 authentication
 *
 * @param       params      The handler parameters
 * @returns     The JWT Token
 */
export declare const JWTCallback: (baseUrl: string) => JWTCallbackType;
/**
 * Update the Session to cary the additional fields needed to support
 * Optimizely CMS 11 authentication
 *
 * @param       params      The handler parameters
 * @returns     The Session
 */
export declare const SessionCallback: (baseUrl: string) => SessionCallbackType;
