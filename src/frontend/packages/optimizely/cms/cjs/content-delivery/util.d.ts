export declare const enum OptiEndpoints {
    'Content' = "api/episerver/v{ $version }/content/{ $contentId }",
    'Children' = "api/episerver/v{ $version }/content/{ $contentId }/children",
    'Ancestors' = "api/episerver/v{ $version }/content/{ $contentId }/ancestors",
    'Site' = "api/episerver/v{ $version }/site/{ $siteId }",
    'Search' = "api/episerver/v{ $version }/search/content/",
    'OAuth' = "api/episerver/auth/token"
}
export declare const enum OptiQueryParams {
    'EditMode' = "epieditmode",
    'Project' = "epiprojects",
    'Channel' = "epichannel",
    'VisitorGroup' = "visitorgroupsByID",
    'CommonDrafts' = "commondrafts"
}
export declare const enum OptiContentMode {
    'Delivery' = "content",
    'Edit' = "contentmanagement"
}
export declare type Dictionary = {
    [key: string]: string;
};
export declare type BuildUrlVars = {
    contentMode?: OptiContentMode;
    version?: string;
} & Dictionary;
export declare const DEFAULT_VERSION = "3.0";
export declare function getEndpoint(endpoint: OptiEndpoints, version?: string): string;
export declare class UrlBuilderException extends Error {
    readonly sourceError: any;
    readonly endpoint: string;
    readonly service: URL | string;
    readonly path: string | undefined;
    constructor(endpoint: string, service: URL | string, path?: string, sourceError?: any);
}
export declare function buildUrl(baseUrl: URL | string, endpoint: string, variables: BuildUrlVars, version?: string): URL;
export declare function isOnLine(): boolean;
export declare function inEpiserverShell(): boolean;
export declare function inEditMode(defaultValue?: boolean): boolean;
