// Exports
export * as Models from './models'
export * as Api from './api'
export * as Utils from './utils'
export { isCommerceApi } from './api'

// Global logic
import { ContentDelivery } from '@optimizely/cms'
import { ICommerceApi, CommerceApi, isCommerceApi } from './api'

let isSetupCompleted = false

export function setup() : void
{
    if (ContentDelivery.Container.isInitialized())
        throw new Error('The Commerce API must be initialized prior to the first usage of the ContentDelivery API')

    ContentDelivery.Container.apiType = CommerceApi

    isSetupCompleted = true
}

export function get() : ICommerceApi
{
    if (!isSetupCompleted)
        throw new Error('The setup() method must be invoked prior to the get() method')

    const api = ContentDelivery.Container.instance

    if (!isCommerceApi(api))
        throw new Error('The ContentDeliveryAPI Client does not have the commerce methods')

    return api
}

export function createInstance(config?: Partial<ContentDelivery.Config>)
{
    return ContentDelivery.Container.createInstance(config)
}

export default get