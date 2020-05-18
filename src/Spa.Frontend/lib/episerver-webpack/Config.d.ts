export default class GlobalConfig {
    constructor(rootDir: string);
    getServerPath(localEnvironment: object = {}, defaultValue: string = 'server') : string
    getSpaPath(localEnvironment: object = {}, defaultValue: string = 'Spa') : string
    getEpiPath(localEnvironment: object = {}, defaultValue: string = '../Foundation') : string
    getWebPath(localEnvironment: object = {}, defaultValue: string = '/') : string
    getLibPath(localEnvironment: object = {}, defaultValue: string = 'lib') : string
    getSourcePath(localEnvironment: object = {}, defaultValue: string = 'src') : string
    getExpressPath(localEnvironment: object = {}, defaultValue: string = 'express') : string
    getEpiserverFormsDir(localEnvironment: object = {}, defaultValue: string = '../Foundation/Scripts/EPiServer.ContentApi.Forms') : string
    getNodeEnv(localEnvironment: object = {}, defaultValue: string = 'development') : string
    isEpiserverFormsEnabled(localEnvironment: object = {}, defaultValue: string = 'false') : string
    getResolveConfig(envOverrides: object = undefined) : object
    getDefineConfig(envOverrides: object = {}) : object
    getEnvVariable(key : string, defaultValue : string = null, overrides : object = undefined) : string
}