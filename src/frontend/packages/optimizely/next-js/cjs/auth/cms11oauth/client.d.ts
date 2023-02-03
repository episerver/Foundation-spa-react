import * as Types from './types';
export declare class OAuthClient {
    protected readonly baseUrl: string;
    protected readonly serviceUrl: URL;
    constructor(baseUrl?: string);
    login(username?: string, password?: string, clientId?: string): Promise<Types.ServiceToken | false>;
    refresh(refresh_token?: string, clientId?: string): Promise<Types.ServiceToken | false>;
}
export default OAuthClient;
