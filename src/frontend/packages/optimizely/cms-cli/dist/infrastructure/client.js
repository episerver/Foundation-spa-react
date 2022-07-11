import fetch from 'node-fetch';
import { authenticate as doAuthenticate } from './openid-login';
import { refresh as doRefresh } from './openid-refresh';
export class Client {
    constructor(config) {
        this.config = config;
        try {
            if (process.env['OPTIMIZELY_DXP_SECRET']) {
                var tokenData = process.env['OPTIMIZELY_DXP_SECRET'];
                if (typeof (tokenData) === 'string') {
                    const tokenBuffer = Buffer.from(tokenData, 'base64');
                    const tokenJsonString = tokenBuffer.toString('utf-8');
                    const token = JSON.parse(tokenJsonString);
                    if (token.access_token) {
                        this._token = token;
                    }
                }
            }
        }
        catch (e) {
            console.warn("Unable to read a configured Optimizely DXP Secret");
        }
    }
    get dxpUrl() {
        if (typeof (this.config.dxp_url) === 'string' && this.config.dxp_url !== "")
            return this.config.dxp_url;
        throw new Error("Unable to determine the Optimizely DXP URL, please check the configuration");
    }
    get isAuthenticated() {
        if (this._token === undefined || this._token === false)
            return false;
        const expires_at = this._token?.expires_at ?? 0;
        const now = Math.floor(Date.now() / 1000);
        return now < expires_at;
    }
    async connect() {
        const resp = await fetch(this.dxpUrl, {
            method: 'get'
        }).catch(e => {
            return {
                ok: false,
                error: e,
                status: 500
            };
        });
        return resp.status >= 200 && resp.status < 500;
    }
    async authenticate(scopes) {
        if (this.isAuthenticated)
            return true;
        const authParams = {
            dxp_url: new URL(this.dxpUrl),
            client_id: this.config.dxp_client_id,
            client_secret: this.config.dxp_client_key,
            scopes
        };
        if (this._token !== undefined && this._token !== false) {
            this._token = await doRefresh({ token_set: this._token, ...authParams });
            if (typeof (this._token) === 'object')
                return true;
        }
        const tokenSet = await doAuthenticate(authParams);
        const tokenBuffer = Buffer.from(JSON.stringify(tokenSet, undefined, 0), 'utf-8');
        process.stdout.write(`Your token, store if you want to reuse it\n\n---\n\n${tokenBuffer.toString('base64')}\n\n---\n\n`);
        this._token = tokenSet;
        return tokenSet === false ? false : true;
    }
    async getAllWebsites() {
        try {
            const serviceUrl = this.getUrl("api/episerver/{version}/site");
            const response = await fetch(serviceUrl.href, {});
            if (!response.ok)
                return { ok: false, error: response, message: `HTTP ${response.status}: ${response.statusText}` };
            const data = (await response.json());
            return {
                ok: true,
                data
            };
        }
        catch (e) {
            return {
                ok: false,
                error: e,
                message: e.message || "An error occurred"
            };
        }
    }
    async getWebsite(id) {
        try {
            const serviceUrl = this.getUrl("api/episerver/{version}/site/{siteId}", { siteId: id });
            const response = await fetch(serviceUrl.href, {});
            if (!response.ok)
                return { ok: false, error: response, message: `HTTP ${response.status}: ${response.statusText}` };
            const data = (await response.json());
            return { ok: true, data };
        }
        catch (e) {
            return {
                ok: false,
                error: e,
                message: e.message || "An error occurred"
            };
        }
    }
    async getContentTypes(includeSystemTypes) {
        try {
            const serviceUrl = this.getUrl("/api/episerver/{version}/contenttypes", { includeSystemTypes: includeSystemTypes ? "true" : "false" });
            const requestConfig = {};
            if (this._token && this._token.access_token && this._token.token_type === "Bearer") {
                requestConfig.headers = {
                    'Authorization': `Bearer ${this._token.access_token}`
                };
            }
            const response = await fetch(serviceUrl.href, requestConfig);
            if (!response.ok)
                return { ok: false, error: response, message: `HTTP ${response.status}: ${response.statusText}` };
            const data = (await response.json());
            return { ok: true, data };
        }
        catch (e) {
            return {
                ok: false,
                error: e,
                message: e.message || "An error occurred"
            };
        }
    }
    getUrl(endpoint, urlParams) {
        const url = new URL(endpoint, this.dxpUrl);
        url.pathname = url.pathname.replace(encodeURIComponent("{version}"), this.config.dxp_api ?? "v3.0");
        if (urlParams)
            for (const param in urlParams) {
                const pk = encodeURIComponent(`{${param}}`);
                const newPath = url.pathname.replace(pk, urlParams[param]);
                if (newPath === url.pathname)
                    url.searchParams.set(param, urlParams[param]);
                else
                    url.pathname = newPath;
            }
        return url;
    }
}
export default Client;
