import type { ClientConfiguration, QueryResponse } from './types'
import fetch from 'cross-fetch'

type Fetch = typeof fetch extends Promise<infer R> ? R : typeof fetch
type FetchConfig = Parameters<Fetch>[1]

const GRAPHQL_SERVICE_PATH = '/content/v2'
const defaultConfiguration : Required<Pick<ClientConfiguration, 'debug' | 'throwOnError'>> = {
    debug: false,
    throwOnError: true
}
export type Response<T = any> = QueryResponse<T, Fetch>

export function validateConfig(config: any) : config is ClientConfiguration
{
    if (!(typeof(config) === 'object' && config !== null))
        return false;

    if (typeof(config.domain) === 'string' && typeof(config.token) === 'string' && config.domain.length > 0 && config.token.length > 0)
        return true;

    return false
}

export class Client 
{
    private config : Required<ClientConfiguration>

    protected get debug() : boolean { return this.config.debug }
    protected get throwOnError() : boolean { return this.config.throwOnError }
    
    protected get endpoint() : URL
    {
        const apiUrl = new URL(GRAPHQL_SERVICE_PATH, this.config.domain)
        apiUrl.searchParams.set('auth', this.config.token)
        return apiUrl
    }

    public constructor (config: ClientConfiguration)
    {
        this.config = { ...defaultConfiguration, ...config };
        (globalThis as Record<string, any>).OptiGQL = this;
    }

    public async query<T = any>(query: string, variables ?: Record<string,any>, requestInit ?: FetchConfig) : Promise<Response<T>>
    {
        const gqlEndpoint = this.endpoint
        const gqlQuery = { query, variables }

        if (this.debug) this.log(`Optimizely GQL: ${ gqlEndpoint }`, gqlQuery.query, gqlQuery.variables);

        const response = await fetch(gqlEndpoint.href, {
            ...requestInit,
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json',
                ...requestInit?.headers,
            },
            body: JSON.stringify(gqlQuery)
        });
        const responseData = await response.json() as Omit<QueryResponse<T>, 'res'>;

        if (this.throwOnError && responseData.errors) {
            const errorMessage = "GraphQL Service Error: "+responseData.errors.map(x => x.message).join('; ')
            this.logError(errorMessage, responseData.errors)
            throw new Error(errorMessage)
        }

        if (responseData.data)
            return { data: responseData.data, extensions: responseData.extensions, errors: responseData.errors, res: response }

        if (responseData.errors)
            return { errors: responseData.errors, extensions: responseData.extensions, res: response }

        return { errors: [{ message: "No data returned"}], extensions: { requestId: 'n/a', responseTime: -1 }, res: response }
    }

    protected log(...args: any[])
    {
        console.log(...args)
    }

    protected logError(...args: any[])
    {
        console.error(...args)
    }
}

export default Client