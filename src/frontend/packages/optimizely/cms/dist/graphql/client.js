import fetch from 'cross-fetch';
const GRAPHQL_SERVICE_PATH = '/content/v2';
const defaultConfiguration = {
    debug: false,
    throwOnError: true
};
export function validateConfig(config) {
    if (!(typeof (config) === 'object' && config !== null))
        return false;
    if (typeof (config.domain) === 'string' && typeof (config.token) === 'string' && config.domain.length > 0 && config.token.length > 0)
        return true;
    return false;
}
export class Client {
    get debug() { return this.config.debug; }
    get throwOnError() { return this.config.throwOnError; }
    get endpoint() {
        const apiUrl = new URL(GRAPHQL_SERVICE_PATH, this.config.domain);
        apiUrl.searchParams.set('auth', this.config.token);
        return apiUrl;
    }
    constructor(config) {
        this.config = { ...defaultConfiguration, ...config };
        globalThis.OptiGQL = this;
    }
    async query(query, variables, requestInit) {
        const gqlEndpoint = this.endpoint;
        const gqlQuery = { query, variables };
        if (this.debug)
            this.log(`Optimizely GQL: ${gqlEndpoint}`, gqlQuery.query, gqlQuery.variables);
        const response = await fetch(gqlEndpoint.href, {
            ...requestInit,
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json',
                ...requestInit?.headers,
            },
            body: JSON.stringify(gqlQuery)
        });
        const responseData = await response.json();
        if (this.throwOnError && responseData.errors) {
            const errorMessage = "GraphQL Service Error: " + responseData.errors.map(x => x.message).join('; ');
            this.logError(errorMessage, responseData.errors);
            throw new Error(errorMessage);
        }
        if (responseData.data)
            return { data: responseData.data, extensions: responseData.extensions, errors: responseData.errors, res: response };
        if (responseData.errors)
            return { errors: responseData.errors, extensions: responseData.extensions, res: response };
        return { errors: [{ message: "No data returned" }], extensions: { requestId: 'n/a', responseTime: -1 }, res: response };
    }
    log(...args) {
        console.log(...args);
    }
    logError(...args) {
        console.error(...args);
    }
}
export default Client;
//# sourceMappingURL=client.js.map