import type { IContent, IContentData } from '../models/icontent'
import type { ErrorContent, ErrorType } from '../models/error-content'
import type { ContentReference } from '../models/content-link'
import type { IContentDeliveryAPI } from '../content-delivery/icontent-delivery-api'
import type { SWRResponse } from 'swr'
import useSWR from 'swr'
import { useMemo } from 'react'
import { useOptimizelyCms } from '../provider/cms'
import { useEditMode } from '../provider/edit-mode'
import { isNetworkError } from '../content-delivery/NetworkError'
import createApiClient from '../content-delivery/factory'
import { buildContentURI, parseContentURI } from './content-uri'
import { createErrorContent } from '../util/icontent'

export type CmsContentBulkFetcher = <T extends IContent[] = IContentData[]>(contentURI: string | URL, api?: IContentDeliveryAPI) => T | Promise<T>

export function useContents<T extends IContent = IContentData>(contentReferences: ContentReference[], select?: (keyof T)[], expand ?: (keyof T)[], branch ?: string, scope ?: string, inEditMode ?: boolean) : SWRResponse<T[], ErrorContent>
{
    const opti = useOptimizelyCms()
    const editMode = useEditMode()
    const contentBranch = branch || opti.defaultBranch
    const loadInEditMode = inEditMode === undefined ? editMode.inEditMode : inEditMode
    const visitorGroupsById = editMode.visitorgroupsById
    const contentIds = useMemo(
        () => buildContentURI(contentReferences, select as string[], expand as string[], contentBranch, loadInEditMode, scope, visitorGroupsById), 
        [ contentReferences, select, expand, contentBranch, loadInEditMode, scope, visitorGroupsById ]
    )
    const fetchContents = (cUri: string | URL) => contentsFetcher<T[]>(cUri, opti.api)
    return useSWR<T[], ErrorContent>(contentIds.href, fetchContents, {
        onError(err, key, config) {
            console.warn("Error resolving SWR", key, err)
        }
    })
}

export const contentsFetcher : CmsContentBulkFetcher = async <T extends IContent[] = IContentData[]>(contentUri: string | URL, api?: IContentDeliveryAPI) =>
{
    api = api ?? createApiClient({ debug: false })
    type IContentType = T extends Array<infer R> ? R : T
    const { contentIds, select, expand, editMode, branch, scope, visitorGroup } = parseContentURI<IContentType>(contentUri)
    const loadableContentIds = contentIds.filter(x => x.trim().length > 0 && x.trim() != "-")
    const urlParams = visitorGroup ? { visitorgroupsByID: visitorGroup } : undefined
    const data : T = await api.getContents<T>(loadableContentIds, { select, expand, editMode, branch, urlParams }).catch(e => {
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
            throw createErrorContent(type, code, message, loadableContentIds.join(", "), e)
        }
        throw createErrorContent("Generic", 500, "Unknown error", loadableContentIds.join(", "), e)
    })
    if (scope)
        console.log("TODO: Add content filtering & recursion")
    if (!data)
        return [] as unknown as T
    if(data.length != loadableContentIds.length)
        console.warn(`Not all content found: ${ contentUri.toString() }, found ${ data.length } of ${ contentIds.length } items`)
    return data
}