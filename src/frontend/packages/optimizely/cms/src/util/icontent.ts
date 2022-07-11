import type { IContent, ErrorType, ErrorContent } from '../models'

export function isIContent(toTest: any) : toTest is IContent
{
    if (!toTest) return false // IContent may not be undefined

    if (typeof(toTest) !== 'object' || toTest === null)
        return false // IContent must be an object and may not be null

    return Array.isArray(toTest.contentType) && toTest.contentType.length > 0 && (toTest.contentLink?.guidValue || toTest.contentLink?.id)
}

export function createErrorContent(errorType: ErrorType, code: number, message?: string, contentReference?: string, details?: any) : ErrorContent
{
    return {
        contentLink: {
            id: 0,
            guidValue: "00000000-0000-0000-0000-000000000000",
            url: ""
        },
        contentType: ["Error", errorType],
        name: "Error",
        language: {
            displayName: "English",
            name: "en"
        },
        isError: true,
        errorData: {
            code,
            message,
            details
        },
        contentReference
    }
}