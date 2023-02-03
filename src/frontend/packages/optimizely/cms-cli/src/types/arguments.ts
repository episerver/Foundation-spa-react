export const enum ApiVersions {
    v2 = "v2.0",
    v3 = "v3.0"
}

export type GlobalArgs = {
    dxp_url: string
    dxp_api: ApiVersions
    dxp_client_id: string
    dxp_client_key: string
    debug: boolean
}