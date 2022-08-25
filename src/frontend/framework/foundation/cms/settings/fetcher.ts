import type { SettingsContainerData, SettingsResponse } from './models'
import fetch from 'cross-fetch'
import { IContent, IContentData } from '@optimizely/cms/models';

const apiUrl = process.env.OPTIMIZELY_DXP_URL || 'http://localhost'
const debug = process.env.OPTIMIZELY_DXP_DEBUG?.toLowerCase() === 'true' || process.env.OPTIMIZELY_DXP_DEBUG === '1'
const defaultBranch = process.env.OPTIMIZELY_DXP_DEFAULT_BRANCH || 'en'

export const SETTINGS_URI = 'foundation-settings:'

const enum SETTINGS_URI_PARAMS {
    group = "group",
    language = "branch"
}

export type FoundationSettingsUriData = {
    group ?: string
    siteId ?: string
    branch ?: string
}

export function createFoundationSettingsUri(group?: string, siteId: string = "default", branch : string = defaultBranch) : URL
{
    if (debug) console.time("createFoundationSettingsUri")
    const settingsRef = new URL(`${ SETTINGS_URI }/${ siteId }`);
    if (group)
        settingsRef.searchParams.set(SETTINGS_URI_PARAMS.group, group)
    if (branch)
        settingsRef.searchParams.set(SETTINGS_URI_PARAMS.language, branch)
    if (debug) console.timeEnd("createFoundationSettingsUri")
    return settingsRef
}

export function decodeFoundationSettingsUri(settingsUri : string | URL) : FoundationSettingsUriData
{
    if (debug) console.time("decodeFoundationSettingsUri")
    const uri = typeof (settingsUri) === 'string' ? new URL(settingsUri) : settingsUri
    if (uri.protocol !== SETTINGS_URI)
        throw new Error("Invalid settings protocol")

    const siteId = uri.pathname.substring(1)
    const group = (uri.searchParams.get(SETTINGS_URI_PARAMS.group) ? uri.searchParams.get(SETTINGS_URI_PARAMS.group) : undefined) as string | undefined
    const branch = (uri.searchParams.get(SETTINGS_URI_PARAMS.language) ? uri.searchParams.get(SETTINGS_URI_PARAMS.language) : defaultBranch) as string
    const decoded = { siteId, group, branch }
    if (debug) console.timeEnd("decodeFoundationSettingsUri")
    return decoded
}

export type FetcherFn<CT extends IContent = IContentData> = <T extends IContent = CT>(settingsUri : string) => Promise<SettingsContainerData<T> | { error: any }>

export async function fetcher<T extends IContent = IContentData>(settingsUri : string | URL) : Promise<SettingsContainerData<T> | { error: any }>
{
    if (debug) console.time("fetchFoundationSettings")
    let siteId : string | undefined = undefined
    let group : string | undefined = undefined
    let branch : string | undefined = undefined

    try {
        const args = decodeFoundationSettingsUri(settingsUri)
        siteId = args.siteId
        group = args.group
    } catch {
        if (debug) console.timeEnd("fetchFoundationSettings")
        return {
            error: `The settings resource identifier cannot be parsed (URI: ${ settingsUri})`
        }
    }
    
    try {
        const endpoint = `/api/foundation/v1.0/settings/${ siteId ?? '' }/${ group ?? ''}`
        const serviceUrl = new URL(endpoint, apiUrl)
        if (debug) console.timeLog("fetchFoundationSettings", "Start async fetch")
        const response = await fetch(serviceUrl.href, {
            headers: {
                "accept-language": branch ?? defaultBranch
            }
        })
        if (debug) console.timeLog("fetchFoundationSettings", "Finished async fetch")
        if (!response.ok) {
            if (debug) {
                console.timeLog("fetchFoundationSettings", `HTTP ${ response.status }: ${ response.statusText}`)
                console.timeEnd("fetchFoundationSettings")
            }
            return {
                error: `HTTP ${ response.status }: ${ response.statusText}`
            }
        }
        if (debug) console.timeLog("fetchFoundationSettings", "Start async JSON parsing")
        const data : SettingsResponse<SettingsContainerData<T>> = await response.json()
        if (debug) console.timeLog("fetchFoundationSettings", "Finished async JSON parsing")
        if (!data.error) {
            if (debug) console.timeEnd("fetchFoundationSettings")
            return data.data
        }
        if (debug) console.timeEnd("fetchFoundationSettings")
        return {
            error: data.message
        }
    } catch {
        if (debug) console.timeEnd("fetchFoundationSettings")
        return {
            error: "Error while invoking the settings service"
        }
    }
}

export default fetcher