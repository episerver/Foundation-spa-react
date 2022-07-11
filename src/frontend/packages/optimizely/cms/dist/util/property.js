export function isVerboseProperty(toTest, propertyType) {
    // A verbose property is always a "non-null" object which defines a 
    // propertyDataType and value
    if (typeof (toTest) === 'object'
        && toTest !== null
        && typeof (toTest.propertyDataType) === 'string'
        && toTest.propertyDataType.length > 0
        && typeof (toTest.value) !== 'undefined') {
        return typeof (propertyType) === 'string' && propertyType.length > 0 ? toTest.propertyDataType === propertyType : true;
    }
    return false;
}
/**
 * Read the value from an IContent property, regardless of the configuration
 * of the ContentDelivery API (i.e. it can either be short or long)
 *
 * @param       model   The IContent data to read from
 * @param       field   The property value to read
 * @returns
 */
export function readValue(model, field) {
    if (model === undefined || model === null)
        return undefined;
    const fieldValue = model[field];
    return processValue(fieldValue);
}
export function processValue(propertyValue) {
    return isVerboseProperty(propertyValue) ? propertyValue.value : propertyValue;
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
//# sourceMappingURL=property.js.map