import type { IContentData, ContentReference } from '@optimizely/cms/models'
import type { SWRResponse } from 'swr'
import type { ContentActionOptions } from './fetcher'

export type ContentActionResponse<T = any, E = any> = T | { error: E };
export type UseContentActionHookResult<T = IContentData, E = any> = SWRResponse<ContentActionResponse<T, E>, E>
export type UseContentActionHookFetcher<E = any> = <T>(contentActionUri : string | URL) => Promise<ContentActionResponse<T, E>>
export type UseContentActionHook = <T = any>(content: ContentReference, action: string, options ?: ContentActionOptions) => UseContentActionHookResult<T>