import type { StructuredHtmlData, BaseStructuredHtmlData, ParsedStructuredHtmlData, StructuredHtmlNode } from './types'

export function isStructuredHtml(value: any, deep: boolean = false) : value is StructuredHtmlData
{
    if (typeof(value) === 'object' && value != null)
        return typeof((value as BaseStructuredHtmlData).data) == 'string' &&  (value as BaseStructuredHtmlData).data.length > 0

    if (typeof(value) === 'string' && value.startsWith("[") && value.endsWith("]"))
        return true

    return false
}

export function isParsedStructuredHtmlData(structuredData: StructuredHtmlData) : structuredData is ParsedStructuredHtmlData
{
    if (typeof structuredData === 'string')
        return false
    return Array.isArray((structuredData as ParsedStructuredHtmlData).components)
}

export function parseStructuredHtmlData(structuredData: StructuredHtmlData) : ParsedStructuredHtmlData
{
    if (isParsedStructuredHtmlData(structuredData))
        return structuredData

    if (typeof structuredData === 'string')
    {
        var components = JSON.parse(structuredData) as StructuredHtmlNode[]
        if (!(Array.isArray(components) && (components.length == 0 || components[0].componentType)))
            throw new Error("Invalid structured data")
        return {
            data: structuredData,
            components
        }
    }

    return {
        data: structuredData.data,
        contents: structuredData.contents,
        errors: structuredData.errors,
        components: JSON.parse(structuredData.data)
    }
}

export function tryParseStructuredHtmlData(structuredData: StructuredHtmlData) : ParsedStructuredHtmlData | null
{
    try {
        return parseStructuredHtmlData(structuredData)
    } catch {
        return null
    }
}