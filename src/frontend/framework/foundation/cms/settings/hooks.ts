import type { SWRResponse, BareFetcher } from 'swr'
import type { SettingsContainerData } from './models'
import type { IContent, IContentData } from '@optimizely/cms/models'
import useSWR from 'swr'
import fetcher, { createFoundationSettingsUri } from './fetcher'

export type UseSettingsHookResult<T extends IContent = IContentData> = SWRResponse<SettingsContainerData<T>, any>
export type UseSettingsHook = (group: string, branch ?: string, site ?: string) => UseSettingsHookResult

export function useSettings<T extends IContent = IContentData>(group: string, branch ?: string, siteId: string = "default") : UseSettingsHookResult<T>
{
    const uri = createFoundationSettingsUri(group, siteId, branch).href
    return useSWR<SettingsContainerData<T>>(uri, fetcher as BareFetcher<SettingsContainerData<T>> )
}