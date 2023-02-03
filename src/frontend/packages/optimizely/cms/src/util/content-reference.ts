import type { ContentReference, IContent, ContentLink, ContentApiId } from '../models'
import { isContentLink  } from './content-link';

export function referenceIsIContent(ref ?: ContentReference | null | undefined): ref is IContent {
    if (typeof(ref) !== 'object' || ref === null)
        return false
    if (isContentLink(ref))
        return false
    return (ref && Array.isArray(ref.contentType) && ref.name) ? true : false;
}

export function referenceIsContentLink(ref ?: ContentReference | null | undefined): ref is ContentLink {
    return isContentLink(ref)
}

export function referenceIsString(ref ?: ContentReference | null | undefined): ref is string {
    return typeof(ref) === 'string' && ref.length > 0
}

export function contentApiIdIsGuid(apiId : ContentApiId) : boolean 
{
    const guidRegex = /^[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}$/
    return apiId.match(guidRegex) ? true : false;
}

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
export function createLanguageId(reference: ContentReference, languageCode?: string, inEditMode = false) : ContentApiId 
 {
     const baseId = createApiId(reference, true, inEditMode);

     if (referenceIsIContent(reference) && reference.language?.name)
         return `${ baseId }___${ reference.language.name }`;

     if (!languageCode)
         throw new Error('Reference is not translatable iContent and no languageCode specified!');

     return `${ baseId }___${ languageCode }`;
 }

 /**
  * Generate a ContentDeliveryAPI Compliant identifier for a given content reference. Preferring
  * the GUID as the default config of the ContentDeliveryAPI does not yield the numeric identifier.
  *
  * @param   id             The content reference to generate the API-ID for
  * @param   preferGuid     If set, prefer to receive the GUID as api identifier
  * @param   inEditMode     If set, get the identifier, including work-id to load a specific version of the content
  * @returns The API key for the provided content reference
  */
export function createApiId(id: ContentReference, preferGuid : boolean = true, inEditMode : boolean = false) : ContentApiId
{
    const useGuid = preferGuid && !inEditMode // Do not use GUID in edit mode
    let link : ContentLink | undefined = undefined

    if (referenceIsString(id))
        return id

    if (referenceIsIContent(id))
        link = id.contentLink

    if (referenceIsContentLink(id))
        link = id

    if (!link) {
        if (typeof(id) === "string") {
            console.warn("Empty Optimizely Content Delivery ID")
            return id
        }
        throw new Error(`The provided Content Reference is not resolvable to a ContentID; DataType: ${ typeof(id) }; Value: ${ id }`)
    }

    // Return the GUID if it's preferred or the identifier is not set
    if ((useGuid && link.guidValue) || (!link.id && link.guidValue)) {
        return link.guidValue

    // Build the Content identifier if the link is known
    } else if (link.id) {
        let out: string = link.id.toString()

        if (inEditMode && link.workId)
            out = `${out}_${link.workId}`
        
        if (link.providerName) 
            out = `${out}__${link.providerName}`
        
        return out
    }

    throw new Error("Unable to generate an Optimizely Content Delivery API ID [02]")
}

export function createContentUrl(id: ContentReference) : string | undefined
{
    if (referenceIsString(id)) return id
    if (referenceIsIContent(id)) return id.contentLink.url
    if (referenceIsContentLink(id)) return id.url
}