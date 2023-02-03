import type { IContentDeliveryAPI, IContentDeliveryAPIStatic } from './icontent-delivery-api'
import type Config from './config'
import ContentDeliveryAPI from "./content-delivery-api"
import { validateConfig, DefaultConfig } from './config'

const DEBUG = process.env.NODE_ENV != 'production'

export function createInstance(config: Partial<Config>, ApiClient?: IContentDeliveryAPIStatic) : IContentDeliveryAPI
{
    // Read configuration from environment
    const envConfig : Partial<Config> = {
        apiUrl: process.env.OPTIMIZELY_DXP_URL || 'http://localhost:8000',
        debug: process.env.OPTIMIZELY_DXP_DEBUG?.toLowerCase() === 'true' || process.env.OPTIMIZELY_DXP_DEBUG === '1'
    }

    // Set default branch if configured
    if (process.env.OPTIMIZELY_DXP_DEFAULT_BRANCH)
        envConfig.defaultBranch = process.env.OPTIMIZELY_DXP_DEFAULT_BRANCH

    const instanceConfig = {
        ...DefaultConfig,
        ...envConfig,
        ...config
    }

    if (!validateConfig(instanceConfig))
        throw new Error("Optimizely - CMS: Invalid ContentDelivery API Configuration")

    const Client : IContentDeliveryAPIStatic = ApiClient ?? ContentDeliveryAPI

    if (DEBUG)
        console.log("Optimizely - CMS: ContentDelivery Factory", Client, instanceConfig)
    return new Client(instanceConfig)
}

export default createInstance