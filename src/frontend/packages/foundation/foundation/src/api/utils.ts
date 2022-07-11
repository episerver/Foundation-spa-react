import type IFoundationApi from './ifoundationapi'
import type { ContentDelivery } from '@optimizely/cms'

export function isFoundationApi(api: ContentDelivery.IContentDeliveryAPI) : api is IFoundationApi
{
    return typeof((api as IFoundationApi).getProductInfo) === 'function'
}