export type PromiseReturnType<Type> = Type extends Promise<infer X> ? X : never
export type ClientConfiguration = {
    domain        : string,
    token         : string,
    debug        ?: boolean,
    throwOnError ?: boolean
}
export type QueryResponse<DataType = any, FetchType extends (...args: any[]) => any = () => any> = (DataResponse<DataType> | ErrorResponse<DataType>) & QueryResponseBase<FetchType>
export type DataResponse<T> = {
    data: T,
    errors?: ErrorDetails[]
}
export type ErrorResponse<T> = {
    data?: T,
    errors: ErrorDetails[]
}
export type QueryResponseBase<F extends (...args: any[]) => any = () => any> = {
    extensions: {
        requestId: string,
        queries ?: Record<string, {
            total: number
            facets: {
                [facetName: string]: { [ facetValue: string] : number }[]
            }
        }>,
        responseTime: number
        cursor ?: string
    },
    res: PromiseReturnType<ReturnType<F>>
}
export type ErrorDetails = {
    message: string,
    locations?: {
        line: number,
        column: number
    }[]
}