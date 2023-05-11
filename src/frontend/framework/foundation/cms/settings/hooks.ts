import type { SWRResponse } from 'swr'
import type { SettingsContainerData, SettingsHookData } from './models'
import type { IContent, IContentData } from '@optimizely/cms/models'
import useSWR from 'swr'
import { useMemo } from 'react'
import fetcher, { createFoundationSettingsUri } from './fetcher'

export type UseSettingsHookResult<T extends IContent = IContentData> = SWRResponse<SettingsHookData<T>, any>
export type UseSettingsHook = (group: string, branch ?: string, site ?: string) => UseSettingsHookResult

const debug = false //process.env.NODE_ENV !== 'production'
let counter = 0

export function useSettings<T extends IContent = IContentData>(group: string, branch ?: string, siteId: string = "default") : UseSettingsHookResult<T>
{
    const i = counter++
    if (debug) {     
        console.groupCollapsed("Foundation - Settings: useSettings invoked")
        console.time(`Foundation - Settings: useSettings Hook ${ i }`)
        console.info("Foundation - Settings: Settings requested (group, branch, siteId): ", group, branch, siteId)
    }
    // The actual computation of the SettingsUri isn't too expensive, yet the consequence of it changing is
    // hence the wrapping of the uri in the 
    const uri = useMemo(() => { 
        if (debug)
            console.info("Foundation - Settings: Generating new settings URI")
        return createFoundationSettingsUri(group, siteId, branch).href 
    }, [ group, siteId, branch ])
    if (debug) {
        console.info("Foundation - Settings: Settings URI", uri)
        console.groupEnd()
    }
    const result = useSWR<SettingsHookData<T>>(uri, fetcher)
    if (debug) {
        console.info("Foundation - Settings: Still validating:", result.isValidating)
        console.timeEnd(`Foundation - Settings: useSettings Hook ${ i }`)
    }

    return result
}

export function hasSettingsData<T extends IContent = IContentData>(data: SettingsHookData<T> | null | undefined) : data is SettingsContainerData<T>
{
    if (typeof(data) != 'object' || data == null)
        return false
    
    return (data as SettingsContainerData<T>).settings ? true : false
}