import type * as WebsiteApi from '../types/website-api'
import type * as ContentTypesApi from '../types/contenttype-api'
import type { RequestInit } from 'node-fetch'
import type { TokenSet } from 'openid-client'

import { ApiVersions, GlobalArgs } from '../types/arguments'
import fetch from 'node-fetch'
import { authenticate as doAuthenticate } from './openid-login'
import { refresh as doRefresh } from './openid-refresh'

export type ClientConfig = GlobalArgs & {
}

const enum EndPoints {
    "Websites" = "api/episerver/{version}/site",
    "Website" = "api/episerver/{version}/site/{siteId}",
    "ContentTypes" = "/api/episerver/{version}/contenttypes"
}

export type ClientResponse<T> = {
    ok: true
    data: T
} | {
    ok: false
    error?: any
    message: string
}


export class Client {
    protected readonly config : ClientConfig

    protected _token ?: TokenSet | false

    protected get dxpUrl() : string 
    {
        if (typeof(this.config.dxp_url) === 'string' && this.config.dxp_url !== "")
            return this.config.dxp_url
        /*if (typeof(this.config.dxp_url) === 'object' && this.config.dxp_url !== null)
            return this.config.dxp_url.toString()*/

        throw new Error("Unable to determine the Optimizely DXP URL, please check the configuration")
    }

    public get isAuthenticated() : boolean
    {
        if (this._token === undefined || this._token === false)
            return false

        const expires_at = this._token?.expires_at ?? 0
        const now = Math.floor(Date.now() / 1000)
        return now < expires_at;
    }

    public constructor(config: ClientConfig)
    {
        this.config = config

        try {
            if (process.env['OPTIMIZELY_DXP_SECRET']) {
                var tokenData = process.env['OPTIMIZELY_DXP_SECRET']
                if (typeof(tokenData) === 'string') {
                    const tokenBuffer = Buffer.from(tokenData, 'base64')
                    const tokenJsonString = tokenBuffer.toString('utf-8')
                    const token = JSON.parse(tokenJsonString) as TokenSet
                    if (token.access_token) {
                        this._token = token
                    }
                }
            }
        } catch (e) {
            console.warn("Unable to read a configured Optimizely DXP Secret")
        }

        if (this.config.debug)
            console.log("Optimizely Content Cloud Config:", this.config);
    }

    public async connect() : Promise<boolean>
    {
        const connectUrl = (new URL("/globalassets", this.dxpUrl)).href;
        if (this.config.debug)
            console.log("Checking connectivity", connectUrl);

        const resp = await fetch(connectUrl, {
            method: 'get'
        }).catch(e => {
            return {
                ok: false,
                error: e,
                status: 500
            }
        });
        return resp.status >= 200 && resp.status < 500
    }

    /**
     * Run an (interactive) OpenID Authentication flow, this requires Node.JS
     * to be able to open a browser to allow the user to login into the 
     * application.
     * 
     * @param       scopes      The application areas the CLI needs access to
     * @returns     Result of the authentication process
     */
    public async authenticate(scopes: string[]) : Promise<boolean>
    {
        if (this.isAuthenticated) 
            return true

        const authParams = { 
            dxp_url: new URL(this.dxpUrl),
            client_id: this.config.dxp_client_id,
            client_secret: this.config.dxp_client_key,
            scopes
        }

        if (this._token !== undefined && this._token !== false)
        {
            this._token = await doRefresh({ token_set: this._token, ...authParams })
            if (typeof(this._token) === 'object')
                return true;
        }

        const tokenSet = await doAuthenticate(authParams);
        
        const tokenBuffer = Buffer.from(JSON.stringify(tokenSet, undefined, 0), 'utf-8')
        process.stdout.write(`Your token, store if you want to reuse it\n\n---\n\n${ tokenBuffer.toString('base64') }\n\n---\n\n`)

        this._token = tokenSet

        return tokenSet === false ? false : true
    }

    public async getAllWebsites() : Promise<ClientResponse<WebsiteApi.Website[]>>
    {
        try {
            const serviceUrl = this.getUrl(EndPoints.Websites)
            if (this.config.debug)
                console.log("Invoking service", serviceUrl.href)
            const response = await fetch(serviceUrl.href, {})
            if (!response.ok) 
                return { ok: false, error: response, message: `HTTP ${ response.status }: ${ response.statusText }`}

            const data = (await response.json()) as WebsiteApi.Website[]
            return {
                ok: true,
                data
            }
            
        } catch (e) {
            return {
                ok: false,
                error: e,
                message: (e as Error).message || "An error occurred"
            }
        }
    }

    public async getWebsite(id: string) : Promise<ClientResponse<WebsiteApi.Website>>
    {
        try {
            const serviceUrl = this.getUrl(EndPoints.Website, { siteId: id })
            const response = await fetch(serviceUrl.href, {})
            if (!response.ok)
                return { ok: false, error: response, message: `HTTP ${ response.status }: ${ response.statusText }`}

            const data = (await response.json()) as WebsiteApi.Website
            return { ok: true, data }
        } catch (e) {
            return {
                ok: false,
                error: e,
                message: (e as Error).message || "An error occurred"
            }
        }
    }

    public async getContentTypes(includeSystemTypes: boolean) : Promise<ClientResponse<ContentTypesApi.ContentTypes>>
    {
        try {
            const serviceUrl = this.getUrl(EndPoints.ContentTypes, { includeSystemTypes: includeSystemTypes ? "true" : "false" })
            const requestConfig : RequestInit = {}

            if (this._token && this._token.access_token && this._token.token_type === "Bearer")
            {
                requestConfig.headers = {
                    'Authorization': `Bearer ${ this._token.access_token }`
                }
            }

            const response = await fetch(serviceUrl.href, requestConfig)
            if (!response.ok)
                return { ok: false, error: response, message: `HTTP ${ response.status }: ${ response.statusText }`}

            const data = (await response.json()) as ContentTypesApi.ContentTypes
            return { ok: true, data }
        } catch (e) {
            return {
                ok: false,
                error: e,
                message: (e as Error).message || "An error occurred"
            }
        }
    }

    /**
     * Create an endpoint by applying the connection configuration parameters
     * to the endpoint.
     * 
     * @param endpoint The endpoint to build the URL for
     * @returns The URL object for the endpoint
     */
    protected getUrl(endpoint: EndPoints, urlParams?: Record<string,string>) : URL 
    {
        const url = new URL(endpoint, this.dxpUrl)
        url.pathname = url.pathname.replace(encodeURIComponent("{version}"), this.config.dxp_api ?? ApiVersions.v3)
        if (urlParams) for (const param in urlParams) {
            const pk = encodeURIComponent(`{${ param }}`)
            const newPath = url.pathname.replace(pk, urlParams[param])
            if (newPath === url.pathname)
                url.searchParams.set(param, urlParams[param])
            else
                url.pathname = newPath
        }
        return url
    }
    
}

export default Client