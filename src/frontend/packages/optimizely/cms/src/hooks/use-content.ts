import type { IContent, IContentData } from '../models/icontent'
import type { ErrorType, ErrorContent } from '../models/error-content'
import type { ContentReference } from '../models/content-link'
import type { IContentDeliveryAPI } from '../content-delivery/icontent-delivery-api'
import type { SWRResponse, Fetcher } from 'swr'
import { isNetworkError } from '../content-delivery/NetworkError'
import useSWR from 'swr'
import { useOptimizelyCms } from '../provider/cms'
import { useEditMode } from '../provider/edit-mode'
import createInstance from '../content-delivery/factory'
import { buildContentURI, parseContentURI } from './content-uri'
import { createErrorContent, isIContent } from '../util/icontent'
import { createLanguageId } from '../util/content-reference'
//import { processValue } from '../util/property'
import { useMemo } from 'react'

const ERROR_URL = 'error:/empty-id'
const DEBUG_ENABLED = process.env.NODE_ENV != 'production'

export type CmsContentFetcher = <T extends IContent = IContentData>(contentURI: Parameters<Fetcher<T | null, string | URL>>[0], api?: IContentDeliveryAPI) => ReturnType<Fetcher<T | null, string | URL>>

export function useContent<T extends IContent = IContentData>(contentReference: ContentReference, select?: (keyof T)[], expand ?: (keyof T)[], branch ?: string, scope ?: string, inEditMode ?: boolean) : SWRResponse<T | null, ErrorContent> | undefined
{
    const opti = useOptimizelyCms()
    const editMode = useEditMode()
    const contentBranch = branch || opti.defaultBranch
    const loadInEditMode = inEditMode === undefined ? editMode.inEditMode : inEditMode

    // Create memoized values so we're preventing over-fetching as much as possible
    const contentId = useMemo<string>(() => {
        if (contentReference)
            return buildContentURI(contentReference, select as string[], expand as string[], contentBranch, loadInEditMode, scope).href 
        return ERROR_URL
    }, [ contentReference, select, expand, contentBranch, loadInEditMode, scope ])
    const fallbackData = useMemo<T | undefined>(() => isIContent(contentReference) ? contentReference as T : undefined, [ contentReference ])

    // Define fetcher
    const fetchContent = (cUri: string | URL) => {
        if (cUri == ERROR_URL)
            return null
        return contentFetcher<T>(cUri, opti.api)
    }

    // Define SWR content
    const content = useSWR<T | null, ErrorContent, string>(contentId, fetchContent, {
        compare(a, b) {
            if (a == b) 
                return true
            if (a == undefined || b == undefined) // If either side is undefined, it's always unequal
                return false
            const idA = createLanguageId(a, contentBranch, loadInEditMode)
            const idB = createLanguageId(a, contentBranch, loadInEditMode)
            return idA == idB
        },
        fallbackData
    })
    return content
}

export const contentFetcher : CmsContentFetcher = async <T extends IContent = IContentData>(contentURI: Parameters<Fetcher<T | null, string | URL>>[0], api?: IContentDeliveryAPI) : Promise<T | null> => {
    if (DEBUG_ENABLED) console.log("Optimizely - CMS: useContent > fetcher:", contentURI)
    api = api ?? createInstance({ debug: false })
    const { contentIds, select, expand, editMode, branch, scope } = parseContentURI<T>(contentURI)
    if (contentIds.length != 1) throw createErrorContent("Generic", 500, `useContent requires a single content item to be specified, you have provided ${ contentIds.length } items`, contentIds?.join("; "))
    if (editMode && !api.hasAccessToken()) console.warn("Trying to retrieve edit mode content without being authenticated - this will not work.")
    if (!contentIds[0]) return null
    if (contentIds[0] == "-") {
        if (DEBUG_ENABLED) console.error("Optimizely - CMS: useContent > trying to load an invalid contentId!", new Error().stack)
        throw createErrorContent("NotFound", 404, "Not Found", contentIds?.join("; "), (new Error()).stack)
    }
         
    const data = await api.getContent<T>(contentIds[0], { select, expand, editMode, branch }).catch(e => {
        if (isNetworkError(e)) {
            let type : ErrorType = "Generic"
            let message : string = `HTTP ${ e.status }: ${ e.statusText }`
            switch (e.status) {
                case 401:
                    type = "Authentication"
                    break
                case 404:
                    type = "NotFound"
                    message = `Content with ID ${ contentIds[0] } not found (${ contentURI.toString() })`
                    return undefined
            }
            throw createErrorContent(type, e.status, message, contentIds[0], e)
        }
        throw createErrorContent("Generic", 500, "Uknown Error", contentIds[0], e)
    })
    
    if (scope && DEBUG_ENABLED) 
        console.log("Optimizely - CMS: useContent > fetcher - TODO: Add content filtering & recursion for scope", scope)

    if (!data)
        return null
        //throw IC.createErrorContent("NotFound", 404, `Content with ID ${ contentIds[0] } not loadable (${ contentURI.toString() })`, contentIds[0])
    return data
}