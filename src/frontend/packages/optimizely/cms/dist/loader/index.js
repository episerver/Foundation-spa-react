export * from './types';
export * from './default-loader';
import { DefaultComponentLoader } from './default-loader';
const defaultConfig = {
    loaderType: DefaultComponentLoader,
    args: []
};
function validateConfig(toValidate) {
    return typeof (toValidate) === 'object' && toValidate !== null && Array.isArray(toValidate.args);
}
export function setup(config) {
    const fullConfig = { ...defaultConfig, ...config };
    if (!validateConfig(fullConfig))
        throw new Error('Invalid component loader configuration');
    const CLoader = fullConfig.loaderType ?? DefaultComponentLoader;
    return new CLoader(...fullConfig.args);
}
//# sourceMappingURL=index.js.map