// Stage global vars
import getGlobal from '@episerver/spa-core/AppGlobal';
const ctx = getGlobal();
if (!ctx.epi) ctx.epi = {};
ctx.epi.isServerSideRendering = true;

// Generic Libraries
import 'core-js';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import fs from 'fs';
import { XmlEntities } from 'html-entities';

//React
import ReactDOMServer from 'react-dom/server';
import { Helmet } from 'react-helmet';
import React from 'react';

// Episerver Libraries
import CmsSite from '@episerver/spa-core/Components/CmsSite';
import ServerContext from '@episerver/spa-core/ServerSideRendering/ServerContext';
import DefaultServiceContainer from '@episerver/spa-core/Core/DefaultServiceContainer'; 
import EpiSpaContext from '@episerver/spa-core/Spa';
import { PathResponseIsIContent } from '@episerver/spa-core/ContentDeliveryAPI'

// Implementation
import config from 'app/Config';
import IContent from '@episerver/spa-core/Models/IContent';

// Run DotEnv configuration
dotenv.config({path: path.resolve(__dirname, '.env')});

// Initial config
const rootDir   = __dirname;
const port      = 9001;
const epiUrl    = getenv('EPI_URL');
const epiPath   = getenv('EPI_PATH', '/');
const debug     = getenv('NODE_ENV','development') !== 'production';
const pageTpl   = getenv('PAGE_TEMPLATE', 'index.html');

// Initialize Episerver System
console.log(' ----- Episerver NodeJS Delivery Server ----- ');
const serviceContainer = new DefaultServiceContainer();
config.epiBaseUrl = epiUrl;
config.basePath = epiPath;
config.enableDebug = false;
EpiSpaContext.init(config, serviceContainer, true);

console.log(`Context initialized - SSR: ${ EpiSpaContext.isServerSideRendering() ? 'Enabled' : 'Disabled' }`);

// PreLoad components for SSR, auto injected by the Webpack Loader
// @PreLoad("../src/components","ctx.PreLoad","app/Components/")

//Show endpoint
console.log(`Episerver URL: ${EpiSpaContext.getEpiserverURL()}`);
if (debug) {
    console.log(`Root dir:      ${rootDir}`);
}

console.log('Loading websites');
EpiSpaContext.loadCurrentWebsite().then(website => {
    console.log(` - Loaded website: ${website.name}`);
    EpiSpaContext.loadContentByRef('startPage').then(content => {
        console.log(` - Loaded start page: ${content.name}`)

        const tplFile = path.resolve(__dirname, pageTpl);
        console.log(`Checking template: ${tplFile}`);
        if (fs.existsSync(tplFile)) {
            const tpl = fs.readFileSync(path.resolve(__dirname, pageTpl));
            ctx.tpl = tpl.toString();
            console.log(' - File present and loaded into global context');
        } else {
            throw 'Template file not present';
        }

        const app = express();

        /*
        if (debug && fs.existsSync(path.resolve(__dirname,'../express.webpack.config.js'))) {
            console.log('  - Adding Webpack Middleware');
            const webpack = require('webpack');
            const webpackDevMiddleware = require('webpack-dev-middleware');
            const webpackConfig = require('../express.webpack.config');
            const webpackCompiler = webpack(webpackConfig);
            app.use(webpackDevMiddleware(webpackCompiler, { publicPath: '/'}));
        }
        */

        //Catch homepage first
        app.get('/', epiRouter);

        //Handle resource folders
        app.use('/', express.static(rootDir));

        //Redirect others to Episerver
        app.get('*', epiRouter);
        
        //Start server
        app.listen(port, () => {
            console.log(`Server listing at http://localhost:${port}/`+(debug ? ' with debug enabled': ''));
        });
    });
});

async function epiRouter(req: Request, res: Response, next: NextFunction) : Promise<void>
{
    //Load content and add to repository - if needed
    const response = await EpiSpaContext.contentDeliveryApi().getContentByPath(req.url);
    let iContent : IContent;
    let actionData : any = {};
    if (PathResponseIsIContent(response)) {
        iContent = response;
    } else {
        EpiSpaContext.injectContent(response.currentContent);
        iContent = response.currentContent;
        actionData = response.data;
    }

    //Debug output
    if (debug) console.log(`${req.method}: ${req.url} - Provided by: ${iContent.contentLink.providerName || 'CMS'}`);

    //Don't handle 404 using default router
    if (iContent.contentLink.providerName === 'ContentDeliveryAPI_Errors') {
        next();
        return;
    }
    
    //Create CMS Site
    const pageData : ServerContext = {
        ContentLink: iContent.contentLink,
        IContent: iContent,
        Path: req.url,
        Location: {},
        Website: EpiSpaContext.getCurrentWebsite(),
        StartPageData: EpiSpaContext.getContentByRef('startPage')
    }
    const element = React.createElement(CmsSite, {
        context: EpiSpaContext,
        //path: req.url,
        //pageData
    });
    const react_body = ReactDOMServer.renderToString(element);
    const meta = Helmet.renderStatic();
    const encoder = new XmlEntities();
    const jsonContext = `<script type="text/javascript">/*<![CDATA[*/ var __INITIAL__DATA__ = ${JSON.stringify(pageData).replace(/<\//gi,"<\\/")}; /*]]>*/</script>`;
    
    let body = ctx.tpl.replace('<!--SSR-BODY-->', react_body);
    body = body.replace('<!--SSR-META-->', meta.meta.toString());
    body = body.replace('<!--SSR-LINK-->', meta.link.toString());
    body = body.replace('<!--SSR-TITLE-->', meta.title.toString());
    body = body.replace('<!--SSR-CONTEXT-->', jsonContext);
    body = body.replace('<!--SSR-SCRIPT-->', meta.script.toString());
    body = body.replace('<!--SSR-STYLE-->', meta.style.toString());
    res.send(body);
}

/**
 * Retrieve an environment variable
 * 
 * @param name The environment variable to get
 * @param defaultValue The default value if not set, defaults to an empty string
 */
function getenv(name: string, defaultValue: string = '') : string
{
    return process.env[name] ? process.env[name] : defaultValue;
}