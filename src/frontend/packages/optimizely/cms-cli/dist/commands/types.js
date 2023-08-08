import ApiClient from '../infrastructure/client';
import chalk from 'chalk';
import path from 'node:path';
import fs from 'node:fs';
const defaults = {
    schema: process.env['SCHEMA_FILE'] ?? "schema.json",
    types: process.env['TYPES_FILE'] ?? "schema.d.ts",
    scope: process.env['OPTIMIZELY_DXP_CONTENTDEFINITION_API_SCOPE'] ?? "epi_content_definitions",
    with_types: false
};
const isDevelopment = process.env['NODE_ENV'] === 'development';
const optionsGroup = "Type definition options:";
export const command = "types [action]";
export const aliases = ['t'];
export const builder = (yargs) => {
    yargs
        .positional('action', {
        type: 'string',
        describe: 'The type definitions action to execute',
        choices: ["export", "list", "import"],
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
        .help();
    return yargs;
};
export const deprecated = false;
export const describe = `Create and maintain content type definition files that are synchronized with the Optimizely Content Cloud.`;
export const handler = async (args) => {
    const api = new ApiClient(args);
    const connected = await api.connect();
    if (!connected) {
        process.stderr.write(`${chalk.red("ERROR:")} Unable to connect to Optimizely Content Cloud\n`);
        return;
    }
    const authenticated = await api.authenticate([args.scope ?? '']);
    if (!authenticated) {
        process.stderr.write(`${chalk.red("ERROR:")} Unable to authenticate against Optimizely Content Cloud\n`);
        return;
    }
    const schema = await api.getContentTypes(false);
    if (schema.ok) {
        const schemaFile = args.schema ?? defaults.schema;
        const typesFile = args.types ?? defaults.types;
        writeSchema(schema.data, schemaFile);
        if (args.with_types)
            writeTypes(schema.data, typesFile);
    }
    else {
        process.stderr.write(`${chalk.red("ERROR:")} Unable to retrieve schema: ${schema.message}\n`);
    }
};
function writeSchema(data, schemaFile) {
    const cwd = process.cwd();
    const fullOutputFile = path.resolve(cwd, schemaFile);
    data.sort((a, b) => (a.name > b.name) ? 1 : ((a.name < b.name) ? -1 : 0));
    fs.writeFileSync(fullOutputFile, JSON.stringify(data, undefined, 4));
    process.stderr.write(`${chalk.greenBright("SUCCESS:")} Written schema data to ${fullOutputFile}\n`);
}
function writeTypes(data, typesFile) {
    const cwd = process.cwd();
    const fullOutputFile = path.resolve(cwd, typesFile);
    fs.writeFileSync(fullOutputFile, `/**
 * This is an automatically generated schema file based upon the Content Types
 * within the referenced Optimizely Content Cloud instance.
 * 
 * DO NOT MODIFY MANUALLY - THE FILE WILL BE OVERWRITTEN
 **/
import type { IContent, ${BuiltInProps.join(', ')} } from '@optimizely/cms/models'
\n\n`);
    data
        .sort((a, b) => (a.name > b.name) ? 1 : ((a.name < b.name) ? -1 : 0))
        .forEach(ct => {
        let properties = (ct.properties ?? []).map(prop => {
            return `    /**
     * ${prop.editSettings?.displayName ?? prop.name}
     * ${prop.editSettings?.description ?? prop.editSettings?.helpText ?? ''}
     * 
     * @translatable    ${prop.branchSpecific ?? 'false'}
     */
    ${processPropertyName(prop.name)}: ${getTypeScriptDataType(prop)}`;
        }).join("\n\n");
        let type = `/**
 * ${ct.editSettings?.displayName ?? ct.name}
 * ${ct.editSettings?.description ?? ''}
 *
 * @ContentBase ${ct.baseType ?? ''}
 * @ContentGuid ${ct.id}
 */
export type ${ct.name} = IContent & {
${properties}
}\n\n`;
        fs.appendFileSync(fullOutputFile, type);
    });
    process.stderr.write(`${chalk.greenBright("SUCCESS:")} Written TypeScript definitions to ${fullOutputFile}\n`);
}
function getTypeScriptDataType(prop) {
    switch (prop.dataType) {
        case "PropertyBlock":
            return `PropertyBlock<${prop.itemType ?? "IContent"}>`;
        default:
            return prop.dataType;
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
    'PropertyBlock'
];
function processPropertyName(propName) {
    return propName.substring(0, 1).toLowerCase() + propName.substring(1);
}
