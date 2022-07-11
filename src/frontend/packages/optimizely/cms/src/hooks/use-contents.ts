import type { IContent, IContentData, ErrorContent, ContentReference, ErrorType } from '../models'
import type { IContentDeliveryAPI } from '../content-delivery'
import type { SWRResponse } from 'swr'
import useSWR from 'swr'
import useOptimizely from '../provider/use'
import { isNetworkError } from '../content-delivery'
import { ContentDelivery } from '..'
import { buildContentURI, parseContentURI } from './content-uri'
import { IContent as IC } from '../util'

export type CmsContentBulkFetcher = <T extends IContent[] = IContentData[]>(contentURI: string | URL, api?: IContentDeliveryAPI) => T | Promise<T>

export function useContents<T extends IContent = IContentData>(contentReferences: ContentReference[], select?: (keyof T)[], expand ?: (keyof T)[], branch ?: string, scope ?: string, inEditMode ?: boolean) : SWRResponse<T[], ErrorContent>
{
    const opti = useOptimizely()
    const contentBranch = branch || opti.defaultBranch
    const loadInEditMode = inEditMode === undefined ? opti.inEditMode : inEditMode
    const contentIds = buildContentURI(contentReferences, select as string[], expand as string[], contentBranch, loadInEditMode, scope)
    const fetchContents = (cUri: string | URL) => contentsFetcher<T[]>(cUri, opti.api)
    return useSWR<T[], ErrorContent>(contentIds.href, fetchContents, {
        onError(err, key, config) {
            console.warn("Error resolving SWR", key, err)
        },
    })
}

export const contentsFetcher : CmsContentBulkFetcher = async <T extends IContent[] = IContentData[]>(contentUri: string | URL, api?: IContentDeliveryAPI) =>
{
    api = api ?? ContentDelivery.createInstance({ debug: false })
    type IContentType = T extends Array<infer R> ? R : T
    const { contentIds, select, expand, editMode, branch, scope } = parseContentURI<IContentType>(contentUri)
    const loadableContentIds = contentIds.filter(x => x.trim().length > 0)
    const data : T = await api.getContents<T>(loadableContentIds, { select, expand, editMode, branch }).catch(e => {
        if (isNetworkError(e)) {
            let type : ErrorType = "Generic"
            const code = e.status
            let message = `HTTP ${ e.status }: ${ e.statusText }`
            switch (code) {
                case 401:
                    type = "Authentication"
                    break
                case 404:
                    type = "NotFound"
                    message= `One of the content items could not be found ${ loadableContentIds.join(", ") } (${ contentUri.toString() })`
                    break;
            }
            throw IC.createErrorContent(type, code, message, loadableContentIds.join(", "), e)
        }
        throw IC.createErrorContent("Generic", 500, "Unknown error", loadableContentIds.join(", "), e)
    })
    if (scope)
        console.log("TODO: Add content filtering & recursion")
    if (!data)
        return [] as unknown as T
    if(data.length != loadableContentIds.length)
        console.warn(`Not all content found: ${ contentUri.toString() }, found ${ data.length } of ${ contentIds.length } items`)
    return data
}