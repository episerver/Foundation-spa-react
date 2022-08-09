import { ContentDelivery } from '..';
import { preFetchContent } from '../hooks';
import { readValue as pv } from './property';
import { ComponentLoader } from '..';
/**
 * Normalize URLs, to ensure that they're consistent across Server Side Rendering, Static Site Generation and Client Side Hydration
 *
 * @param       input       The input to normalize
 * @returns     The normalized URL
 */
export function normalizeUrl(input) {
    return input.replace(/\/$/, "");
}
/**
 * Helper method to load all pages for a specific locale, making use of the
 * Optimizely Search & Navigation extension for the Content Delivery API.
 *
 * @param       api         The API client instance to use
 * @param       locale      The language branch to load the pages for
 * @returns     A promise resolving in the loaded content items
 */
export async function getPagesForLocale(api, locale, options) {
    if (options?.debug === true)
        console.info(`Retrieving all pages for locale: ${locale}`);
    const first = 0;
    const take = options?.batchSize ?? 100;
    const filter = 'ContentType/any(t:t eq \'Page\')';
    let resultSet;
    try {
        resultSet = await api.search(undefined, filter, undefined, first, take, false, {
            branch: locale
        });
    }
    catch (e) {
        if (options?.debug === true)
            console.error(`Error while fetching page data (Start: ${first}, Items: ${take})`, e);
        return [];
    }
    if (!resultSet)
        return [];
    const totalPages = Math.ceil(resultSet.totalMatching / take);
    for (var i = 1; i < totalPages; i++) {
        const start = first + (i * take);
        try {
            const nextResult = await api.search(undefined, filter, undefined, start, take, false, {
                branch: locale
            });
            if (!nextResult)
                continue;
            nextResult.results.forEach(x => resultSet?.results.push(x));
        }
        catch (e) {
            if (options?.debug === true)
                console.error(`Error while fetching page data (Start: ${start}, Items: ${take})`, e);
            continue;
        }
    }
    const respData = resultSet.results.filter(x => isNonEmptyString(x?.url));
    return respData;
}
/**
 * Test if the given variable is both of type string and contains
 * a value (i.e. the length after trimming is greater then zero).
 *
 * @param      toTest      The variable to test
 * @returns    True if it's a non-empty string, false otherwise
 */
export function isNonEmptyString(toTest) {
    return typeof (toTest) === 'string' && toTest.trim().length > 0;
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
export function resolve(providedValue, factory) {
    if (providedValue === undefined)
        return factory();
    return providedValue;
}
function isPromise(toTest) {
    return typeof (toTest) === 'object' && toTest !== null && typeof (toTest.then) === 'function';
}
export async function loadAdditionalPropsAndFilter(content, api, locale, preview, prefix) {
    // Load component
    const moduleLoader = ComponentLoader.setup();
    const component = (await moduleLoader.tryDynamicAsync(content.contentType, prefix));
    // Load additional props
    const additionalProps = component?.getStaticProps && typeof (component?.getStaticProps) === 'function' ?
        await component.getStaticProps(content, { api, locale: locale, inEditMode: preview }) :
        {};
    // Apply content filter
    let filter = component?.getContentFields ? component?.getContentFields({ inEditMode: preview }) : undefined;
    if (isPromise(filter))
        filter = await filter;
    if (Array.isArray(filter)) {
        const newContent = {
            contentLink: content.contentLink,
            contentType: content.contentType,
            language: content.language,
            name: content.name
        };
        for (const key of Object.getOwnPropertyNames(content))
            if (filter.indexOf(key) >= 0)
                newContent[key] = content[key];
        content = newContent;
    }
    return {
        content,
        ...additionalProps
    };
}
export async function filterProps(content, api, locale, preview) {
    // Load component
    const moduleLoader = ComponentLoader.setup();
    const component = (await moduleLoader.tryDynamicAsync(content.contentType));
    // Apply content filter
    let filter = component?.getContentFields ? component?.getContentFields({ inEditMode: preview }) : undefined;
    if (isPromise(filter))
        filter = await filter;
    if (Array.isArray(filter)) {
        const newContent = {
            contentLink: content.contentLink,
            contentType: content.contentType,
            language: content.language,
            name: content.name
        };
        for (const key of Object.getOwnPropertyNames(content))
            if (filter.indexOf(key) >= 0)
                newContent[key] = content[key];
        content = newContent;
    }
    return content;
}
export async function prefetchContentAreaRecursive(content, areas, locale, inEditMode = false, scope, cdApi) {
    const contentItems = {};
    const api = cdApi ?? ContentDelivery.createInstance({ debug: false, });
    // Retrieve the contentItems per content area
    const loadedItems = await Promise.all(areas.map(async (area) => {
        const ca = (pv(content, area.name) ?? []);
        const preFetched = await preFetchContent(ca.map(i => i.contentLink), area.select, area.expand, locale, inEditMode, scope, api);
        const recursions = [];
        for (const key of Object.keys(preFetched.fallback)) {
            const itemKey = key;
            const itemContent = preFetched.fallback[key];
            recursions.push(loadAdditionalPropsAndFilter(itemContent, api, locale, inEditMode === true, 'block').then(d => {
                return {
                    ...d,
                    key: itemKey
                };
            }));
        }
        const results = await Promise.all(recursions);
        results.forEach(result => {
            if (result.content)
                preFetched.fallback[result.key] = result.content;
            if (result.fallback)
                for (const cid of Object.keys(result.fallback)) {
                    preFetched.fallback[cid] = result.fallback[cid];
                }
        });
        return preFetched.fallback;
    }));
    // Merge all te results we have
    loadedItems.forEach(item => { for (const cid of Object.keys(item))
        contentItems[cid] = item[cid]; });
    return contentItems;
}
//# sourceMappingURL=functions.js.map