// Exports
export * as Models from './models'
export * as Api from './api'

// Global logic
import { ContentDelivery } from '@optimizely/cms'
import { setup as initCommerceApi, isCommerceApi } from '@optimizely/commerce'
import { IFoundationAPI, FoundationAPI, isFoundationApi } from './api'

let isSetupCompleted = false

export function setup() : void
{
    initCommerceApi()
    if (ContentDelivery.Container.isInitialized())
        throw new Error('The Commerce API must be initialized prior to the first usage of the ContentDelivery API')

    ContentDelivery.Container.apiType = FoundationAPI

    isSetupCompleted = true
}

export function get() : IFoundationAPI
{
    if (!isSetupCompleted)
        throw new Error('The setup() method must be invoked prior to the get() method')

    const api = ContentDelivery.Container.instance

    if (!(isCommerceApi(api) && isFoundationApi(api)))
        throw new Error('The ContentDeliveryAPI Client does not have the foundation methods')

    return api
}

export function createInstance(config?: Partial<ContentDelivery.Config>) : IFoundationAPI
{
    const instance = ContentDelivery.Container.createInstance(config)
    if (!(isCommerceApi(instance) && isFoundationApi(instance)))
        throw new Error('The ContentDeliveryAPI Client does not have the foundation methods')

    return instance;
}

export default get