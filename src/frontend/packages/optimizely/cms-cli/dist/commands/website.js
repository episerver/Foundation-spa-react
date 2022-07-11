import ApiClient from '../infrastructure/client';
import chalk from 'chalk';
import Table from 'cli-table3';
import path from 'node:path';
import fs from 'node:fs';
const defaults = {
    output: process.env['WEBSITE_FILE'] ?? "website.cjs",
    dxp_site_id: process.env["OPTIMIZELY_DXP_SITE_ID"]
};
const isDevelopment = process.env['NODE_ENV'] === 'development';
export const command = "website [action]";
export const aliases = ['w'];
export const builder = (yargs) => {
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
        .help();
    return yargs;
};
export const deprecated = false;
export const describe = `Create and maintain website definition files based upon the website configuration within Optimizely Content Cloud.`;
export const handler = async (args) => {
    const api = new ApiClient(args);
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
    const fullOutputFile = path.resolve(cwd, args.output ?? defaults.output);
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
