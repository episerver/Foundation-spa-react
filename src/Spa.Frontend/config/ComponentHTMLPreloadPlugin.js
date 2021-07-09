const Webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SchemaUtils = require('schema-utils');
const JsonSchema = require('json-schema');

/**
 * The configuration schema for the ComponentHTMLPreloadPlugin Webpack plugin.
 * 
 * @type { JsonSchema.JSONSchema6 } 
 */
const PluginConfig = {
    type: 'object',
    properties: {
        id: {
            type: 'string',
            minLength: 1,
            maxLength: 64,
            description: "The identifier of the application container, minimum of 1 chars, max 64 chars",
        },
        unblockCss: {
            type: 'boolean',
            default: true,
            description: "Set to false to directly load CSS in blocking fashion"
        },
        components: {
            type: 'array',
            items: {
                type: 'string',
                minLength: 1
            },
            minItems: 1
        }
    },
    required: ['id']
}

/**
 * The default configuration of the plugin
 * 
 * @type { { id?: string, components ?: string[], unblockCss ?: boolean } }
 */
const DefaultConfig = {
    unblockCss: true,
    components: []
}

const PLUGIN_NAME = 'ComponentHTMLPreloadPlugin';

class ComponentHTMLPreloadPlugin {
    /**
     * Container of the current instance configuration
     * 
     * @type { { id: string, components ?: string[], unblockCss ?: boolean } }
     * @private
     */
    _config = undefined;

    /**
     * Create a new instance of ComponentHTMLPreloadPlugin
     * 
     * @param { object } config ComponentHTMLPreloadPlugin configuration
     * @param { string } config.id The identifier of the application container, minimum of 1 chars, max 64 chars
     * @param { string[] | undefined } config.components The identifier of the application container, minimum of 1 chars, max 64 chars
     * @param { boolean | undefined } config.unblockCss Marker to indicate if the blocking due to CSS must be lifted, default to true
     */
    constructor(config)
    {
        SchemaUtils.validate(PluginConfig, config, { name: PLUGIN_NAME });
        this._config = Object.assign({}, DefaultConfig, config );
    }

    /**
     * Attach the plugin to the Webpack compiler
     * 
     * @param { Webpack.Compiler } compiler     The compiler to bind to
     * @returns { void }
     */
    apply(compiler) {
        const logger = compiler.getInfrastructureLogger(PLUGIN_NAME);
        const containerId = this._config.id;
        const unblockCss = this._config.unblockCss;

        // Specify the event hook to attach to
        compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation) => {
            const htmlPluginHooks = HtmlWebpackPlugin.getHooks(compilation);
            htmlPluginHooks.beforeAssetTagGeneration.tapAsync(PLUGIN_NAME+"FilterAssets", (data, cb) => {
                data.assets.js = data.assets.js.filter(x => !x.includes('inline'));
                cb(false, data);
            })
            htmlPluginHooks.alterAssetTagGroups.tapAsync(PLUGIN_NAME+"InjectAppDiv", (data, cb) => {
                if (containerId) {
                    logger.status("Injecting application container with id: \x1b[34m",containerId,"\x1b[0m\n");
                    data.bodyTags.unshift({
                        tagName: 'div',
                        innerHTML: '',
                        voidTag: false,
                        attributes: {
                            id: containerId
                        }
                    });
                }

                if (unblockCss) {
                    logger.status("Updating stylesheets switch to lazy loading");
                    for (var i = 0; i< data.headTags.length; i++) {
                        var tag = data.headTags[i];
                        if (tag.tagName == 'link' && tag.attributes["rel"] === 'stylesheet' && !tag.attributes['media']) {
                            tag.attributes['media'] = 'print';
                            tag.attributes['onload'] = "this.media='all'; this.onload=null;";
                        }
                        data.headTags[i] = tag;
                    }
                }

                data.headTags.push({
                    tagName: "link",
                    attributes: {
                        "rel": "preload",
                        "href": "/spaview/app.html.spa/fonts/fa-solid-900.woff2",
                        "as": "font",
                        "crossOrigin": "anonymous"
                    }
                });

                cb(false, data);
            });
            /*htmlPluginHooks.beforeAssetTagGeneration.tap(PLUGIN_NAME+"CatchPrefetchModules", tags => {
                compilation.getAssets().forEach(asset => asset.info.)
            });*/
        });
    }
}


module.exports = ComponentHTMLPreloadPlugin;
module.exports.pluginName = PLUGIN_NAME;