import fetch from 'cross-fetch';
import { CMS11_AUTH_SERVICE } from './internal';
export class OAuthClient {
    constructor(baseUrl) {
        this.baseUrl = "http://localhost:56052/";
        if (baseUrl)
            this.baseUrl = baseUrl;
        this.serviceUrl = new URL(CMS11_AUTH_SERVICE, baseUrl);
    }
    async login(username, password, clientId = "Default") {
        const loginBody = new URLSearchParams();
        loginBody.set('grant_type', 'password');
        loginBody.set('client_id', clientId);
        loginBody.set('username', username || '');
        loginBody.set('password', password || '');
        const res = await fetch(this.serviceUrl.href, {
            method: 'post',
            body: loginBody,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept": "application/json"
            }
        });
        if (!res.ok)
            return false;
        return await res.json();
    }
    async refresh(refresh_token, clientId = "Default") {
        const loginBody = new URLSearchParams();
        loginBody.set('grant_type', 'refresh_token');
        loginBody.set('client_id', clientId);
        loginBody.set('refresh_token', refresh_token || '');
        const res = await fetch(this.serviceUrl.href, {
            method: 'post',
            body: loginBody,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept": "application/json"
            }
        });
        if (!res.ok)
            return false;
        return await res.json();
    }
}
export default OAuthClient;
//# sourceMappingURL=client.js.map