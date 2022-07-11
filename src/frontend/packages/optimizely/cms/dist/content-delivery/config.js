/**
 * Default configuration to use when making requests to the
 * Content Delivery API.
 */
export const DefaultConfig = {
    apiUrl: '/',
    selectAllProperties: true,
    expandAllProperties: false,
    debug: false,
    defaultBranch: 'en'
};
export function validateConfig(config) {
    // No configuration is an invalid configuration
    if (!config)
        return false;
    // The API URL must end in a slash to be valid
    if (config.apiUrl?.substr(-1) !== '/')
        return false;
    // All tests passed
    return true;
}
//# sourceMappingURL=config.js.map