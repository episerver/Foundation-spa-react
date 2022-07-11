import type { IContent } from './icontent';
import type { PropertyBoolean, Property, PropertyLongString } from './property';
export declare type ErrorType = "Generic" | "NotFound" | "Authentication";
export declare type ErrorData = {
    code: number;
    message?: string;
    details?: any;
};
export declare type ErrorContent = IContent & {
    isError: PropertyBoolean;
    errorData: Property<ErrorData, never, "PropertyErrorData">;
    contentReference?: PropertyLongString;
};
