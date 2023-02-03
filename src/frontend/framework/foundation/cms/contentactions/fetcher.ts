import type { ContentReference } from '@optimizely/cms/models'
import type { UseContentActionHookFetcher, ContentActionResponse } from './models'
import fetch from 'cross-fetch'
import { createApiId } from '@optimizely/cms/utils'

const apiUrl = process.env.OPTIMIZELY_DXP_URL || 'http://localhost';
const debug = process.env.OPTIMIZELY_DXP_DEBUG?.toLowerCase() === 'true' || process.env.OPTIMIZELY_DXP_DEBUG === '1';
const defaultBranch = process.env.OPTIMIZELY_DXP_DEFAULT_BRANCH || 'en';
const CAP : string = "oca:"

export type ContentActionOptions = {
    /**
     * The URL slugs to be added into the URL
     */
    slugs?: string[]

    /**
     * The parameters to be added to the request, if
     * set the request will be send as JSON content in 
     * the post-message body
     */
    params?: { [ name: string ]: any }

    urlParams?: { [name: string]: string }

    language?:string
}

export function createContentActionUri(contentItem: ContentReference, action: string = "index", options ?: ContentActionOptions) : URL
{
    const contentId = createApiId(contentItem, true, false)
    const contentAction = action || "index"
    const contentUri = new URL(`${ CAP }/${contentId}/${contentAction}/${ options?.slugs?.join('/') ?? '' }`)
    if (options?.params)
        contentUri.searchParams.set("params", JSON.stringify(options.params))
    if (options?.urlParams)
        contentUri.searchParams.set("urlParams", JSON.stringify(options.urlParams))
    contentUri.searchParams.set("branch", options?.language || defaultBranch)
    if (debug) console.log("Generated URL", contentUri.href)
    return contentUri
}

export function parseContentActionUri(contentActionUri: string | URL) : [ string, string, ContentActionOptions? ]
{
    if (typeof(contentActionUri) == 'string')
        contentActionUri = new URL(contentActionUri)
    if (typeof(contentActionUri) !== 'object' || contentActionUri === null)
        throw new Error("The provided URI could not be parsed")
    if (contentActionUri.protocol !== CAP)
        throw new Error("The provided URI is not valid")

    const [ contentRef, action, ...slugs ] = contentActionUri.pathname.substring(1).split('/')
    const params = (JSON.parse(contentActionUri.searchParams.get('params') ?? 'null') || undefined) as {[ name: string ]: any } | undefined
    const urlParams = (JSON.parse(contentActionUri.searchParams.get('urlParams') ?? 'null') || undefined) as {[ name: string ]: string } | undefined
    const language = contentActionUri.searchParams.get("branch") ?? defaultBranch
    return [contentRef, action, { slugs: slugs.filter(x => x), params, language, urlParams }]
}

export const contentActionfetcher : UseContentActionHookFetcher = async <T>(contentActionUri : string | URL) : Promise<ContentActionResponse<T>> => 
{
    const data = parseContentActionUri(contentActionUri);
    if (debug) console.log("Parsed ID", data);

    const serviceURL = new URL(`api/episerver/v3.0/contentaction/${ data[0] }/${ data[1] || 'index' }/${ data[2]?.slugs?.join('/') ?? '' }`, apiUrl)
    const method = data[2]?.params ? 'POST' : 'GET'
    const body = data[2]?.params
    const urlParams = data[2]?.urlParams
    if (urlParams) for (const urlParam of Object.getOwnPropertyNames(urlParams))
        serviceURL.searchParams.set(urlParam, urlParams[urlParam])
    
    if (debug) console.log("Service URL:", serviceURL)
    if (debug) console.log("Method", method)
    if (debug) console.log("Body", body)

    const response = await fetch(serviceURL.href, {
        method,
        body: body ? JSON.stringify(body) : undefined,
        headers: {
            "Content-Type": "application/json",
            "Accept-Language": data[2]?.language ?? defaultBranch
        }
    });

    const respData : ContentActionResponse<T> = response.ok ? await response.json() : { error: "help"}

    return respData;
}

export default contentActionfetcher