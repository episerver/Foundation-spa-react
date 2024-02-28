import * as dotenv from 'dotenv'
import * as dotenvExpand from 'dotenv-expand'
import * as path from 'node:path'
import type { GlobalArgs } from '../types/arguments'
import { ApiVersions } from '../types/arguments'

function processEnvFile(suffix: string = "")
{
    const envVars = dotenv.config({
        path: path.resolve(process.cwd(), `.env${ suffix }`)
    });
    dotenvExpand.expand(envVars);
}

const envName = process.env.OPTI_BUILD_ENV ?? process.env.NODE_ENV ?? 'development'
processEnvFile(`.${ envName }.local`)
processEnvFile(`.${ envName }`)
processEnvFile('.local')
processEnvFile();

export function buildEnvironment() : void
{
    //Do nothing here for now
}

export const enum EnvironmentVariables {
    dxp_url = "OPTIMIZELY_DXP_URL",
    dxp_api = "OPTIMIZLEY_DXP_VERSION",
    dxp_client_id = "OPTIMIZELY_DXP_CLIENT_ID",
    dxp_client_key = "OPTIMIZELY_DXP_CLIENT_KEY",
    debug = "OPTIMIZELY_DXP_DEBUG"
}

function asApiVersion(input?: string)
{
    switch (input) {
        case ApiVersions.v2:
        case ApiVersions.v3:
            return input
        default:
            return undefined
    }
}

export function readEnvironment() : Partial<GlobalArgs> 
{
    const dxp_url = process.env[EnvironmentVariables.dxp_url]
    const dxp_api = asApiVersion(process.env[EnvironmentVariables.dxp_api])
    const dxp_client_id = process.env[EnvironmentVariables.dxp_client_id]
    const dxp_client_key = process.env[EnvironmentVariables.dxp_client_key]
    const debug = process.env[EnvironmentVariables.debug] === '1'

    return { dxp_url, dxp_api, dxp_client_id, dxp_client_key, debug }
}

export default buildEnvironment