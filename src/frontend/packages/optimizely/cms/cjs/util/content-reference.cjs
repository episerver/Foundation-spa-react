"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContentUrl = exports.createApiId = exports.createLanguageId = exports.contentApiIdIsGuid = exports.referenceIsString = exports.referenceIsContentLink = exports.referenceIsIContent = void 0;
const content_link_1 = require("./content-link");
const DXP_URL = (_a = process.env.OPTIMIZELY_DXP_URL) !== null && _a !== void 0 ? _a : 'http://localhost:8000/';
function referenceIsIContent(ref) {
    if (typeof (ref) !== 'object' || ref === null)
        return false;
    if ((0, content_link_1.isContentLink)(ref))
        return false;
    return (ref && Array.isArray(ref.contentType) && ref.name) ? true : false;
}
exports.referenceIsIContent = referenceIsIContent;
function referenceIsContentLink(ref) {
    return (0, content_link_1.isContentLink)(ref);
}
exports.referenceIsContentLink = referenceIsContentLink;
function referenceIsString(ref) {
    return typeof (ref) === 'string' && ref.length > 0;
}
exports.referenceIsString = referenceIsString;
function contentApiIdIsGuid(apiId) {
    const guidRegex = /^[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}$/;
    return apiId.match(guidRegex) ? true : false;
}
exports.contentApiIdIsGuid = contentApiIdIsGuid;
/**
 * Generate a - language aware - identifier for a given content reference. When the language is mandatory when
 * the reference is a string or ContentLink, and ignored when the reference is iContent. This ID is not supported
 * by the ContentDelivery API.
 *
 * @param   reference      The content reference to generate the API-ID for
 * @param   [languageCode] The language code to use, if the reference is not iContent
 * @param   [inEditMode]   If set, get the identifier, including work-id to load a specific version of the content
 * @returns The Language Aware content reference
 */
function createLanguageId(reference, languageCode, inEditMode = false) {
    var _a;
    const baseId = createApiId(reference, true, inEditMode);
    if (referenceIsIContent(reference) && ((_a = reference.language) === null || _a === void 0 ? void 0 : _a.name))
        return `${baseId}___${reference.language.name}`;
    if (!languageCode)
        throw new Error('Reference is not translatable iContent and no languageCode specified!');
    return `${baseId}___${languageCode}`;
}
exports.createLanguageId = createLanguageId;
/**
 * Generate a ContentDeliveryAPI Compliant identifier for a given content reference. Preferring
 * the GUID as the default config of the ContentDeliveryAPI does not yield the numeric identifier.
 *
 * @param   id             The content reference to generate the API-ID for
 * @param   preferGuid     If set, prefer to receive the GUID as api identifier
 * @param   inEditMode     If set, get the identifier, including work-id to load a specific version of the content
 * @returns The API key for the provided content reference
 */
function createApiId(id, preferGuid = true, inEditMode = false) {
    const useGuid = preferGuid && !inEditMode; // Do not use GUID in edit mode
    let link = undefined;
    if (referenceIsString(id))
        return id;
    if (referenceIsIContent(id))
        link = id.contentLink;
    if (referenceIsContentLink(id))
        link = id;
    if (!link) {
        if (typeof (id) === "string") {
            console.warn("Empty Optimizely Content Delivery ID");
            return id;
        }
        throw new Error(`The provided Content Reference is not resolvable to a ContentID; DataType: ${typeof (id)}; Value: ${id}`);
    }
    // Return the GUID if it's preferred or the identifier is not set
    if ((useGuid && link.guidValue) || (!link.id && link.guidValue)) {
        return link.guidValue;
        // Build the Content identifier if the link is known
    }
    else if (link.id) {
        let out = link.id.toString();
        if (inEditMode && link.workId)
            out = `${out}_${link.workId}`;
        if (link.providerName)
            out = `${out}__${link.providerName}`;
        return out;
    }
    throw new Error("Unable to generate an Optimizely Content Delivery API ID [02]");
}
exports.createApiId = createApiId;
function createContentUrl(id, rebase = true) {
    let urlString = undefined;
    if (referenceIsString(id))
        urlString = id;
    if (referenceIsIContent(id))
        urlString = id.contentLink.url;
    if (referenceIsContentLink(id))
        urlString = id.url;
    if (rebase && urlString) {
        try {
            const url = new URL(urlString, DXP_URL);
            const du = new URL(DXP_URL);
            if (url.host != du.host)
                url.host = du.host;
            if (url.protocol != du.protocol)
                url.protocol = du.protocol;
            return url.href;
        }
        catch (_a) {
            return undefined;
        }
    }
    return urlString;
}
exports.createContentUrl = createContentUrl;
//# sourceMappingURL=content-reference.js.map