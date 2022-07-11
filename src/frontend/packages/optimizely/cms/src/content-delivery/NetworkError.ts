export class NetworkError extends Error
{
    private _response : Response
    public readonly _type : string = "NetworkError"

    /**
     * @deprecated      Do not use this as this will make your code dependant on the Response implementations
     */
    public get response() : Response 
    {
        return this._response
    }

    public get isAuthError() : boolean
    {
        return this._response.status === 401
    }

    public get status() : number
    {
        return this._response.status
    }

    public get statusText() : string
    {
        return this._response.statusText
    }

    public constructor(message: string, response: Response)
    {
        super(message)
        this._response = response
        console.error(message)
    }
}

export function isNetworkError(toTest: any) : toTest is NetworkError
{
    return typeof(toTest) === 'object' && toTest !== null && (toTest as NetworkError)._type === "NetworkError"
}

export function isNetworkAuthError(toTest: any) : toTest is NetworkError
{
    return isNetworkError(toTest) && toTest.isAuthError
}