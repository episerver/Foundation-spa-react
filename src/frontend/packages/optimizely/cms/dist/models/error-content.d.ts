import ContentLink from './content-link';
import ContentTypePath from './content-type-path';
import type { ContentStatus, IContent } from './icontent';
import Language from './language';
import LanguageList from './language-list';
import type { PropertyBoolean, Property, PropertyLongString } from './property';
export type ErrorType = "Generic" | "NotFound" | "Authentication";
export type ErrorData = {
    code: number;
    message?: string;
    details?: any;
};
export type ErrorContent = Error & IContent & {
    isError: PropertyBoolean;
    errorData: Property<ErrorData, never, "PropertyErrorData">;
    contentReference?: PropertyLongString;
};
/**
 * A default implmenetation of ErrorContent that is both an Exception
 * (e.g. it extends Error) and implements the ErrorContent interface
 * so it can be rendered as a component
 */
export declare class ErrorContentClass extends Error implements ErrorContent {
    contentLink: ContentLink<IContent>;
    language: Language;
    existingLanguages?: LanguageList | undefined;
    masterLanguage?: Language | undefined;
    contentType: ContentTypePath;
    parentLink?: ContentLink<IContent> | undefined;
    routeSegment?: string | null | undefined;
    url?: string | null | undefined;
    changed?: string | null | undefined;
    created?: string | null | undefined;
    startPublish?: string | null | undefined;
    stopPublish?: string | null | undefined;
    saved?: string | null | undefined;
    status?: ContentStatus | undefined;
    isError: PropertyBoolean;
    errorData: Property<ErrorData, never, 'PropertyErrorData'>;
    contentReference?: PropertyLongString;
    constructor(errorType: ErrorType, code: number, message?: string, contentReference?: string, details?: any);
}
