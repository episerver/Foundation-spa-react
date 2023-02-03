import type { StructuredHtmlData } from './types'

export function isStructuredHtml(value: any, deep: boolean = false) : value is StructuredHtmlData
{
    if (typeof(value) === 'object' && value != null)
    {
        return Array.isArray((value as StructuredHtmlData).components) &&
            Array.isArray((value as StructuredHtmlData).errors)
    }
    return false
}