import type { UseContentActionHook, UseContentActionHookResult, ContentActionResponse } from './models'
import type { ContentActionOptions } from './fetcher'
import useSWR from 'swr'
import fetcher, { createContentActionUri } from './fetcher'
import type { ContentReference } from '@optimizely/cms/models'

export const useContentAction : UseContentActionHook = <T>(content: ContentReference, action: string, options ?: ContentActionOptions) : UseContentActionHookResult<T> =>
{
    const actionUri = createContentActionUri(content, action, options)
    return useSWR<ContentActionResponse<T>>(actionUri.href, fetcher);
}

export default useContentAction

