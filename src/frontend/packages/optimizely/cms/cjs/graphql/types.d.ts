export declare type PromiseReturnType<Type> = Type extends Promise<infer X> ? X : never;
export declare type ClientConfiguration = {
    domain: string;
    token: string;
    debug?: boolean;
    throwOnError?: boolean;
};
export declare type QueryResponse<DataType = any, FetchType extends (...args: any[]) => any = () => any> = (DataResponse<DataType> | ErrorResponse<DataType>) & QueryResponseBase<FetchType>;
export declare type DataResponse<T> = {
    data: T;
    errors?: ErrorDetails[];
};
export declare type ErrorResponse<T> = {
    data?: T;
    errors: ErrorDetails[];
};
export declare type QueryResponseBase<F extends (...args: any[]) => any = () => any> = {
    extensions: {
        requestId: string;
        queries?: Record<string, {
            total: number;
            facets: {
                [facetName: string]: {
                    [facetValue: string]: number;
                }[];
            };
        }>;
        responseTime: number;
        cursor?: string;
    };
    res: PromiseReturnType<ReturnType<F>>;
};
export declare type ErrorDetails = {
    message: string;
    locations?: {
        line: number;
        column: number;
    }[];
};
