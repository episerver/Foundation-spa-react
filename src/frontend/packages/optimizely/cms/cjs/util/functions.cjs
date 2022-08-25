"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDxpDebugActive = exports.prefetchContentAreaRecursive = exports.filterProps = exports.loadAdditionalPropsAndFilter = exports.resolve = exports.isNonEmptyString = exports.getPagesForLocale = exports.normalizeUrl = void 0;
const tslib_1 = require("tslib");
const __1 = require("..");
const hooks_1 = require("../hooks");
const property_1 = require("./property");
const __2 = require("..");
/**
 * Normalize URLs, to ensure that they're consistent across Server Side Rendering, Static Site Generation and Client Side Hydration
 *
 * @param       input       The input to normalize
 * @returns     The normalized URL
 */
function normalizeUrl(input) {
    return input.replace(/\/$/, "");
}
exports.normalizeUrl = normalizeUrl;
/**
 * Helper method to load all pages for a specific locale, making use of the
 * Optimizely Search & Navigation extension for the Content Delivery API.
 *
 * @param       api         The API client instance to use
 * @param       locale      The language branch to load the pages for
 * @returns     A promise resolving in the loaded content items
 */
function getPagesForLocale(api, locale, options) {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if ((options === null || options === void 0 ? void 0 : options.debug) === true)
            console.info(`Retrieving all pages for locale: ${locale}`);
        const first = 0;
        const take = (_a = options === null || options === void 0 ? void 0 : options.batchSize) !== null && _a !== void 0 ? _a : 100;
        const filter = 'ContentType/any(t:t eq \'Page\')';
        let resultSet;
        try {
            resultSet = yield api.search(undefined, filter, undefined, first, take, false, {
                branch: locale
            });
        }
        catch (e) {
            if ((options === null || options === void 0 ? void 0 : options.debug) === true)
                console.error(`Error while fetching page data (Start: ${first}, Items: ${take})`, e);
            return [];
        }
        if (!resultSet)
            return [];
        const totalPages = Math.ceil(resultSet.totalMatching / take);
        for (var i = 1; i < totalPages; i++) {
            const start = first + (i * take);
            try {
                const nextResult = yield api.search(undefined, filter, undefined, start, take, false, {
                    branch: locale
                });
                if (!nextResult)
                    continue;
                nextResult.results.forEach(x => resultSet === null || resultSet === void 0 ? void 0 : resultSet.results.push(x));
            }
            catch (e) {
                if ((options === null || options === void 0 ? void 0 : options.debug) === true)
                    console.error(`Error while fetching page data (Start: ${start}, Items: ${take})`, e);
                continue;
            }
        }
        const respData = resultSet.results.filter(x => isNonEmptyString(x === null || x === void 0 ? void 0 : x.url));
        return respData;
    });
}
exports.getPagesForLocale = getPagesForLocale;
/**
 * Test if the given variable is both of type string and contains
 * a value (i.e. the length after trimming is greater then zero).
 *
 * @param      toTest      The variable to test
 * @returns    True if it's a non-empty string, false otherwise
 */
function isNonEmptyString(toTest) {
    return typeof (toTest) === 'string' && toTest.trim().length > 0;
}
exports.isNonEmptyString = isNonEmptyString;
/**
 * Helper function that either returns the provided value (when it's
 * not undefied) or invokes the factory method to return the requested
 * instance.
 *
 * @param      providedValue       An optionally provided instance of an object
 * @param      factory             The factory method to create an instance if none was provided
 * @returns    The instance to use
 */
function resolve(providedValue, factory) {
    if (providedValue === undefined)
        return factory();
    return providedValue;
}
exports.resolve = resolve;
function isPromise(toTest) {
    return typeof (toTest) === 'object' && toTest !== null && typeof (toTest.then) === 'function';
}
function loadAdditionalPropsAndFilter(content, api, locale, preview, prefix) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        // Load component
        const moduleLoader = __2.ComponentLoader.setup();
        const component = (yield moduleLoader.tryDynamicAsync(content.contentType, prefix));
        // Load additional props
        const additionalProps = (component === null || component === void 0 ? void 0 : component.getStaticProps) && typeof (component === null || component === void 0 ? void 0 : component.getStaticProps) === 'function' ?
            yield component.getStaticProps(content, { api, locale: locale, inEditMode: preview }) :
            {};
        // Apply content filter
        let filter = (component === null || component === void 0 ? void 0 : component.getContentFields) ? component === null || component === void 0 ? void 0 : component.getContentFields({ inEditMode: preview }) : undefined;
        if (isPromise(filter))
            filter = yield filter;
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
        return Object.assign({ content }, additionalProps);
    });
}
exports.loadAdditionalPropsAndFilter = loadAdditionalPropsAndFilter;
function filterProps(content, api, locale, preview) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        // Load component
        const moduleLoader = __2.ComponentLoader.setup();
        const component = (yield moduleLoader.tryDynamicAsync(content.contentType));
        // Apply content filter
        let filter = (component === null || component === void 0 ? void 0 : component.getContentFields) ? component === null || component === void 0 ? void 0 : component.getContentFields({ inEditMode: preview }) : undefined;
        if (isPromise(filter))
            filter = yield filter;
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
    });
}
exports.filterProps = filterProps;
function prefetchContentAreaRecursive(content, areas, locale, inEditMode = false, scope, cdApi) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const contentItems = {};
        const api = cdApi !== null && cdApi !== void 0 ? cdApi : __1.ContentDelivery.createInstance({ debug: false, });
        // Retrieve the contentItems per content area
        const loadedItems = yield Promise.all(areas.map((area) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a;
            const ca = ((_a = (0, property_1.readValue)(content, area.name)) !== null && _a !== void 0 ? _a : []);
            const preFetched = yield (0, hooks_1.preFetchContent)(ca.map(i => i.contentLink), area.select, area.expand, locale, inEditMode, scope, api);
            const recursions = [];
            for (const key of Object.keys(preFetched.fallback)) {
                const itemKey = key;
                const itemContent = preFetched.fallback[key];
                recursions.push(loadAdditionalPropsAndFilter(itemContent, api, locale, inEditMode === true, 'block').then(d => {
                    return Object.assign(Object.assign({}, d), { key: itemKey });
                }));
            }
            const results = yield Promise.all(recursions);
            results.forEach(result => {
                if (result.content)
                    preFetched.fallback[result.key] = result.content;
                if (result.fallback)
                    for (const cid of Object.keys(result.fallback)) {
                        preFetched.fallback[cid] = result.fallback[cid];
                    }
            });
            return preFetched.fallback;
        })));
        // Merge all te results we have
        loadedItems.forEach(item => { for (const cid of Object.keys(item))
            contentItems[cid] = item[cid]; });
        return contentItems;
    });
}
exports.prefetchContentAreaRecursive = prefetchContentAreaRecursive;
function isDxpDebugActive() {
    var _a, _b, _c, _d;
    try {
        return ((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.OPTIMIZELY_DXP_DEBUG) == '1' || ((_b = process === null || process === void 0 ? void 0 : process.env) === null || _b === void 0 ? void 0 : _b.OPTIMIZELY_DXP_DEBUG) == 'true' || (typeof ((_c = process === null || process === void 0 ? void 0 : process.env) === null || _c === void 0 ? void 0 : _c.OPTIMIZELY_DXP_DEBUG) == 'string' && ((_d = process === null || process === void 0 ? void 0 : process.env) === null || _d === void 0 ? void 0 : _d.OPTIMIZELY_DXP_DEBUG).toLowerCase() == 'true');
    }
    catch (_e) {
        return false;
    }
}
exports.isDxpDebugActive = isDxpDebugActive;
//# sourceMappingURL=functions.js.map