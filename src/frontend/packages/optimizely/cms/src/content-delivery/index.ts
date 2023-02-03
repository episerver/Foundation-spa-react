// Re-exports
export type { Config } from './config'
export * from './icontent-delivery-api'
export * from './content-delivery-api'
export * as Utils from './util'
export * as ApiConfig from './config'
export * from './NetworkError'

// Global instance logic
import type { Config } from './config'
import type { IContentDeliveryAPI, IContentDeliveryAPIStatic } from './icontent-delivery-api'
import { validateConfig, DefaultConfig } from './config'
import { ContentDeliveryAPI } from './content-delivery-api'
import { OptiContentMode } from './util'

class ContentDeliveryContainer {

    public apiType : IContentDeliveryAPIStatic = ContentDeliveryAPI

    private _instance ?: IContentDeliveryAPI
    private _gat : Config['getAccessToken']

    public get instance() : IContentDeliveryAPI
    {
        if (!this._instance)
            this._instance = this.setup()
        
        return this._instance
    }

    public set instance(api: IContentDeliveryAPI)
    {
        if (this._instance)
            throw new Error('The Content Delivery API Client has already been initialized')

        this._instance = api
    }

    public isInitialized() : boolean
    {
        return this._instance ? true : false
    }

    public set tokenProvider(provider : Config['getAccessToken'])
    {
        this._gat = provider
        // if (this._instance)
        //     this._instance = undefined
    }

    public get tokenProvider() : Config['getAccessToken']
    {
        return this._gat
    }

    public setup (config?: Partial<Config>) : IContentDeliveryAPI  {
        if (this._instance)
            throw new Error('The Content Delivery API Client has already been initialized')
        this._instance = this.createInstance(config)
        return this._instance;
    }

    public createInstance(config ?: Partial<Config>) : IContentDeliveryAPI
    {
        // Build the configuration
        const apiConfig = this.createBasicConfig(config)
        if (this._gat && !apiConfig.getAccessToken)
            apiConfig.getAccessToken = this._gat

        // Create instance
        return new this.apiType(apiConfig)
    }

    public createBasicConfig(partial ?: Partial<Config>) : Config
    {
        const myConfig : Partial<Config> = {
            apiUrl: process.env.OPTIMIZELY_DXP_URL || 'http://localhost:8000',
            debug: process.env.OPTIMIZELY_DXP_DEBUG?.toLowerCase() === 'true' || process.env.OPTIMIZELY_DXP_DEBUG === '1'
        }

        // Set default branch if configured
        if (process.env.OPTIMIZELY_DXP_DEFAULT_BRANCH)
            myConfig.defaultBranch = process.env.OPTIMIZELY_DXP_DEFAULT_BRANCH

        const baseConfig = { ...DefaultConfig, ...myConfig, ...partial };
        if (validateConfig(baseConfig))
            return baseConfig

        throw new Error("Invalid configuration generated, please update the context or create the configuration manually")
    }
}

export const Container = new ContentDeliveryContainer();

export function Current() : IContentDeliveryAPI {
    return Container.instance
}

export function createInstance(config?: Partial<Config>) : IContentDeliveryAPI
{
    const instance = Container.createInstance(config)
    return instance;
}

export const MODE_DELIVERY = OptiContentMode.Delivery
export const MODE_EDIT = OptiContentMode.Edit

export default Current;
