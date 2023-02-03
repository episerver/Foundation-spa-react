import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
import * as path from 'path';
function processEnvFile(suffix = "") {
    const envVars = dotenv.config({
        path: path.resolve(process.cwd(), `.env${suffix}`)
    });
    dotenvExpand.expand(envVars);
}
const envName = process.env.OPTI_BUILD_ENV ?? process.env.NODE_ENV ?? 'development';
processEnvFile(`.${envName}.local`);
processEnvFile(`.${envName}`);
processEnvFile('.local');
processEnvFile();
export function buildEnvironment() {
}
function asApiVersion(input) {
    switch (input) {
        case "v2.0":
        case "v3.0":
            return input;
        default:
            return undefined;
    }
}
export function readEnvironment() {
    const dxp_url = process.env["OPTIMIZELY_DXP_URL"];
    const dxp_api = asApiVersion(process.env["OPTIMIZLEY_DXP_VERSION"]);
    const dxp_client_id = process.env["OPTIMIZELY_DXP_CLIENT_ID"];
    const dxp_client_key = process.env["OPTIMIZELY_DXP_CLIENT_KEY"];
    const debug = process.env["OPTIMIZELY_DXP_DEBUG"] === '1';
    return { dxp_url, dxp_api, dxp_client_id, dxp_client_key, debug };
}
export default buildEnvironment;
