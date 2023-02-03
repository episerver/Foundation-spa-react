import type { SettingsContainerData, SettingsResponse, SettingsHookData } from './models'
import fetch from 'cross-fetch'
import { IContent, IContentData } from '@optimizely/cms/models';

const apiUrl = process.env.OPTIMIZELY_DXP_URL || 'http://localhost'
const debug = process.env.NODE_ENV != 'production'
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
    const settingsRef = new URL(`${ SETTINGS_URI }/${ siteId }`);
    if (group)
        settingsRef.searchParams.set(SETTINGS_URI_PARAMS.group, group)
    if (branch)
        settingsRef.searchParams.set(SETTINGS_URI_PARAMS.language, branch)
    return settingsRef
}

export function decodeFoundationSettingsUri(settingsUri : string | URL) : FoundationSettingsUriData
{
    const uri = typeof (settingsUri) === 'string' ? new URL(settingsUri) : settingsUri
    if (uri.protocol !== SETTINGS_URI)
        throw new Error("Invalid settings protocol")

    const siteId = uri.pathname.substring(1)
    const group = (uri.searchParams.get(SETTINGS_URI_PARAMS.group) ? uri.searchParams.get(SETTINGS_URI_PARAMS.group) : undefined) as string | undefined
    const branch = (uri.searchParams.get(SETTINGS_URI_PARAMS.language) ? uri.searchParams.get(SETTINGS_URI_PARAMS.language) : defaultBranch) as string
    const decoded = { siteId, group, branch }
    return decoded
}

export type FetcherFn<CT extends IContent = IContentData> = <T extends IContent = CT>(settingsUri : string) => Promise<SettingsHookData<T>>

export const fetcher : FetcherFn<IContentData> = async <T extends IContent = IContentData>(settingsUri: string) => 
{
    if (debug) {
        console.log("Foundation - Settings: Fetcher > Settings ID: ", settingsUri)
    }
    let siteId : string | undefined = undefined
    let group : string | undefined = undefined
    let branch : string | undefined = undefined

    try {
        const args = decodeFoundationSettingsUri(settingsUri)
        siteId = args.siteId
        group = args.group
    } catch {
        if (debug) console.error("Foundation - Settings: Fetcher > The settings resource identifier cannot be parsed")
        return {
            error: `The settings resource identifier cannot be parsed (URI: ${ settingsUri})`
        }
    }
    
    try {
        const endpoint = `/api/foundation/v1.0/settings/${ siteId ?? '' }/${ group ?? ''}`
        const serviceUrl = new URL(endpoint, apiUrl)
        const response = await fetch(serviceUrl.href, {
            headers: {
                "accept-language": branch ?? defaultBranch
            }
        })
        if (!response.ok) {
            if (debug) console.error("Foundation - Settings: Fetcher > HTTP Error", `HTTP ${ response.status }: ${ response.statusText}`)
            return {
                error: `HTTP ${ response.status }: ${ response.statusText}`
            }
        }
        const data : SettingsResponse<SettingsContainerData<T>> = await response.json()
        if (!data.error) {
            return data.data
        }
        return {
            error: data.message
        }
    } catch (e) {
        if (debug) console.error("Foundation - Settings: Fetcher > Unknown error", e)
        return {
            error: "Error while invoking the settings service"
        }
    }
}

export default fetcher