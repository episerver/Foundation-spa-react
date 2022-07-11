import * as CredProvider from 'next-auth/providers/credentials'
import { Credentials } from './types'

/**
 * Endpoint on the Content Delivery API
 */
export const CMS11_AUTH_SERVICE = 'api/episerver/auth/token'

export type BaseCredAuthArgs  = Partial<Omit<CredProvider.CredentialsConfig<Credentials>, "options">> & Pick<CredProvider.CredentialsConfig<Credentials>, "authorize" | "credentials">