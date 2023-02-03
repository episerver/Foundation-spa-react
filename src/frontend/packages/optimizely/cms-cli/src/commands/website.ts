import type { CommandBuilder, ArgumentsCamelCase } from 'yargs'
import type { GlobalArgs } from '../types/arguments'
import type { RequiredFields } from '../utils'
import ApiClient from '../infrastructure/client'
import chalk from 'chalk'
import Table from 'cli-table3'
import path from 'node:path'
import fs from 'node:fs'

const enum Actions {
    Export = "export",
    List = "list"
}

type CommandArgs = GlobalArgs & {
    action ?: Actions,
    output ?: string,
    dxp_site_id ?: string
}

const defaults : RequiredFields<Omit<CommandArgs, keyof GlobalArgs>, 'output'> = {
    output: process.env['WEBSITE_FILE'] ?? "website.cjs",
    dxp_site_id: process.env["OPTIMIZELY_DXP_SITE_ID"]
}

const isDevelopment = process.env['NODE_ENV'] === 'development'

/** string (or array of strings) that executes this command when given on the command line, first string may contain positional args */
export const command : ReadonlyArray<string> | string | undefined = "website [action]"

/** array of strings (or a single string) representing aliases of `exports.command`, positional args defined in an alias are ignored */
export const aliases : ReadonlyArray<string> | string | undefined = ['w']

/** object declaring the options the command accepts, or a function accepting and returning a yargs instance */
export const builder : CommandBuilder<GlobalArgs, CommandArgs> | undefined = (yargs) => {
    yargs
        .positional('action', {
            type: 'string',
            describe: 'The website action to execute',
            choices: [ Actions.Export, Actions.List ],
            demandOption: true,
            group: "Website options:"
        })
        .option('dxp_site_id', {
            alias: 'ds',
            type: 'string',
            describe: 'The website identifier',
            string: true,
            default: defaults.dxp_site_id,
            group: "Website options:"
        })
        .option("output", {
            alias: "o",
            type: "string",
            string: true,
            describe: "The file to write the output to, relative to working dir",
            default: defaults.output,
            group: "Website options:"
        })
        .help()
    return yargs;
}

/** boolean (or string) to show deprecation notice */
export const deprecated : boolean | string | undefined = false

/** string used as the description for the command in help text, use `false` for a hidden command */
export const describe : string | false | undefined = `Create and maintain website definition files based upon the website configuration within Optimizely Content Cloud.`

/** a function which will be passed the parsed argv. */
export const handler: (args: ArgumentsCamelCase<CommandArgs>) => void | Promise<void> = async (args) => 
{
    const api = new ApiClient(args)
    const connected = await api.connect()
    if (!connected) {
        process.stderr.write(`${ chalk.red("ERROR:") } Unable to connect to Optimizely Content Cloud\n`)
        return
    }
    switch (args?.action) {
        case Actions.List:
            return listAction(args, api)
        case Actions.Export:
            return exportAction(args, api)
        default:
            process.stderr.write(`${ chalk.red("ERROR:") } Unsupported website action provided\n`)
            break
    }
    
}

async function exportAction(args: ArgumentsCamelCase<CommandArgs>, api: ApiClient) : Promise<void>
{
    const cwd = process.cwd();
    const fullOutputFile = path.resolve(cwd, args.output ?? defaults.output)

    const siteId = args.dxp_site_id
    if (!siteId) {
        process.stderr.write(`${ chalk.red("ERROR:") } The Website identifier is mandatory to create an export\n`)
        return
    }

    const site = await api.getWebsite(siteId)
    if (!site.ok) {
        process.stderr.write(`${ chalk.red("ERROR:") } Unable to load the website - ${ site.message }\n`)
        return
    }

    const siteInfo = {
        name: site.data.name,
        id: site.data.id,
        startPage: site.data.contentRoots?.startPage?.guidValue,
        startPageUrl: site.data.contentRoots?.startPage?.url,
        locales: (site.data.languages ?? []).map(x => x.name),
        defaultLocale: (site.data.languages ?? []).filter(x => x.isMasterLanguage === true).map(x => x.name)[0] ?? (site.data.languages ?? []).slice(0,1).map(x => x.name)[0],
        labels: (site.data.languages ?? []).map(x => { return { code: x.name, label: x.displayName }}),
        primaryDomain: (site.data.hosts ?? []).filter(x => x.type === "Primary").map(x => `http${isDevelopment ? '' : 's'}://${ x.name }`)[0] ?? "",
        domains: (site.data.hosts ?? []).filter(x => x.type !== "Edit").map(x => `http${isDevelopment ? '' : 's'}://${ x.name }`),
        localeDomains: (site.data.hosts ?? []).filter(x => x.type !== "Edit" && x.language?.name ).map(x => { return { domain: `http${isDevelopment ? '' : 's'}://${ x.name }`, defaultLocale: x.language?.name }})
    }
    
    
    const siteInfoString = JSON.stringify(siteInfo, null, 4)
    const fileContents = `// Auto generated file - do not change manually!\n\nconst siteInfo = ${ siteInfoString };\n\nmodule.exports = siteInfo;`

    return new Promise<void>((resolve, reject) => {
        fs.writeFile(fullOutputFile, fileContents, { encoding: 'utf-8' }, () => {
            process.stdout.write(`${ chalk.green("SUCCESS:") } Written site configuration to ${ fullOutputFile }`)
            resolve()
        })
    })
}

async function listAction(args: ArgumentsCamelCase<CommandArgs>, api: ApiClient) : Promise<void>
{
    const sites = await api.getAllWebsites()
    if (sites.ok) {
        const wsTable = new Table({
            head: ['ID', 'Name', 'Languages', 'Domains' ]
            , colWidths: [ 40, 40, 40, 40 ]
        })
        for (const site of sites.data ?? []) {
            wsTable.push([ 
                site.id, 
                site.name, 
                site.languages.map(x => `${ x.displayName } [${ x.name }]`).join('\n '),
                (site.hosts ?? []).map( x => `${ x.type === 'Primary' ? '[P]' : x.type === 'Edit' ? '[E]' : '[ ]'} ${x.name}` ).join("\n")
            ])
        }
        process.stdout.write(wsTable.toString())
        process.stdout.write("\n")
    } else {
        process.stderr.write(`${ chalk.red("ERROR:") } Unable to retrieve sites. ${ args.debug ? sites.message : ""}\n`)
        if (args.debug) {
            console.log(sites.error)
        }
    }
}