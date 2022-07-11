import type { IContent, IContentData } from '@optimizely/cms/models'
import type * as M from './models'
import * as F from './fetcher'

export type PreFetchResults<T extends IContent = IContentData> = { id: string, value?: M.SettingsContainerData<T>}

export async function preFetchSettings<T extends IContent = IContentData>(group: string, branch ?: string, siteId: string = "default") : Promise<PreFetchResults<T>>
{
    const url = F.createFoundationSettingsUri(group, siteId, branch).href
    const data = await F.fetcher<T>(url)
    if (isNonError(data)) 
        return { id: url, value: data }
    return { id: url }
}
type fetcherFn = typeof F.fetcher
function isNonError(toTest: Awaited<ReturnType<fetcherFn>>) : toTest is M.SettingsContainerData
{
    return (toTest as { error: any }).error ? false : true
}