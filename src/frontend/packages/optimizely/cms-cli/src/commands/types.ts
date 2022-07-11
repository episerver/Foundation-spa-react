import type { CommandBuilder, ArgumentsCamelCase } from 'yargs'
import type { GlobalArgs } from '../types/arguments'
import type { RequiredFields } from '../utils'
import type { ContentTypeProperty, ContentTypes } from '../types/contenttype-api'
import ApiClient from '../infrastructure/client'
import chalk from 'chalk'
import Table from 'cli-table3'
import path from 'node:path'
import fs from 'node:fs'

const enum Actions {
    Export = "export",
    Import = "import",
    List = "list"
}

type CommandArgs = GlobalArgs & {
    action ?: Actions,
    schema ?: string,
    types ?: string,
    scope ?: string,
    with_types ?: boolean
}

const defaults : RequiredFields<Omit<CommandArgs, keyof GlobalArgs>, 'schema' | 'scope' | 'types' | 'with_types'> = {
    schema: process.env['SCHEMA_FILE'] ?? "schema.json",
    types: process.env['TYPES_FILE'] ?? "schema.d.ts",
    scope: process.env['OPTIMIZELY_DXP_CONTENTDEFINITION_API_SCOPE'] ?? "epi_content_definitions",
    with_types: false
}

const isDevelopment = process.env['NODE_ENV'] === 'development'
const optionsGroup = "Type definition options:"

/** string (or array of strings) that executes this command when given on the command line, first string may contain positional args */
export const command : ReadonlyArray<string> | string | undefined = "types [action]"

/** array of strings (or a single string) representing aliases of `exports.command`, positional args defined in an alias are ignored */
export const aliases : ReadonlyArray<string> | string | undefined = ['t']

/** object declaring the options the command accepts, or a function accepting and returning a yargs instance */
export const builder : CommandBuilder<GlobalArgs, CommandArgs> | undefined = (yargs) => {
    yargs
        .positional('action', {
            type: 'string',
            describe: 'The type definitions action to execute',
            choices: [ Actions.Export, Actions.List, Actions.Import ],
            demandOption: true,
            group: optionsGroup
        })
        .option("schema", {
            alias: "s",
            type: "string",
            string: true,
            describe: "Optimizely content types file, relative to working dir",
            default: defaults.schema,
            group: optionsGroup
        })
        .option("types", {
            alias: "t",
            type: "string",
            string: true,
            describe: "TypeScript definitions file, relative to working dir",
            default: defaults.types,
            group: optionsGroup
        })
        .option("scope", {
            alias: "c",
            type: "string",
            string: true,
            describe: "The authorization scope to fetch content definition information",
            default: defaults.scope,
            group: optionsGroup
        })
        .option("with_types", {
            alias: "wt",
            type: "boolean",
            boolean: true,
            describe: "Set this flag to output the typescript definitions",
            default: defaults.with_types,
            group: optionsGroup
        })
        .help()
    return yargs;
}

/** boolean (or string) to show deprecation notice */
export const deprecated : boolean | string | undefined = false

/** string used as the description for the command in help text, use `false` for a hidden command */
export const describe : string | false | undefined = `Create and maintain content type definition files that are synchronized with the Optimizely Content Cloud.`

/** a function which will be passed the parsed argv. */
export const handler: (args: ArgumentsCamelCase<CommandArgs>) => void | Promise<void> = async (args) => 
{

    const api = new ApiClient(args)
    const connected = await api.connect()
    if (!connected) {
        process.stderr.write(`${ chalk.red("ERROR:") } Unable to connect to Optimizely Content Cloud\n`)
        return
    }
    const authenticated = await api.authenticate([args.scope ?? ''])
    if (!authenticated) {
        process.stderr.write(`${ chalk.red("ERROR:") } Unable to authenticate against Optimizely Content Cloud\n`)
        return
    }
    
    const schema = await api.getContentTypes(false)

    if (schema.ok) {
        const schemaFile = args.schema ?? defaults.schema
        const typesFile = args.types ?? defaults.types
        writeSchema(schema.data, schemaFile)
        if (args.with_types)
            writeTypes(schema.data, typesFile)
    } else {
        process.stderr.write(`${ chalk.red("ERROR:") } Unable to retrieve schema: ${ schema.message }\n`)
    }
}

function writeSchema(data: ContentTypes, schemaFile: string)
{
    const cwd = process.cwd();
    const fullOutputFile = path.resolve(cwd, schemaFile)
    fs.writeFileSync(fullOutputFile, JSON.stringify(data, undefined, 4))
    process.stderr.write(`${ chalk.greenBright("SUCCESS:") } Written schema data to ${ fullOutputFile }\n`)
}

function writeTypes(data: ContentTypes, typesFile: string)
{
    const cwd = process.cwd();
    const fullOutputFile = path.resolve(cwd, typesFile)

    fs.writeFileSync(fullOutputFile, `/**
 * This is an automatically generated schema file based upon the Content Types
 * within the referenced Optimizely Content Cloud instance.
 * 
 * DO NOT MODIFY MANUALLY - THE FILE WILL BE OVERWRITTEN
 **/
import type { IContent, ${ BuiltInProps.join(', ') } } from '@optimizely/cms/models'
\n\n`)

    data.forEach(ct => {
        let properties = (ct.properties ?? []).map(prop => {
            return `    /**
     * ${ prop.editSettings?.displayName ?? prop.name }
     * ${ prop.editSettings?.description ?? prop.editSettings?.helpText ?? '' }
     * 
     * @translatable    ${ prop.branchSpecific ?? 'false'}
     */
    ${ processPropertyName(prop.name) }: ${ getTypeScriptDataType(prop) }`
        }).join("\n\n")

        let type = `/**
 * ${ ct.editSettings?.displayName ?? ct.name }
 * ${ ct.editSettings?.description ?? '' }
 *
 * @ContentBase ${ ct.baseType ?? '' }
 * @ContentGuid ${ ct.id }
 */
export type ${ ct.name } = IContent & {
${ properties }
}\n\n`
        fs.appendFileSync(fullOutputFile, type)
    })

    process.stderr.write(`${ chalk.greenBright("SUCCESS:") } Written TypeScript definitions to ${ fullOutputFile }\n`)
}

function getTypeScriptDataType(prop: ContentTypeProperty) : string
{
    switch (prop.dataType)
    {
        case "PropertyBlock":
            return `PropertyBlock<${ prop.itemType ?? "IContent" }>`
        default:
            return prop.dataType
    }
}

const BuiltInProps = [
'PropertyLongString',
'PropertyBoolean',
'PropertyContentReferenceList',
'PropertyXhtmlString',
'PropertyFloatNumber',
'PropertyNumber',
'PropertyInt',
'PropertyContentReference',
'PropertyPageReference',
'PropertyContentArea',
'PropertyLink',
'PropertyLinkCollection',
'PropertyBlock']

function processPropertyName(propName: string)
{
    return propName.substring(0,1).toLowerCase() + propName.substring(1)
}