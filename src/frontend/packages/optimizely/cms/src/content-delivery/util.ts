export const enum OptiEndpoints
{
    //'Content'    = 'api/episerver/v{ $version }/{ $contentMode }/{ $contentId }', // ContentManagement restricts to CommonDraft only....
    'Content'    = 'api/episerver/v{ $version }/content/{ $contentId }',
    'Children'   = 'api/episerver/v{ $version }/content/{ $contentId }/children',
    'Ancestors'  = 'api/episerver/v{ $version }/content/{ $contentId }/ancestors',
    'Site'       = 'api/episerver/v{ $version }/site/{ $siteId }',
    'Search'     = 'api/episerver/v{ $version }/search/content/',
    'OAuth'      = 'api/episerver/auth/token'
}

export const enum OptiQueryParams
{
    'EditMode'      = 'epieditmode',
    'Project'       = 'epiprojects',
    'Channel'       = 'epichannel',
    'VisitorGroup'  = 'visitorgroupsByID',
    'CommonDrafts'  = 'commondrafts'
}

export const enum OptiContentMode
{
    'Delivery' = 'content',
    'Edit' = 'contentmanagement'
}

export type Dictionary = {
    [ key: string ]: string
}

export type BuildUrlVars = {
    contentMode ?: OptiContentMode
    version ?: string
} & Dictionary

export const DEFAULT_VERSION = '3.0';

export function getEndpoint(endpoint: OptiEndpoints, version: string = DEFAULT_VERSION) : string
{
    const vars : Dictionary = { version }
    const path = endpoint.replace(/\{\s*\$([^\s]+?)\s*\}/gi, (fullMatch: string, varName: string, index: number, input: string) => {
        return encodeURIComponent(vars[varName] ?? '');
    });
    return path
}

export class UrlBuilderException extends Error
{
    public readonly sourceError : any;
    public readonly endpoint : string;
    public readonly service : URL | string;
    public readonly path : string | undefined;

    public constructor(endpoint: string, service: URL | string, path ?: string, sourceError ?: any)
    {
        super(`Error building request URL for the ${ endpoint } service`);

        this.endpoint = endpoint
        this.service = service
        this.path = path
        this.sourceError = sourceError
    }
}

export function buildUrl(baseUrl: URL | string, endpoint: string, variables: BuildUrlVars, version: string = DEFAULT_VERSION) : URL
{
    // Ensure we've the version in the variables
    if (!variables['version'])
        variables['version'] = version

    //Make sure we have a valid content mode
    if (!variables['contentMode'] || (variables['contentMode'] !== OptiContentMode.Delivery && variables['contentMode'] !== OptiContentMode.Edit))
    {
        variables['contentMode'] = variables['epieditmode'] === 'True' ? OptiContentMode.Edit : OptiContentMode.Delivery
    }

    // Build the path
    const path = endpoint.replace(/\{\s*\$([^\s]+?)\s*\}/gi, (fullMatch: string, varName: string, index: number, input: string) => {
        const val = variables[varName] ?? undefined
        if (val) {
            delete variables[varName]
            return encodeURIComponent(val)
        }
        return ''
    })

    // Construct actual URL
    let serviceUrl : URL
    try {
        serviceUrl = new URL(path, baseUrl)
        for (const idx in variables) 
            serviceUrl.searchParams.set(idx, variables[idx])
    } catch (e) {
        throw new UrlBuilderException(endpoint, baseUrl, path, e) 
    }
    if (serviceUrl.searchParams.has("contentMode"))
        serviceUrl.searchParams.delete("contentMode")
    return serviceUrl;
}

export function isOnLine() : boolean
{
    try {
        if (navigator && !navigator.onLine) return false;
    } catch (e) { 
        // There's no navigator object with onLine property...
    }
    return true;
}

export function inEpiserverShell() : boolean
{
    try {
        return window !== window?.top && window?.name === 'sitePreview';
    } catch (e) {
        // Ignored on purpose
    }
    return false;
}

export function inEditMode(defaultValue: boolean = false) : boolean
{
    try {
        const url = new URL(window.location.href);
        if (url.searchParams.has(OptiQueryParams.EditMode) && url.searchParams.get(OptiQueryParams.EditMode)?.toLowerCase() == 'true')
            return true;

        return (window as any)?.epi?.inEditMode === true
    } catch (e) {}
    return defaultValue
}