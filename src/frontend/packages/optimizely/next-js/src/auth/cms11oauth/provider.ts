import * as CredProvider from 'next-auth/providers/credentials'
import { Provider, User } from './types'
import { BaseCredAuthArgs } from './internal'
import { OAuthClient } from './client'

export const CMS11OAuth : Provider = options =>
{
    const args : BaseCredAuthArgs = {
        ...options,
        type: "credentials",
        credentials: options.credentials ?? {
            username: {
                label: "E-Mail",
                placeholder: "you@example.com",
                type: "text"
            },
            password: {
                label: "Password",
                type: "password"
            }
        },
        authorize: async (creds) => {
            const api = new OAuthClient(options.baseUrl)
            const userToken = await api.login(creds?.username, creds?.password)
            if (!userToken)
                return null

            const user : User = {
                id: userToken.username,
                email: userToken.username,
                token: userToken,
                source: 'CMS11OAuth' 
            }
            return user
        }
    }
    return CredProvider.default(args)
}
export default CMS11OAuth
