"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = exports.validateConfig = void 0;
const tslib_1 = require("tslib");
const cross_fetch_1 = tslib_1.__importDefault(require("cross-fetch"));
const GRAPHQL_SERVICE_PATH = '/content/v2';
const defaultConfiguration = {
    debug: false,
    throwOnError: true
};
function validateConfig(config) {
    if (!(typeof (config) === 'object' && config !== null))
        return false;
    if (typeof (config.domain) === 'string' && typeof (config.token) === 'string' && config.domain.length > 0 && config.token.length > 0)
        return true;
    return false;
}
exports.validateConfig = validateConfig;
class Client {
    get debug() { return this.config.debug; }
    get throwOnError() { return this.config.throwOnError; }
    get endpoint() {
        const apiUrl = new URL(GRAPHQL_SERVICE_PATH, this.config.domain);
        apiUrl.searchParams.set('auth', this.config.token);
        return apiUrl;
    }
    constructor(config) {
        this.config = Object.assign(Object.assign({}, defaultConfiguration), config);
        globalThis.OptiGQL = this;
    }
    query(query, variables, requestInit) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const gqlEndpoint = this.endpoint;
            const gqlQuery = { query, variables };
            if (this.debug)
                this.log(`Optimizely GQL: ${gqlEndpoint}`, gqlQuery.query, gqlQuery.variables);
            const response = yield (0, cross_fetch_1.default)(gqlEndpoint.href, Object.assign(Object.assign({}, requestInit), { method: 'POST', headers: Object.assign({ "Content-Type": 'application/json', "Accept": 'application/json' }, requestInit === null || requestInit === void 0 ? void 0 : requestInit.headers), body: JSON.stringify(gqlQuery) }));
            const responseData = yield response.json();
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
        });
    }
    log(...args) {
        console.log(...args);
    }
    logError(...args) {
        console.error(...args);
    }
}
exports.Client = Client;
exports.default = Client;
//# sourceMappingURL=client.js.map