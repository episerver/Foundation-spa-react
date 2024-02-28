#!/usr/bin/env node

import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
import * as path from 'node:path';
import path__default from 'node:path';
import fetch from 'node-fetch';
import { Issuer, generators } from 'openid-client';
import open from 'open';
import http from 'node:http';
import chalk from 'chalk';
import Table from 'cli-table3';
import fs from 'node:fs';
import yargs from 'yargs';

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
function asApiVersion(input) {
    switch (input) {
        case "v2.0":
        case "v3.0":
            return input;
        default:
            return undefined;
    }
}
function readEnvironment() {
    const dxp_url = process.env["OPTIMIZELY_DXP_URL"];
    const dxp_api = asApiVersion(process.env["OPTIMIZLEY_DXP_VERSION"]);
    const dxp_client_id = process.env["OPTIMIZELY_DXP_CLIENT_ID"];
    const dxp_client_key = process.env["OPTIMIZELY_DXP_CLIENT_KEY"];
    const debug = process.env["OPTIMIZELY_DXP_DEBUG"] === '1';
    return { dxp_url, dxp_api, dxp_client_id, dxp_client_key, debug };
}

const LOCAL_PORT$1 = 64321;
const LOCAL_HOST$1 = "localhost";
async function authenticate(params) {
    console.log("Starting new interactive authentication flow");
    try {
        const context = await prepareAuthentication(params);
        return interactive(params, context);
    }
    catch (e) {
        console.error("Unanticipated error while authenticating", e);
        return false;
    }
}
function interactive(params, context) {
    return new Promise((resolve, reject) => {
        const serverURL = getInternalServerUrl$1(params);
        const handleRequest = (req, res) => {
            if (req.url === '/favicon.ico') {
                res.writeHead(404);
                res.end();
                return;
            }
            const params = context.client.callbackParams(req);
            if (params.code) {
                console.log("Received authentication code");
                context.client.callback(serverURL.href, params, { code_verifier: context.code_verifier }).then(tokenSet => {
                    server.close();
                    console.log("Processed authentication");
                    resolve(tokenSet);
                }).catch(reject);
            }
            else {
                console.error("No code received from OpenID Service");
                reject(new Error("OpenID Protocol error"));
            }
            res.writeHead(200);
            res.write("<html><head><script>window.close()</script></head><body>You may now close this window.</body></html>");
            res.end();
        };
        const server = http.createServer(handleRequest);
        server.listen(Number.parseInt(serverURL.port), serverURL.hostname, () => {
            console.log("Interactive authentication flow ready, awaiting result");
            open(context.login_url);
        });
    });
}
async function prepareAuthentication(params) {
    const { client_id, client_secret, scopes, dxp_url } = params;
    const redirect_uris = [getInternalServerUrl$1(params).href];
    const dxpIssuer = await Issuer.discover(dxp_url.href);
    const client = new dxpIssuer.Client({
        client_id,
        client_secret,
        redirect_uris,
        response_types: ['code']
    });
    if (!Array.isArray(dxpIssuer['scopes_supported']) && scopes.every(scope => dxpIssuer['scopes_supported'].includes(scope))) {
        throw new Error(`Invalid scope requested, the supported scopes are: ${dxpIssuer['scopes_supported'].join(', ')}.`);
    }
    if (!scopes.includes('openid'))
        scopes.unshift('openid');
    const code_verifier = generators.codeVerifier();
    const code_challenge = generators.codeChallenge(code_verifier);
    const login_url = client.authorizationUrl({
        scope: scopes.join(' '),
        code_challenge,
        code_challenge_method: 'S256'
    });
    console.log(` - Requested scopes: [${scopes.join(', ')}]`);
    return { code_verifier, login_url, client };
}
function getInternalServerUrl$1({ local_host, local_port }) {
    const port = local_port && local_port > 1023 && local_port < 65535 ? local_port : LOCAL_PORT$1;
    const host = local_host ?? LOCAL_HOST$1;
    return new URL(`http://${host}:${port}/`);
}

const LOCAL_PORT = 64321;
const LOCAL_HOST = "localhost";
async function refresh(params) {
    const { client_id, client_secret, dxp_url } = params;
    const redirect_uris = [getInternalServerUrl(params).href];
    const dxpIssuer = await Issuer.discover(dxp_url.href);
    const client = new dxpIssuer.Client({
        client_id,
        client_secret,
        redirect_uris,
        response_types: ['code']
    });
    return client.refresh(params.token_set).catch(e => { console.error(e); return false; });
}
function getInternalServerUrl({ local_host, local_port }) {
    const port = local_port && local_port > 1023 && local_port < 65535 ? local_port : LOCAL_PORT;
    const host = local_host ?? LOCAL_HOST;
    return new URL(`http://${host}:${port}/`);
}

class Client {
    get dxpUrl() {
        if (typeof (this.config.dxp_url) === 'string' && this.config.dxp_url !== "")
            return this.config.dxp_url;
        throw new Error("Unable to determine the Optimizely DXP URL, please check the configuration");
    }
    get isAuthenticated() {
        if (this._token === undefined || this._token === false)
            return false;
        const expires_at = this._token?.expires_at ?? 0;
        const now = Math.floor(Date.now() / 1000);
        return now < expires_at;
    }
    constructor(config) {
        this.config = config;
        try {
            if (process.env['OPTIMIZELY_DXP_SECRET']) {
                var tokenData = process.env['OPTIMIZELY_DXP_SECRET'];
                if (typeof (tokenData) === 'string') {
                    const tokenBuffer = Buffer.from(tokenData, 'base64');
                    const tokenJsonString = tokenBuffer.toString('utf-8');
                    const token = JSON.parse(tokenJsonString);
                    if (token.access_token) {
                        this._token = token;
                    }
                }
            }
        }
        catch (e) {
            console.warn("Unable to read a configured Optimizely DXP Secret");
        }
        if (this.config.debug)
            console.log("Optimizely Content Cloud Config:", this.config);
    }
    async connect() {
        const connectUrl = (new URL("/globalassets", this.dxpUrl)).href;
        if (this.config.debug)
            console.log("Checking connectivity", connectUrl);
        const resp = await fetch(connectUrl, {
            method: 'get'
        }).catch(e => {
            return {
                ok: false,
                error: e,
                status: 500
            };
        });
        return resp.status >= 200 && resp.status < 500;
    }
    async authenticate(scopes) {
        if (this.isAuthenticated)
            return true;
        const authParams = {
            dxp_url: new URL(this.dxpUrl),
            client_id: this.config.dxp_client_id,
            client_secret: this.config.dxp_client_key,
            scopes
        };
        if (this._token !== undefined && this._token !== false) {
            this._token = await refresh({ token_set: this._token, ...authParams });
            if (typeof (this._token) === 'object')
                return true;
        }
        const tokenSet = await authenticate(authParams);
        const tokenBuffer = Buffer.from(JSON.stringify(tokenSet, undefined, 0), 'utf-8');
        process.stdout.write(`Your token, store if you want to reuse it\n\n---\n\n${tokenBuffer.toString('base64')}\n\n---\n\n`);
        this._token = tokenSet;
        return tokenSet === false ? false : true;
    }
    async getAllWebsites() {
        try {
            const serviceUrl = this.getUrl("api/episerver/{version}/site");
            if (this.config.debug)
                console.log("Invoking service", serviceUrl.href);
            const response = await fetch(serviceUrl.href, {});
            if (!response.ok)
                return { ok: false, error: response, message: `HTTP ${response.status}: ${response.statusText}` };
            const data = (await response.json());
            return {
                ok: true,
                data
            };
        }
        catch (e) {
            return {
                ok: false,
                error: e,
                message: e.message || "An error occurred"
            };
        }
    }
    async getWebsite(id) {
        try {
            const serviceUrl = this.getUrl("api/episerver/{version}/site/{siteId}", { siteId: id });
            const response = await fetch(serviceUrl.href, {});
            if (!response.ok)
                return { ok: false, error: response, message: `HTTP ${response.status}: ${response.statusText}` };
            const data = (await response.json());
            return { ok: true, data };
        }
        catch (e) {
            return {
                ok: false,
                error: e,
                message: e.message || "An error occurred"
            };
        }
    }
    async getContentTypes(includeSystemTypes) {
        try {
            const serviceUrl = this.getUrl("/api/episerver/{version}/contenttypes", { includeSystemTypes: includeSystemTypes ? "true" : "false" });
            const requestConfig = {};
            if (this._token && this._token.access_token && this._token.token_type === "Bearer") {
                requestConfig.headers = {
                    'Authorization': `Bearer ${this._token.access_token}`
                };
            }
            const response = await fetch(serviceUrl.href, requestConfig);
            if (!response.ok)
                return { ok: false, error: response, message: `HTTP ${response.status}: ${response.statusText}` };
            const data = (await response.json());
            return { ok: true, data };
        }
        catch (e) {
            return {
                ok: false,
                error: e,
                message: e.message || "An error occurred"
            };
        }
    }
    getUrl(endpoint, urlParams) {
        const url = new URL(endpoint, this.dxpUrl);
        url.pathname = url.pathname.replace(encodeURIComponent("{version}"), this.config.dxp_api ?? "v3.0");
        if (urlParams)
            for (const param in urlParams) {
                const pk = encodeURIComponent(`{${param}}`);
                const newPath = url.pathname.replace(pk, urlParams[param]);
                if (newPath === url.pathname)
                    url.searchParams.set(param, urlParams[param]);
                else
                    url.pathname = newPath;
            }
        return url;
    }
}

const defaults$2 = {
    output: process.env['WEBSITE_FILE'] ?? "website.cjs",
    dxp_site_id: process.env["OPTIMIZELY_DXP_SITE_ID"]
};
const isDevelopment = process.env['NODE_ENV'] === 'development';
const command$1 = "website [action]";
const aliases$1 = ['w'];
const builder$1 = (yargs) => {
    yargs
        .positional('action', {
        type: 'string',
        describe: 'The website action to execute',
        choices: ["export", "list"],
        demandOption: true,
        group: "Website options:"
    })
        .option('dxp_site_id', {
        alias: 'ds',
        type: 'string',
        describe: 'The website identifier',
        string: true,
        default: defaults$2.dxp_site_id,
        group: "Website options:"
    })
        .option("output", {
        alias: "o",
        type: "string",
        string: true,
        describe: "The file to write the output to, relative to working dir",
        default: defaults$2.output,
        group: "Website options:"
    })
        .help();
    return yargs;
};
const deprecated$1 = false;
const describe$1 = `Create and maintain website definition files based upon the website configuration within Optimizely Content Cloud.`;
const handler$1 = async (args) => {
    const api = new Client(args);
    const connected = await api.connect();
    if (!connected) {
        process.stderr.write(`${chalk.red("ERROR:")} Unable to connect to Optimizely Content Cloud\n`);
        return;
    }
    switch (args?.action) {
        case "list":
            return listAction(args, api);
        case "export":
            return exportAction(args, api);
        default:
            process.stderr.write(`${chalk.red("ERROR:")} Unsupported website action provided\n`);
            break;
    }
};
async function exportAction(args, api) {
    const cwd = process.cwd();
    const fullOutputFile = path__default.resolve(cwd, args.output ?? defaults$2.output);
    const siteId = args.dxp_site_id;
    if (!siteId) {
        process.stderr.write(`${chalk.red("ERROR:")} The Website identifier is mandatory to create an export\n`);
        return;
    }
    const site = await api.getWebsite(siteId);
    if (!site.ok) {
        process.stderr.write(`${chalk.red("ERROR:")} Unable to load the website - ${site.message}\n`);
        return;
    }
    const siteInfo = {
        name: site.data.name,
        id: site.data.id,
        startPage: site.data.contentRoots?.startPage?.guidValue,
        startPageUrl: site.data.contentRoots?.startPage?.url,
        locales: (site.data.languages ?? []).map(x => x.name),
        defaultLocale: (site.data.languages ?? []).filter(x => x.isMasterLanguage === true).map(x => x.name)[0] ?? (site.data.languages ?? []).slice(0, 1).map(x => x.name)[0],
        labels: (site.data.languages ?? []).map(x => { return { code: x.name, label: x.displayName }; }),
        primaryDomain: (site.data.hosts ?? []).filter(x => x.type === "Primary").map(x => `http${isDevelopment ? '' : 's'}://${x.name}`)[0] ?? "",
        domains: (site.data.hosts ?? []).filter(x => x.type !== "Edit").map(x => `http${isDevelopment ? '' : 's'}://${x.name}`),
        localeDomains: (site.data.hosts ?? []).filter(x => x.type !== "Edit" && x.language?.name).map(x => { return { domain: `http${isDevelopment ? '' : 's'}://${x.name}`, defaultLocale: x.language?.name }; })
    };
    const siteInfoString = JSON.stringify(siteInfo, null, 4);
    const fileContents = `// Auto generated file - do not change manually!\n\nconst siteInfo = ${siteInfoString};\n\nmodule.exports = siteInfo;`;
    return new Promise((resolve, reject) => {
        fs.writeFile(fullOutputFile, fileContents, { encoding: 'utf-8' }, () => {
            process.stdout.write(`${chalk.green("SUCCESS:")} Written site configuration to ${fullOutputFile}`);
            resolve();
        });
    });
}
async function listAction(args, api) {
    const sites = await api.getAllWebsites();
    if (sites.ok) {
        const wsTable = new Table({
            head: ['ID', 'Name', 'Languages', 'Domains'],
            colWidths: [40, 40, 40, 40]
        });
        for (const site of sites.data ?? []) {
            wsTable.push([
                site.id,
                site.name,
                site.languages.map(x => `${x.displayName} [${x.name}]`).join('\n '),
                (site.hosts ?? []).map(x => `${x.type === 'Primary' ? '[P]' : x.type === 'Edit' ? '[E]' : '[ ]'} ${x.name}`).join("\n")
            ]);
        }
        process.stdout.write(wsTable.toString());
        process.stdout.write("\n");
    }
    else {
        process.stderr.write(`${chalk.red("ERROR:")} Unable to retrieve sites. ${args.debug ? sites.message : ""}\n`);
        if (args.debug) {
            console.log(sites.error);
        }
    }
}

var website = /*#__PURE__*/Object.freeze({
    __proto__: null,
    aliases: aliases$1,
    builder: builder$1,
    command: command$1,
    deprecated: deprecated$1,
    describe: describe$1,
    handler: handler$1
});

const defaults$1 = {
    schema: process.env['SCHEMA_FILE'] ?? "schema.json",
    types: process.env['TYPES_FILE'] ?? "schema.d.ts",
    scope: process.env['OPTIMIZELY_DXP_CONTENTDEFINITION_API_SCOPE'] ?? "epi_content_definitions",
    with_types: false
};
process.env['NODE_ENV'] === 'development';
const optionsGroup = "Type definition options:";
const command = "types [action]";
const aliases = ['t'];
const builder = (yargs) => {
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
        default: defaults$1.schema,
        group: optionsGroup
    })
        .option("types", {
        alias: "t",
        type: "string",
        string: true,
        describe: "TypeScript definitions file, relative to working dir",
        default: defaults$1.types,
        group: optionsGroup
    })
        .option("scope", {
        alias: "c",
        type: "string",
        string: true,
        describe: "The authorization scope to fetch content definition information",
        default: defaults$1.scope,
        group: optionsGroup
    })
        .option("with_types", {
        alias: "wt",
        type: "boolean",
        boolean: true,
        describe: "Set this flag to output the typescript definitions",
        default: defaults$1.with_types,
        group: optionsGroup
    })
        .help();
    return yargs;
};
const deprecated = false;
const describe = `Create and maintain content type definition files that are synchronized with the Optimizely Content Cloud.`;
const handler = async (args) => {
    const api = new Client(args);
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
        const schemaFile = args.schema ?? defaults$1.schema;
        const typesFile = args.types ?? defaults$1.types;
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
    const fullOutputFile = path__default.resolve(cwd, schemaFile);
    data.sort((a, b) => (a.name > b.name) ? 1 : ((a.name < b.name) ? -1 : 0));
    fs.writeFileSync(fullOutputFile, JSON.stringify(data, undefined, 4));
    process.stderr.write(`${chalk.greenBright("SUCCESS:")} Written schema data to ${fullOutputFile}\n`);
}
function writeTypes(data, typesFile) {
    const cwd = process.cwd();
    const fullOutputFile = path__default.resolve(cwd, typesFile);
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

var types = /*#__PURE__*/Object.freeze({
    __proto__: null,
    aliases: aliases,
    builder: builder,
    command: command,
    deprecated: deprecated,
    describe: describe,
    handler: handler
});

var CommandDictionary = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Type: types,
    Website: website
});

const commands = [];
for (let commandKey of Object.getOwnPropertyNames(CommandDictionary)) {
    let module = CommandDictionary[commandKey];
    commands.push(Promise.resolve(module));
}

const defaults = readEnvironment();
defaults.dxp_api = defaults.dxp_api ?? "v3.0";
Promise
    .all(commands)
    .then(startCli)
    .catch(cliError);
function startCli(commands) {
    const args = yargs(process.argv)
        .scriptName("cms-cli")
        .usage('$0 <cmd> [args]')
        .option("debug", { alias: "d", description: "Enable debug mode", boolean: true, type: "boolean", default: defaults.debug })
        .option("dxp_url", { alias: "du", description: "The URL of Optimizely DXP", string: true, type: "string", demandOption: defaults.dxp_url === undefined, default: defaults.dxp_url })
        .option("dxp_api", { alias: "da", description: "The API Version of Optimizely DXP", string: true, type: "string", options: ["v2.0", "v3.0"], demandOption: defaults.dxp_api === undefined, default: defaults.dxp_api })
        .option("dxp_client_id", { alias: "dci", description: "The Client ID for Optimizely DXP", string: true, type: "string", demandOption: defaults.dxp_client_id === undefined, default: defaults.dxp_client_id })
        .option("dxp_client_key", { alias: "dck", description: "The Client Key for Optimizely DXP", string: true, type: "string", demandOption: defaults.dxp_client_key === undefined, default: defaults.dxp_client_key })
        .epilogue("Optimizely Content Cloud 12+ - Node.JS CLI Client\n(C)2022 Remko Jantzen\n\n")
        .demandCommand(1, 1, 'You must specify the command to execute', 'You may only execute one command at a time')
        .help();
    commands.forEach(command => args.command(command));
    return args.parse(process.argv.slice(2));
}
function cliError(e) {
    console.log("Unhandled error while processing the application", e);
}
