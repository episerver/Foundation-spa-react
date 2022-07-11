export * from './types';
export * from './default-loader';
import { DefaultComponentLoader } from './default-loader';
const defaultConfig = {
    loaderType: DefaultComponentLoader
};
function validateConfig(toValidate) {
    return typeof (toValidate) === 'object' && toValidate !== null;
}
export function setup(config) {
    const fullConfig = { ...defaultConfig, ...config };
    if (!validateConfig(fullConfig))
        throw new Error('Invalid component loader configuration');
    const CLoader = fullConfig.loaderType ?? DefaultComponentLoader;
    return new CLoader();
}
//# sourceMappingURL=index.js.map