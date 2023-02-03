import { Issuer,  generators, custom } from 'openid-client'
import type { BaseClient, TokenSet } from 'openid-client'
import open from 'open'
import type { RequestListener, Server } from 'node:http'
import http from 'node:http'

const LOCAL_PORT = 64321
const LOCAL_HOST = "localhost"

export type AuthenticateParams = {
    dxp_url: URL,
    client_id: string,
    client_secret: string,
    scopes: string[],
    local_port?: number,
    local_host?: string
}

type AuthenticationContext = { code_verifier: string, login_url: string, client: BaseClient }

export async function authenticate(params: AuthenticateParams) : Promise<TokenSet | false>
{
    console.log("Starting new interactive authentication flow")
    try {
        const context = await prepareAuthentication(params)
        return interactive(params, context)
    } catch (e) {
        console.error("Unanticipated error while authenticating", e)
        return false
    }
}

function interactive(params: AuthenticateParams, context: AuthenticationContext) : Promise<TokenSet>
{
    return new Promise((resolve, reject) => {
        const serverURL = getInternalServerUrl(params)

        const handleRequest : RequestListener = (req, res) =>
        {
            // Actively ignore the FavIcon request
            if (req.url === '/favicon.ico') {
                res.writeHead(404)
                res.end()
                return
            }

            // Process actual request
            const params = context.client.callbackParams(req);
            if (params.code) {
                console.log("Received authentication code")
                context.client.callback(serverURL.href, params, { code_verifier: context.code_verifier }).then(tokenSet => {
                    server.close()
                    console.log("Processed authentication")
                    resolve(tokenSet)
                }).catch(reject)
            } else {
                console.error("No code received from OpenID Service")
                reject(new Error("OpenID Protocol error"))
            }

            // Write output to browser
            res.writeHead(200)
            res.write("<html><head><script>window.close()</script></head><body>You may now close this window.</body></html>")
            res.end()
        }

        const server = http.createServer(handleRequest)

        // Start server
        server.listen(Number.parseInt(serverURL.port), serverURL.hostname, () => {
            console.log("Interactive authentication flow ready, awaiting result")
            open(context.login_url)
        })

        // Set timer...
    })
}

async function prepareAuthentication(params: AuthenticateParams) : Promise<AuthenticationContext>
{
    
    const { client_id, client_secret, scopes, dxp_url } = params;
    const redirect_uris = [ getInternalServerUrl(params).href ]

    const dxpIssuer = await Issuer.discover(dxp_url.href)
    const client = new dxpIssuer.Client({
        client_id,
        client_secret,
        redirect_uris,
        response_types: [ 'code' ]
    });

    if (!Array.isArray(dxpIssuer['scopes_supported']) && scopes.every(scope => (dxpIssuer['scopes_supported'] as string[]).includes(scope)))
    {
        throw new Error(`Invalid scope requested, the supported scopes are: ${ (dxpIssuer['scopes_supported'] as string[]).join(', ') }.`)
    }

    if (!scopes.includes('openid'))
        scopes.unshift('openid')

    const code_verifier = generators.codeVerifier();
    const code_challenge = generators.codeChallenge(code_verifier);

    const login_url = client.authorizationUrl({
        scope: scopes.join(' '),
        code_challenge,
        code_challenge_method: 'S256'
    });

    console.log(` - Requested scopes: [${ scopes.join(', ')}]`)

    return { code_verifier, login_url, client }
}

function getInternalServerUrl({ local_host, local_port }: AuthenticateParams) : URL
{
    // Determine port and host to run on
    const port = local_port && local_port > 1023 && local_port < 65535 ? local_port : LOCAL_PORT
    const host = local_host ?? LOCAL_HOST

    return new URL(`http://${host}:${port}/`)
}