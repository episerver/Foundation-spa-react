import type { GetServerSidePropsContext } from 'next'
import { getServerSession as baseGetServerSession } from 'next-auth/next'
import NextAuth from 'next-auth'
import { Auth } from '@optimizely/next-js'

const DXP_URL = process.env?.OPTIMIZELY_DXP_URL ?? 'http://localhost:8000/'

// First define the types
/**
 * The Session data type for this specific authentication mechanism
 */
export type Session = Auth.CMS12OIDC.Cms12SessionData

/**
 * Instance specific Next-Auth configuration, using the defaults from
 * the chosen authentication provider
 */
export const authOptions : Auth.CMS12OIDC.Cms12NextAuthOptionsType = {
    ...Auth.CMS12OIDC.Cms12NextAuthOptions,
    theme: {
        buttonText: "Sign in with Frontline Services",
        colorScheme: "auto",
        brandColor: "#27747E",
        logo: `${DXP_URL}globalassets/_epihealth/logo_frontlineservices.png?width=256&quality=85`
    }
}

/**
 * Simple - strong typed - helper to retrieve the current session server side,
 * wrapping the Next-Auth provided method with the appropriate types and configuration
 * 
 * @see         baseGetServerSession()
 * @param       req     The page request to get the session for
 * @param       res     The page response to get the session for
 * @returns     The session data
 */
export const getServerSession : ( req: GetServerSidePropsContext["req"], res: GetServerSidePropsContext["res"] ) => Promise<Session | null> = 
    (req, res) => baseGetServerSession(req, res, authOptions)

/**
 * The default NextAuth logic for these Api Routes
 */
export default NextAuth(authOptions)