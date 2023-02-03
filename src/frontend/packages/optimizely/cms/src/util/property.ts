import type { IContent, Property, VerboseProperty, ExpandedTypeFor, PropertyDataType, FlattenedProperty } from '../models'

export function isVerboseProperty<
        VT = unknown, 
        ET = ExpandedTypeFor<VT>, 
        VTI extends string = PropertyDataType<VT>
    >(toTest: Property<VT,ET,VTI>, propertyType?: VTI) : toTest is VerboseProperty<VT, ET, VTI>
{
    // A verbose property is always a "non-null" object which defines a 
    // propertyDataType and value
    if (typeof(toTest) === 'object' 
            && toTest !== null
            && typeof((toTest as VerboseProperty<VT, ET, VTI>).propertyDataType) === 'string'
            && (toTest as VerboseProperty<VT, ET, VTI>).propertyDataType.length > 0
            && typeof((toTest as VerboseProperty<VT, ET, VTI>).value) !== 'undefined'
    ) {
        return typeof(propertyType) === 'string' && propertyType.length > 0 ? (toTest as VerboseProperty<VT, ET, VTI>).propertyDataType === propertyType : true
    }

    return false
}

/**
 * Read the value from an IContent property, regardless of the configuration
 * of the ContentDelivery API (i.e. it can either be short or long)
 * 
 * @param       model   The IContent data to read from
 * @param       field   The property value to read
 * @returns 
 */
export function readValue<
    C extends IContent, 
    F extends keyof C
>(
    model: C | undefined, 
    field: F
) : FlattenedProperty<C[F] extends Property<infer R> ? R : C[F]>
{
    if (model === undefined || model === null)
        return undefined
    const fieldValue = model[field]
    return processValue(fieldValue) as FlattenedProperty<C[F] extends Property<infer R> ? R : C[F]>
}

export function processValue<T>(propertyValue: Property<T>) : FlattenedProperty<T>
{
    return isVerboseProperty(propertyValue) ? propertyValue.value : propertyValue
}

/*export function readExpandedValue<
    C extends IContent,
    F extends keyof C
>(
    model: C | undefined,
    field: F
) : (C[F] extends Property<infer R, infer ET> ? ET : never) | undefined
{
    if (model === undefined || model === null)
        return undefined
    
    const fieldValue = model[field]
    if (isVerboseProperty(fieldValue)) {
        return fieldValue.expandedValue
    }
    return undefined
}*/