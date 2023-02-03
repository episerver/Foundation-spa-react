import type { User as NextAuthUser } from 'next-auth'
import type { User } from './types'

/**
 * Guard to verify if the provided user is an Optimizely CMS 11 OAuth
 * user
 * 
 * @param       toTest      The Next-Auth User to test
 * @returns     true if it's an Optimizely CMS 11 OAuth user, false otherwise
 */
export function isUser(toTest: NextAuthUser | undefined) : toTest is User
{
    return typeof(toTest) === 'object' && toTest !== null && (toTest as User).source === 'CMS11OAuth'
}