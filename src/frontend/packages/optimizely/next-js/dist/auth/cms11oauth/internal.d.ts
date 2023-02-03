import * as CredProvider from 'next-auth/providers/credentials';
import { Credentials } from './types';
export declare const CMS11_AUTH_SERVICE = "api/episerver/auth/token";
export type BaseCredAuthArgs = Partial<Omit<CredProvider.CredentialsConfig<Credentials>, "options">> & Pick<CredProvider.CredentialsConfig<Credentials>, "authorize" | "credentials">;
