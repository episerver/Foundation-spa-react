import type { IContent } from './icontent'
import type { PropertyBoolean, Property, PropertyLongString } from './property'

export type ErrorType = "Generic" | "NotFound" | "Authentication"
export type ErrorData = {
    code: number
    message?: string
    details?: any
}
export type ErrorContent = IContent &
{
    isError: PropertyBoolean
    errorData: Property<ErrorData, never, "PropertyErrorData">
    contentReference?: PropertyLongString
}