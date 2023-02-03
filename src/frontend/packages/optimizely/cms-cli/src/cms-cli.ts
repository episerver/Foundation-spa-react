// Start by preparing execution environment
import * as Env from './infrastructure/environment'
Env.buildEnvironment()

// Then continue with the regular application
import type { GlobalArgs } from './types/arguments'
import type  { CommandModule } from 'yargs'
import { ApiVersions } from './types/arguments'
import commandImports from './infrastructure/commands'
import yargs from 'yargs'

// Read the defaults from the environment
const defaults = Env.readEnvironment()
defaults.dxp_api = defaults.dxp_api ?? ApiVersions.v3

// Load the commands and start the application
Promise
    .all(commandImports)
    .then(startCli)
    .catch(cliError);

// CLI Application function
function startCli(commands: CommandModule<GlobalArgs,GlobalArgs>[] ) {
    // Create CLI Application
    
    const args = yargs(process.argv)
        .scriptName("cms-cli")
        .usage('$0 <cmd> [args]')
        .option("debug", { alias: "d", description: "Enable debug mode", boolean: true, type: "boolean", default: defaults.debug })
        .option("dxp_url", { alias: "du", description: "The URL of Optimizely DXP", string: true, type: "string", demandOption: defaults.dxp_url === undefined, default: defaults.dxp_url })
        .option("dxp_api", { alias: "da", description: "The API Version of Optimizely DXP", string: true, type: "string", options: [ ApiVersions.v2, ApiVersions.v3 ], demandOption: defaults.dxp_api === undefined, default: defaults.dxp_api})
        .option("dxp_client_id", { alias: "dci", description: "The Client ID for Optimizely DXP", string: true, type: "string", demandOption: defaults.dxp_client_id === undefined, default: defaults.dxp_client_id })
        .option("dxp_client_key", { alias: "dck", description: "The Client Key for Optimizely DXP", string: true, type: "string", demandOption: defaults.dxp_client_key === undefined, default: defaults.dxp_client_key })
        .epilogue("Optimizely Content Cloud 12+ - Node.JS CLI Client\n(C)2022 Remko Jantzen\n\n")
        .demandCommand(1, 1, 'You must specify the command to execute', 'You may only execute one command at a time')
        .help()
    
    // Add all commands from the commands folder
    type inferredCommandType = Parameters<typeof args.command>[0]
    commands.forEach(command => args.command(command as inferredCommandType))

    // Run CLI Application
    return args.parse(process.argv.slice(2))
}

// CLI Error function
function cliError(e: any)
{
    console.log("Unhandled error while processing the application", e)
}