import type { StructuredHtmlData, ParsedStructuredHtmlData } from './types'

export function isStructuredHtml(value: any, deep: boolean = false) : value is StructuredHtmlData
{
    if (typeof(value) === 'object' && value != null)
    {
        return typeof((value as StructuredHtmlData).data) == 'string' &&  (value as StructuredHtmlData).data.length > 0
    }
    return false
}

export function parseStructuredHtmlData(structuredData: StructuredHtmlData) : ParsedStructuredHtmlData
{
    return {
        contents: structuredData.contents,
        errors: structuredData.errors,
        components: JSON.parse(structuredData.data)
    }
}