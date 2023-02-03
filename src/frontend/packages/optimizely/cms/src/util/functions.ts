import type { IContentDeliveryAPI, ContentSearchResult } from '../content-delivery/icontent-delivery-api'
import type { IContent, IContentData } from '../models/icontent'
import type { Property, PropertyContentArea, ContentAreaPropertyValue } from '../models/property'
import type { IContentComponent } from '../models/components'
import type { ComponentLoader } from '../loader/index'
import createApiClient from '../content-delivery/factory'
import { preFetchContent } from '../hooks/prefetch-content'
import { readValue as pv } from './property'
import { createComponentLoader } from '../loader/index'

export type getPagesForLocaleOptions = {
    debug ?: boolean
    batchSize ?: number
}

/**
 * Normalize URLs, to ensure that they're consistent across Server Side Rendering, Static Site Generation and Client Side Hydration
 * 
 * @param       input       The input to normalize
 * @returns     The normalized URL
 */
export function normalizeUrl(input: string): string
{
    return input.replace(/\/$/,"")
}

/**
 * Helper method to load all pages for a specific locale, making use of the 
 * Optimizely Search & Navigation extension for the Content Delivery API.
 * 
 * @param       api         The API client instance to use
 * @param       locale      The language branch to load the pages for
 * @returns     A promise resolving in the loaded content items
 */
export async function getPagesForLocale(api: IContentDeliveryAPI, locale: string, options ?: getPagesForLocaleOptions): Promise<IContentData[]>
{
    const first = 0
    const take = options?.batchSize ?? 100

    if(options?.debug === true) {
       console.info(`Optimizely - CMS: getPagesForLocale(${ locale })`)
       console.info(`Optimizely - CMS: getPagesForLocale(${ locale }) :: Batch size:`, take)
    }
 
    const filter = 'ContentType/any(t:t eq \'Page\')'
 
    let resultSet : ContentSearchResult<IContentData> | undefined
    console.info(`Optimizely - CMS: getPagesForLocale(${ locale }) :: Fetching batch:`, 1)
    try {
        resultSet = await api.search(undefined, filter, undefined, first, take, false, {
            branch: locale
        })
    } catch (e) {
        if (options?.debug === true)
            console.error(`Optimizely - CMS: getPagesForLocale(${ locale }) :: Error while fetching page data (Start: ${ first }, Items: ${ take })`, e)
        return []
    }
    if (!resultSet)
        return []
    const totalPages = Math.ceil(resultSet.totalMatching / take)
    console.info(`Optimizely - CMS: getPagesForLocale(${ locale }) :: Remaining batches:`, totalPages - 1)

    for (var i = 1; i < totalPages; i++)
    {
        console.info(`Optimizely - CMS: getPagesForLocale(${ locale }) :: Fetching batch:`, i + 1)
        const start = first + (i * take)
        try {
            const nextResult = await api.search(undefined, filter, undefined, start, take, false, {
                branch: locale
            })
            if (!nextResult) 
                continue
            nextResult.results.forEach(x => resultSet?.results.push(x))
        } catch (e) {
            if (options?.debug === true)
                console.error(`Optimizely - CMS: getPagesForLocale(${ locale }) :: Error while fetching page data (Start: ${ start }, Items: ${ take })`, e)
            continue
        }
    }

    const respData : IContentData[] = resultSet.results.filter(x => isNonEmptyString(x?.url))

    return respData
}

 /**
  * Test if the given variable is both of type string and contains
  * a value (i.e. the length after trimming is greater then zero).
  * 
  * @param      toTest      The variable to test
  * @returns    True if it's a non-empty string, false otherwise
  */
 export function isNonEmptyString(toTest: any ) : toTest is string 
 {
     return typeof(toTest) === 'string' && toTest.trim().length > 0
 }

 /**
  * Helper function that either returns the provided value (when it's
  * not undefied) or invokes the factory method to return the requested
  * instance.
  * 
  * @param      providedValue       An optionally provided instance of an object
  * @param      factory             The factory method to create an instance if none was provided
  * @returns    The instance to use
  */
export function resolve<T>(providedValue: T | undefined, factory: () => T) : T
{
    if (providedValue === undefined)
        return factory()
    return providedValue
}

function isPromise<T>(toTest: any) : toTest is Promise<T>
{
    return typeof(toTest) === 'object' && toTest !== null && typeof(toTest.then) === 'function'
}

export type FilteredContentWithAdditionalProps = {
    /**
     * The content to be filtered and used to load additional 
     * properties.
     */
    content: IContent

    /**
     * The data for useSWR based hooks to render server side and 
     * hydrate in the browser.
     */
    fallback ?: Record<string, any>
} & Record<string, Property>

export async function loadAdditionalPropsAndFilter(content: IContentData, api: IContentDeliveryAPI, locale?: string, preview?: boolean, prefix?: string, cLoader?: ComponentLoader) : Promise<FilteredContentWithAdditionalProps>
{
    // Load component
    const moduleLoader = cLoader ?? createComponentLoader()
    const component = (await moduleLoader.tryDynamicAsync( content.contentType, prefix )) as IContentComponent | undefined

    // Load additional props
    const additionalProps = component?.getStaticProps && typeof(component?.getStaticProps) === 'function' ?
        await component.getStaticProps(content, { api, locale: locale, inEditMode: preview, loader: moduleLoader }) :
        {}

    // Apply content filter
    content = component ? await filterPropsBase(content, component, preview) : content

    return {
        content,
        ...additionalProps
    }
}

export async function filterProps(content: IContentData, api: IContentDeliveryAPI, locale?: string, preview?: boolean, cLoader?: ComponentLoader) : Promise<IContentData>
{
    // Load component
    const moduleLoader = cLoader ?? createComponentLoader()
    const component = (await moduleLoader.tryDynamicAsync( content.contentType )) as IContentComponent | undefined

    // Apply filter if we have a component
    const result = component ? await filterPropsBase(content, component, preview) : content
    return result
}

const filterPropsBase = async (content: IContentData, component: IContentComponent, inEditMode: boolean = false) => {
    let filter = component.getContentFields ? component.getContentFields({ inEditMode }) : undefined

    // Await filter if needed
    if (isPromise(filter))
        filter = await filter

    // Apply filter if needed
    if (Array.isArray(filter)) {
        const newContent : IContentData = {
            contentLink: content.contentLink,
            contentType: content.contentType,
            language: content.language,
            name: content.name
        }
        for (const key of Object.getOwnPropertyNames(content))
            if (filter.indexOf(key) >= 0)
                newContent[key] = content[key]

        content = newContent
    }

    return content
}

type KeyOfType<T, V> = keyof {
    [P in keyof T as T[P] extends V ? P : never ]: any
}

type AreaConfig<T extends IContent = IContentData> = {
    name: KeyOfType<T, PropertyContentArea>
    select ?: string[]
    expand ?: string[]
}

type PrefetchResponse = Record<string, IContentData>

export async function prefetchContentAreaRecursive<T extends IContent = IContentData>(content : T, areas : AreaConfig<T>[], locale ?: string, inEditMode : boolean = false, scope ?: string, cdApi ?: IContentDeliveryAPI, cLoader ?: ComponentLoader ) : Promise<PrefetchResponse>
{
    const contentItems : Record<string, IContentData> = {}
    const api = cdApi ?? createApiClient({ debug: false, })
    const moduleLoader = cLoader ?? createComponentLoader()

    // Retrieve the contentItems per content area
    const loadedItems = await Promise.all(areas.map(async (area) => {
        const ca = (pv(content, area.name) ?? []) as ContentAreaPropertyValue
        const preFetched = await preFetchContent(ca.map(i => i.contentLink), area.select, area.expand, locale, inEditMode, scope, api)
        const recursions : Promise<FilteredContentWithAdditionalProps & { fallback?: Record<string, IContentData>, key: string }>[] = []
        for (const key of Object.keys(preFetched.fallback)) 
        {
            const itemKey = key
            const itemContent = preFetched.fallback[key]
            recursions.push(loadAdditionalPropsAndFilter(itemContent, api, locale, inEditMode === true, 'block', moduleLoader).then(d => {
                return {
                    ...d,
                    key: itemKey
                }
            }))
        }
        const results = await Promise.all(recursions)
        results.forEach(result => {
            if(result.content)
                preFetched.fallback[result.key] = result.content
            if(result.fallback) 
                for (const cid of Object.keys(result.fallback)) {
                    preFetched.fallback[cid] = result.fallback[cid]
                }
        })
        return preFetched.fallback
    }));

    // Merge all te results we have
    loadedItems.forEach(item => { for (const cid of Object.keys(item)) contentItems[cid] = item[cid] })

    return contentItems
}

export function isDxpDebugActive() : boolean 
{
    try {
        return process?.env?.OPTIMIZELY_DXP_DEBUG == '1' || process?.env?.OPTIMIZELY_DXP_DEBUG == 'true' || (typeof(process?.env?.OPTIMIZELY_DXP_DEBUG) == 'string' && (process?.env?.OPTIMIZELY_DXP_DEBUG as string).toLowerCase() == 'true')
    } catch 
    {
        return false;
    }
}