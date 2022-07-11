"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.setup = exports.Types = void 0;
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./client"), exports);
exports.Types = tslib_1.__importStar(require("./types"));
const client_1 = tslib_1.__importStar(require("./client"));
const myConfig = {
    domain: process.env.OPTIMIZELY_GQL_DOMAIN || 'https://optimizely.gq',
    token: process.env.OPTIMIZELY_GQL_TOKEN,
    debug: ((_a = process.env.OPTIMIZELY_GQL_DEBUG) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'true' || process.env.OPTIMIZELY_GQL_DEBUG === '1',
    throwOnError: ((_b = process.env.OPTIMIZELY_GQL_TRHOW_ON_ERROR) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === 'true' || process.env.OPTIMIZELY_GQL_TRHOW_ON_ERROR === '1'
};
const setup = (config) => {
    const specificConfig = Object.assign(Object.assign({}, myConfig), config);
    if (!(0, client_1.validateConfig)(specificConfig))
        throw new Error("Error while validating configuration");
    return new client_1.default(specificConfig);
};
exports.setup = setup;
//# sourceMappingURL=index.js.map