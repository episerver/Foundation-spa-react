import type { SWRResponse, Fetcher } from 'swr'
import type IContentDeliveryAPI from '../content-delivery/icontent-delivery-api'
import type WebsiteInfo from '../models/website-info'
import type Website from '../models/website'
import { useOptimizelyCms } from '../provider/index'
import useSWR from 'swr'

const CURRENT_SITE_KEY = 'current'
const UNKNOWN_SITE_KEY = 'unknown'
const SITE_SCHEME = 'opti-site:'
const isDevelopment = process.env.NODE_ENV == 'development'

export type UseWebsiteResponse = SWRResponse<WebsiteInfo, any> | undefined

export function useWebsite(fallbackData ?: WebsiteInfo, siteDomain?: string, locale?: string) : UseWebsiteResponse
{
    const api = useOptimizelyCms().api
    const swrKey = createSwrKey(siteDomain)
    function fetchSite (siteId: string) {
        return siteFetcher(siteId, api)
    }
    return useSWR<WebsiteInfo, any, string>(swrKey, fetchSite, { fallbackData: fallbackData, suspense: true })
}

//#region Helper functions
type ApiFetcher<Data = unknown> = (siteId: Parameters<Fetcher<Data, string>>[0], api?: IContentDeliveryAPI) => ReturnType<Fetcher<Data, string>>

/**
 * Perform the actual fetch of data from the backend
 * 
 * @param siteId    The SiteID to load
 * @param api       The connection to use
 * @returns         The loaded and transformed data
 */
const siteFetcher : ApiFetcher<WebsiteInfo> = async (siteId: string, api?: IContentDeliveryAPI) =>
{
    const request = parseSwrKey(siteId)
    if (!api)
        return null

    const websites = await api.getWebsites()
    const hosts = websites.filter(w => w.hosts?.some(h => h.name == request.site) ?? false)
    const starHost : Website | undefined = websites.filter(w => w.hosts?.some(h => h.name === "*") ?? false)[0]

    const site = hosts.length > 0 ? hosts[0] : starHost
    if (!site)
        return null
    
    const info : NonNullable<WebsiteInfo> = {
        name: site.name,
        id: site.id,
        startPage: site.contentRoots?.startPage?.guidValue,
        startPageUrl: site.contentRoots?.startPage?.url,
        locales: (site.languages ?? []).map(x => x.name),
        defaultLocale: (site.languages ?? []).filter(x => x.isMasterLanguage === true).map(x => x.name)[0] ?? (site.languages ?? []).slice(0,1).map(x => x.name)[0],
        labels: (site.languages ?? []).map(x => { return { code: x.name, label: x.displayName }}),
        primaryDomain: (site.hosts ?? []).filter(x => x.type === "Primary").map(x => `http${isDevelopment ? '' : 's'}://${ x.name }`)[0] ?? "",
        domains: (site.hosts ?? []).filter(x => x.type !== "Edit").map(x => `http${isDevelopment ? '' : 's'}://${ x.name }`),
        localeDomains: (site.hosts ?? []).filter(x => x.type !== "Edit" && x.language?.name ).map(x => { return { domain: `http${isDevelopment ? '' : 's'}://${ x.name }`, defaultLocale: x.language?.name as string }})
    }
    return info
}

function parseSwrKey(swrKey: string) : { site: string, locale?: string }
{
    const keyUrl = new URL(swrKey)
    return {
        site: keyUrl.host,
        locale: keyUrl.searchParams.get('locale') || undefined
    }
}

function createSwrKey(siteDomain?: string, locale?: string) : string
{
    // If we don't have a site domain, use the current
    if (!siteDomain) siteDomain = CURRENT_SITE_KEY

    // Resolve the current site or fall-back to "unknown"
    if (siteDomain == CURRENT_SITE_KEY)
    {
        try {
            siteDomain = window.location.host
        } catch {
            siteDomain = UNKNOWN_SITE_KEY
        }
    }

    // Build the scheme / key
    const scheme = new URL(`${ SITE_SCHEME }/${ siteDomain }`)
    if (locale) scheme.searchParams.set('locale', locale)
    return scheme.href
}

//#endregion

export default useWebsite