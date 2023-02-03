import type { User as NextAuthUser, Profile as NextAuthProfile, Account as NextAuthAccount, CallbacksOptions } from 'next-auth'
import * as CredProvider from 'next-auth/providers/credentials'

/**
 * Define the fields needed by the customer to authenticate against
 * the OAuth service of the Content Delivery API
 */
 export interface Credentials extends Record<string, CredProvider.CredentialInput> {
    username: CredProvider.CredentialInput
    password: CredProvider.CredentialInput
}

/**
 * Definition of the CMS11 User that will be exposed
 * through the callbacks of the Optimizely CMS11 
 * Provider for Next-Auth
 */
 export interface User extends NextAuthUser 
 {
     token : ServiceToken
     source: 'CMS11OAuth'
 }
 
 export interface Profile extends NextAuthProfile {}

 export interface Account extends NextAuthAccount {}

 export type Config = {
     baseUrl: string
 } & Omit<CredProvider.CredentialsConfig<Credentials>, 'type' | 'authorize' | 'options'>

 export type ServiceToken = { 
     access_token: string, 
     token_type: 'bearer', 
     expires_in: number, 
     refresh_token: string, 
     client_id: string, 
     username: string, 
     ".issued": string, 
     ".expires": string
}

 export type Provider = (options: Partial<Config>) => CredProvider.CredentialsConfig<Credentials>

 export type JWTCallback = CallbacksOptions<Profile, Account>['jwt']
 export type SessionCallback = CallbacksOptions<Profile, Account>['session']
 export type RedirectCallback = CallbacksOptions<Profile, Account>['redirect']
 export type SignInCallback = CallbacksOptions<Profile, Account>['signIn']