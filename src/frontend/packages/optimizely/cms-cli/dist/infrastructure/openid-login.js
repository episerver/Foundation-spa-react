import { Issuer, generators } from 'openid-client';
import open from 'open';
import http from 'node:http';
const LOCAL_PORT = 64321;
const LOCAL_HOST = "localhost";
export async function authenticate(params) {
    console.log("Starting new interactive authentication flow");
    try {
        const context = await prepareAuthentication(params);
        return interactive(params, context);
    }
    catch (e) {
        console.error("Unanticipated error while authenticating", e);
        return false;
    }
}
function interactive(params, context) {
    return new Promise((resolve, reject) => {
        const serverURL = getInternalServerUrl(params);
        const handleRequest = (req, res) => {
            if (req.url === '/favicon.ico') {
                res.writeHead(404);
                res.end();
                return;
            }
            res.writeHead(200);
            res.write("<html><head><script>window.close()</script></head><body>You may now close this window.</body></html>");
            res.end();
            const params = context.client.callbackParams(req);
            if (params.code) {
                context.client.callback(serverURL.href, params, { code_verifier: context.code_verifier }).then(tokenSet => {
                    server.close(error => {
                        if (error) {
                            console.error("Error whilest finishing interactive authentication flow", error);
                            reject(error);
                        }
                        else {
                            console.log("Received & processed authentication");
                            resolve(tokenSet);
                        }
                    });
                }).catch(reject);
            }
            else {
                console.error("No code received from OpenID Service");
                reject(new Error("OpenID Protocol error"));
            }
        };
        const server = http.createServer(handleRequest);
        server.listen(Number.parseInt(serverURL.port), serverURL.hostname, () => {
            console.log("Interactive authentication flow ready, awaiting result");
            open(context.login_url);
        });
    });
}
async function prepareAuthentication(params) {
    const { client_id, client_secret, scopes, dxp_url } = params;
    const redirect_uris = [getInternalServerUrl(params).href];
    const dxpIssuer = await Issuer.discover(dxp_url.href);
    const client = new dxpIssuer.Client({
        client_id,
        client_secret,
        redirect_uris,
        response_types: ['code']
    });
    if (!Array.isArray(dxpIssuer['scopes_supported']) && scopes.every(scope => dxpIssuer['scopes_supported'].includes(scope))) {
        throw new Error(`Invalid scope requested, the supported scopes are: ${dxpIssuer['scopes_supported'].join(', ')}.`);
    }
    if (!scopes.includes('openid'))
        scopes.unshift('openid');
    const code_verifier = generators.codeVerifier();
    const code_challenge = generators.codeChallenge(code_verifier);
    const login_url = client.authorizationUrl({
        scope: scopes.join(' '),
        code_challenge,
        code_challenge_method: 'S256'
    });
    console.log(` - Requested scopes: [${scopes.join(', ')}]`);
    return { code_verifier, login_url, client };
}
function getInternalServerUrl({ local_host, local_port }) {
    const port = local_port && local_port > 1023 && local_port < 65535 ? local_port : LOCAL_PORT;
    const host = local_host ?? LOCAL_HOST;
    return new URL(`http://${host}:${port}/`);
}
