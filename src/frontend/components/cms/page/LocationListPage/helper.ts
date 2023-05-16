import type { ParsedUrlQuery } from "node:querystring";

export type AppliedFilters = {
    field: string,
    value: string | string[]
}[]

export function createFilter(parentId : string, extra?: string) : string {
    const filter = `ContentType/any(t:t eq 'LocationItemPage') and parentLink/guidValue eq '${ parentId }'${ extra ? ` and (${ extra })` : ''}`
    console.log("Created Full OData Query", filter)
    return filter
}

export function handleUrlQuery(query: ParsedUrlQuery) : AppliedFilters
{
    const filters : AppliedFilters = []
    for (let key of Object.getOwnPropertyNames(query)) if (key.startsWith("f:") && query[key] != undefined) {
        filters.push({
            field: key.substring(2),
            value: query[key] as string | string[]
        })
    }
    console.log("Processed URL Query", filters)
    return filters
}

export function filterToOData(filters: AppliedFilters)
{
    const fragmentParts : string[] = []

    filters.forEach(filter => {
        if (Array.isArray(filter.value))
            fragmentParts.push(`(${ filter.value.map(val => `${ filter.field } ${ valueToFilter(val) }`).join(' or ') })`)
        else
            fragmentParts.push(`${ filter.field } ${ valueToFilter(filter.value) }`)
    })

    const fragment = fragmentParts.join(' and ')
    console.log("Converted to OData fragment", filters, fragment)
    return fragment
}

function valueToFilter(value: string, defaultOperator: string = 'eq')
{
    if (value == 'false')
        return "ne 'true'"
    if (value == 'true')
        return "eq 'true'"
    return `${defaultOperator} '${value}'`
}