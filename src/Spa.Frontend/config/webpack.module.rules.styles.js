const glob = require('glob');
const path = require('path');

// Webpack
const Webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;
const ComponentHTMLPreloadPlugin = require("./ComponentHTMLPreloadPlugin");

// Optimizely Webpack Utilities
const Config = require('@episerver/webpack/cjs/util/Config').GlobalConfig;

// Epi Webpack tools
const EpiWebpack = require('@episerver/webpack');
const EmptyLoader = require.resolve('@episerver/webpack/cjs/webpack-loaders/EmptyLoader');

// Build configuration

const PreloadSchema = require('./PreloadSchema');
const manifest = require('../manifest.json');
const preload = require('../preload.json');
PreloadSchema.validate(preload);

/**
 * Inject a small fill for replaceAll, which is available from Node.JS 16+, but not yet in
 * the current Node.JS LTS (14). This can be removed once the next LTS has been released.
 * 
 * This fill is inefficient, as it will enter a loop where it passes these parameters to the
 * regular replace method untill it detects no changes resulting of that replace call. 
 * 
 * BE ADVISED: If you pass in values which will always cause a change, you will create an
 * infinite loop!
 * 
 * @param   { string }  search      The string to search for
 * @param   { string }  replace     The replacement string
 * @returns { string }  A new string with all occurances of search being replaced
 */
if (!String.prototype.replaceAll) String.prototype.replaceAll = function(search, replace)
{
    let out = this.replace(search, replace);
    let prevStep = this;
    while (out != prevStep) {
        prevStep = out;
        out = out.replace(search, replace);
    }
    return out;
}

/**
 * Generate a list of entry points to enable inlining of styles
 * 
 * @param { string } searchDir The directory to search within
 * @param { string } contextDir The context directory of the current Webpack run
 * @returns { object } The list of entrypoints, needed by WebPack to generate the resources
 */
function listInlineStyleEntries(searchDir, contextDir)
{
    const posix = path.posix
    const context = path.normalize(contextDir).replaceAll(path.sep, posix.sep); //
    const files = glob.sync(path.join(searchDir,"**","*.inline.scss")).map(x => posix.normalize(x));
    const paths = files.map(x => "." + posix.sep + posix.relative(context, x)).sort((a, b) => a.length - b.length);
    const entries = {};

    paths.forEach(x => {
        const entryName = "styles." + posix.basename(x, posix.extname(x)).toLowerCase();
        entries[entryName] = x;
    });
    
    return entries;
}

/**
 * Generate the partial webpack configuration for the Styles and HTML 
 * output.
 * 
 * @param { {[key:string] : string} }     env     Webpack Execution environment variables
 * @param { string }                      bundle  The bundle name that is being created
 * @param { boolean | undefined }         forServerSideRendering    Set to true to flag a server side renderin build
 * @returns { Partial<Webpack.Configuration> }    The partial Webpack configuration to be merged into the final configuration
 */
module.exports = (env, bundle, forServerSideRendering) => {

    const epiEnv        = env.EPI_ENV || process.env.EPI_ENV;
    const config        = new Config(path.join(__dirname,".."), env, epiEnv);
    const mode          = config.getEpiEnvironment() === 'development' ? 'development' : 'production';
    const forProduction = mode.toLowerCase() === 'production';
    const entryPoints   = listInlineStyleEntries(config.getSourceDir(), config.getRootDir());

    return {
        entry: entryPoints,
        module: {
            rules: [
                // All regular CSS files
                {
                    test: /\.css$/,
                    sideEffects: true,
                    use: forServerSideRendering ? [{ loader: EpiWebpack.EmptyLoader }] : [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: 'styles'
                            }
                        },
                        {
                            loader: 'css-loader',
                            options: { 
                                sourceMap: true,
                            }
                        }
                    ],
                },

                // ALL MODULE SCSS / SASS FILES
                {
                    test: /\.module\.(s[ca]ss)$/,
                    sideEffects: false,
                    use: forServerSideRendering ? [{ loader: EpiWebpack.EmptyLoader }] : [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: 'styles',
                                esModule: true,
                                modules: {
                                    namedExport: true,
                                }
                            }
                        }, {
                            loader: 'css-loader',
                            options: { 
                                sourceMap: true,
                                esModule: true,
                                modules: {
                                    compileType: 'module',
                                    namedExport: true,
                                    exportLocalsConvention: 'camelCaseOnly',
                                },
                                importLoaders: 2
                            }
                        }, {
                            loader: 'resolve-url-loader',
                            options: { 
                                sourceMap: true
                            }
                        }, {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                },

                // ALL INLINE SCSS / SASS FILES
                {
                    test: /\.inline\.(s[ca]ss)$/,
                    sideEffects: false,
                    use: [
                        forServerSideRendering ? { loader: EpiWebpack.EmptyLoader } : {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                emit: true,
                                publicPath: 'styles'
                            }
                        },
                        {
                            loader: 'css-loader',
                            options: { 
                                sourceMap: false,
                                importLoaders: 2
                            }
                        }, {
                            loader: 'resolve-url-loader',
                            options: { 
                                sourceMap: true
                            }
                        }, {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                },

                // ALL GLOBAL SCSS / SASS FILES
                {
                    test: /\.(s[ca]ss)$/,
                    exclude: [
                        /\.module\.(s[ca]ss)$/,
                        /\.inline\.(s[ca]ss)$/
                    ],
                    sideEffects: true,
                    use: forServerSideRendering ? [{ loader: EpiWebpack.EmptyLoader }] : [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: 'styles'
                            }
                        }, {
                            loader: 'css-loader',
                            options: { 
                                sourceMap: true,
                                importLoaders: 2
                            }
                        }, {
                            loader: 'resolve-url-loader',
                            options: { 
                                sourceMap: true
                            }
                        }, {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                }
            ]
        },
        plugins: forServerSideRendering ? [] : [
            new MiniCssExtractPlugin({
                filename: 'styles/[name].[contenthash:8].css',
                chunkFilename: 'styles/[name].[contenthash:8].css',
                ignoreOrder: true
            }),

            new HtmlWebpackPlugin({
                title: manifest.name,
                filename: 'index.html',
                inject: 'body',
                meta: [
                    {name: "x-ssr-replace", content: "meta"},
                    {name: "x-ssr-replace", content: "link"},
                    {name: "x-ssr-replace", content: "context"},
                    {name: "x-ssr-replace", content: "script"},
                    {name: "x-ssr-replace", content: "style"},
                ],
                minify: forProduction ? {
                    removeComments: false,
                    preserveLineBreaks: false,
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true
                } : false,
                scriptLoading: 'defer'
            }),

            // Inline all styles files, including inline in the name
            new HTMLInlineCSSWebpackPlugin({
                filter: (filename) => filename.includes('index.html') || filename.includes('inline')
            }),

            new ComponentHTMLPreloadPlugin({
                id: preload.appId,
                //components: preload.components,
                preconnect: [
                    "https://a.idio.co",
                    "https://s.idio.co"
                ]
            })
        ]
    }
}