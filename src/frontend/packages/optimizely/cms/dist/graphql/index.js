export * from './client';
export * as Types from './types';
import Client, { validateConfig } from './client';
const myConfig = {
    domain: process.env.OPTIMIZELY_GQL_DOMAIN || 'https://optimizely.gq',
    token: process.env.OPTIMIZELY_GQL_TOKEN,
    debug: process.env.OPTIMIZELY_GQL_DEBUG?.toLowerCase() === 'true' || process.env.OPTIMIZELY_GQL_DEBUG === '1',
    throwOnError: process.env.OPTIMIZELY_GQL_TRHOW_ON_ERROR?.toLowerCase() === 'true' || process.env.OPTIMIZELY_GQL_TRHOW_ON_ERROR === '1'
};
export const setup = (config) => {
    const specificConfig = { ...myConfig, ...config };
    if (!validateConfig(specificConfig))
        throw new Error("Error while validating configuration");
    return new Client(specificConfig);
};
//# sourceMappingURL=index.js.map