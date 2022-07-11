import NextAuth from 'next-auth'
import { Auth } from '@optimizely/next-js'

export default NextAuth(Auth.CMS12OIDC.Cms12NextAuthOptions)