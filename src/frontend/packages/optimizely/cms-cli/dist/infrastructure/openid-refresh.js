import { Issuer } from 'openid-client';
const LOCAL_PORT = 64321;
const LOCAL_HOST = "localhost";
export async function refresh(params) {
    const { client_id, client_secret, dxp_url } = params;
    const redirect_uris = [getInternalServerUrl(params).href];
    const dxpIssuer = await Issuer.discover(dxp_url.href);
    const client = new dxpIssuer.Client({
        client_id,
        client_secret,
        redirect_uris,
        response_types: ['code']
    });
    return client.refresh(params.token_set).catch(e => { console.error(e); return false; });
}
function getInternalServerUrl({ local_host, local_port }) {
    const port = local_port && local_port > 1023 && local_port < 65535 ? local_port : LOCAL_PORT;
    const host = local_host ?? LOCAL_HOST;
    return new URL(`http://${host}:${port}/`);
}
