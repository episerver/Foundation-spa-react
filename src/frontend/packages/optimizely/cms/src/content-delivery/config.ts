/**
 * Type describing configuration to use when making
 * requests to the Content Delivery API.
 */
export type Config = {
    /**
     * URL to the Content Delivery API.
     */
    apiUrl: string
  
    /**
     * Function to call to get an access token for authorizing
     * requests to the Content Delivery API.
     */
    getAccessToken?: (path?: string) => Promise<string>
  
    /**
     * Select all properties by default, unless otherwise
     * specified in each request to the Content Delivery API.
     */
    selectAllProperties: boolean
  
    /**
     * Expand all properties by default, unless otherwise
     * specified in each request to the Content Delivery API.
     */
    expandAllProperties: boolean

    /**
     * The default language branch to use, unless otherwise
     * specified in each request to the Content Delivery API.
     * 
     * If not configured, the network client implmentation will
     * define the default language branch to request.
     */
    defaultBranch?: string

    /**
     * Override the default network timeout with a specific value
     */
    timeout?: number

    /**
     * Enables/disables console logging
     */
    debug?: boolean | 'immediate'
}

/**
 * Default configuration to use when making requests to the
 * Content Delivery API.
 */
export const DefaultConfig: Config = {
    apiUrl: '/',
    selectAllProperties: true,
    expandAllProperties: false,
    debug: false,
    defaultBranch: 'en'
}

export function validateConfig(config : Partial<Config>) : boolean 
{
    // No configuration is an invalid configuration
    if (typeof(config) !== 'object' && config === null)
        return false

    // The API URL must end in a slash to be valid
    if (!config.apiUrl?.endsWith('/'))
        return false

    // All tests passed
    return true
}

export default Config;