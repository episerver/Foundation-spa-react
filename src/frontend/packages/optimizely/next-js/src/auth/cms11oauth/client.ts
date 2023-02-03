import fetch from 'cross-fetch'
import * as Types from './types'
import { CMS11_AUTH_SERVICE } from './internal'

export class OAuthClient
{
    protected readonly baseUrl : string = "http://localhost:56052/"
    protected readonly serviceUrl : URL

    public constructor(baseUrl ?: string)
    {
        if (baseUrl) this.baseUrl = baseUrl
        this.serviceUrl = new URL(CMS11_AUTH_SERVICE, baseUrl)
    }

    public async login(username?: string, password?: string, clientId: string = "Default") : Promise<Types.ServiceToken | false>
    {
        const loginBody = new URLSearchParams()
        loginBody.set('grant_type', 'password')
        loginBody.set('client_id', clientId)
        loginBody.set('username', username || '')
        loginBody.set('password', password || '')

        // Send the actual request
        const res = await fetch(this.serviceUrl.href, {
            method: 'post',
            body: loginBody,
            headers: { 
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept": "application/json"
            }
        })

        if (!res.ok)
            return false;

        return await res.json()
    }

    public async refresh(refresh_token?: string, clientId : string = "Default") : Promise<Types.ServiceToken | false>
    {
        const loginBody = new URLSearchParams()
        loginBody.set('grant_type', 'refresh_token')
        loginBody.set('client_id', clientId)
        loginBody.set('refresh_token', refresh_token || '')

        // Send the actual request
        const res = await fetch(this.serviceUrl.href, {
            method: 'post',
            body: loginBody,
            headers: { 
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept": "application/json"
            }
        })

        if (!res.ok)
            return false;

        return await res.json()
    }
}

export default OAuthClient