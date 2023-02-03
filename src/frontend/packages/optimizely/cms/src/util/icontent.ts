import type { IContent, ErrorType, ErrorContent } from '../models'
import { ErrorContentClass } from '../models/error-content'

export function isIContent(toTest: any) : toTest is IContent
{
    if (!toTest) return false // IContent may not be undefined

    if (typeof(toTest) !== 'object' || toTest === null)
        return false // IContent must be an object and may not be null

    return Array.isArray(toTest.contentType) && toTest.contentType.length > 0 && (toTest.contentLink?.guidValue || toTest.contentLink?.id)
}

export function createErrorContent(errorType: ErrorType, code: number, message?: string, contentReference?: string, details?: any) : ErrorContent
{
    return new ErrorContentClass(errorType, code, message, contentReference, details)
}