import type { ContentReference } from '../models/content-link'
import type { IContent, IContentData } from '../models/icontent'
import { createApiId } from '../util/content-reference'

export const CMS_CONTENT_PROTOCOL = 'opti-cms:'
export const CMS_LOCAL_CONTENT_PATH = '__local_content__'

export const enum CONTENT_PARAMS {
    Select = "select",
    Expand = "expand",
    InEditMode = "epieditmode",
    Language = "branch",
    Scope = "scope",
    VisitorGroup = "vg"
}

export type ContentUriData<T extends IContent = IContentData> = { 
    contentIds: string[], 
    select?: (keyof T)[], 
    expand?: (keyof T)[], 
    editMode: boolean, 
    branch?: string, 
    scope?: string,
    visitorGroup?: string
}

function convertId(ref: ContentReference, inEditMode: boolean = false) 
{
    const apiId = createApiId(ref, true, inEditMode)
    if (apiId == '0' || apiId == '0_-1')
        return CMS_LOCAL_CONTENT_PATH
    return apiId
}

export function buildContentURI(contentReference: ContentReference | ContentReference[], select?: string[], expand ?: string[], branch ?: string, inEditMode: boolean = false, scope?: string, visitorGroup ?: string) : URL
{
    //console.log("Building contentURI with branch", branch)
    const path = Array.isArray(contentReference) ? 
            contentReference.map(r => convertId(r, inEditMode)).join('/') : 
            convertId(contentReference, inEditMode)
    
    const contentRef = new URL(CMS_CONTENT_PROTOCOL + "/" + path)

    if (select)
        contentRef.searchParams.set(CONTENT_PARAMS.Select, select.map(x => encodeURIComponent(x)).join(','))
    if (expand)
        contentRef.searchParams.set(CONTENT_PARAMS.Expand, expand.map(x => encodeURIComponent(x)).join(','))
    if (inEditMode)
        contentRef.searchParams.set(CONTENT_PARAMS.InEditMode, "true")
    if (branch)
        contentRef.searchParams.set(CONTENT_PARAMS.Language, branch)
    if (scope)
        contentRef.searchParams.set(CONTENT_PARAMS.Scope, scope)
    if (visitorGroup)
        contentRef.searchParams.set(CONTENT_PARAMS.VisitorGroup, visitorGroup)

    //console.log("Generated content id", contentRef.href, "for language", branch)
    return contentRef
}

export function parseContentURI<T extends IContent = IContentData>(contentURI: string | URL) : ContentUriData<T>
{
    const uri = typeof (contentURI) === 'string' ? new URL(contentURI) : contentURI as URL
    if (uri.protocol !== CMS_CONTENT_PROTOCOL)
        throw new Error("Invalid content protocol")

    const contentIds = uri.pathname.substring(1).split('/')
    const select = (uri.searchParams.get(CONTENT_PARAMS.Select) ? uri.searchParams.get(CONTENT_PARAMS.Select)?.split(",") : undefined) as (keyof T)[] | undefined
    const expand = (uri.searchParams.get(CONTENT_PARAMS.Expand) ? uri.searchParams.get(CONTENT_PARAMS.Expand)?.split(",") : undefined) as (keyof T)[] | undefined
    const editMode = uri.searchParams.get(CONTENT_PARAMS.InEditMode) === 'true'
    const branch = (uri.searchParams.get(CONTENT_PARAMS.Language) ? uri.searchParams.get(CONTENT_PARAMS.Language) : undefined) as string | undefined
    const scope = (uri.searchParams.get(CONTENT_PARAMS.Scope) ? uri.searchParams.get(CONTENT_PARAMS.Scope) : undefined) as string | undefined
    const visitorGroup = uri.searchParams.get(CONTENT_PARAMS.VisitorGroup) ?? undefined

    return { contentIds, select, expand, editMode, branch, scope, visitorGroup }
}

export function isContentURI(toTest: string | URL) : boolean
{
    var urlString = typeof(toTest) == 'object' && toTest != null && toTest.href ? toTest.href : toTest
    if (typeof(urlString) != 'string')
        return false
    return (urlString as string).startsWith(CMS_CONTENT_PROTOCOL)
}