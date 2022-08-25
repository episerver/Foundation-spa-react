import type { ContentReference } from '../models/content-link'
import type { IContent, IContentData } from '../models/icontent'
import { createApiId } from '../util/content-reference'

export const CMS_CONTENT_PROTOCOL = 'opti-cms:'

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

export function buildContentURI(contentReference: ContentReference | ContentReference[], select?: string[], expand ?: string[], branch ?: string, inEditMode: boolean = false, scope?: string, visitorGroup ?: string) : URL
{
    //console.log("Building contentURI with branch", branch)
    const path = Array.isArray(contentReference) ? 
            contentReference.map(r => createApiId(r, true, inEditMode)).join('/') : 
            createApiId(contentReference, true, inEditMode)
    const contentRef = new URL(CMS_CONTENT_PROTOCOL + "/" + path)

    if (!visitorGroup) try {
        visitorGroup = (new URL(window.location.href)).searchParams.get("visitorgroupsByID") ?? undefined
    } catch (e) {
        //Ignored on purpose
    }

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