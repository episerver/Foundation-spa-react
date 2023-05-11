import type { ContentReference, IContent, ContentLink, ContentApiId } from '../models';
export declare function referenceIsIContent(ref?: ContentReference | null | undefined): ref is IContent;
export declare function referenceIsContentLink(ref?: ContentReference | null | undefined): ref is ContentLink;
export declare function referenceIsString(ref?: ContentReference | null | undefined): ref is string;
export declare function contentApiIdIsGuid(apiId: ContentApiId): boolean;
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
export declare function createLanguageId(reference: ContentReference, languageCode?: string, inEditMode?: boolean): ContentApiId;
/**
 * Generate a ContentDeliveryAPI Compliant identifier for a given content reference. Preferring
 * the GUID as the default config of the ContentDeliveryAPI does not yield the numeric identifier.
 *
 * @param   id             The content reference to generate the API-ID for
 * @param   preferGuid     If set, prefer to receive the GUID as api identifier
 * @param   inEditMode     If set, get the identifier, including work-id to load a specific version of the content
 * @returns The API key for the provided content reference
 */
export declare function createApiId(id: ContentReference, preferGuid?: boolean, inEditMode?: boolean): ContentApiId;
export declare function createContentUrl(id: ContentReference, rebase?: boolean): string | undefined;
