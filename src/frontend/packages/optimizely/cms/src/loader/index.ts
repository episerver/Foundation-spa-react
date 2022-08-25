export * from './types'
export * from './default-loader'

import type { ComponentLoader, ComponentLoaderStatic } from './types'
import { DefaultComponentLoader } from './default-loader'

export type CreateComponentLoaderConfig = {
    loaderType ?: ComponentLoaderStatic,
    args: any[]
}

const defaultConfig : Partial<CreateComponentLoaderConfig> = {
    loaderType: DefaultComponentLoader,
    args: []
}

function validateConfig(toValidate : any) : toValidate is CreateComponentLoaderConfig
{
    return typeof(toValidate) === 'object' && toValidate !== null && Array.isArray((toValidate as CreateComponentLoaderConfig).args)
}

export function setup( config ?: Partial<CreateComponentLoaderConfig>) : ComponentLoader
{
    const fullConfig = { ...defaultConfig, ...config }
    if (!validateConfig(fullConfig))
        throw new Error('Invalid component loader configuration')
    const CLoader : ComponentLoaderStatic = fullConfig.loaderType ?? DefaultComponentLoader
    return new CLoader(...fullConfig.args)
}