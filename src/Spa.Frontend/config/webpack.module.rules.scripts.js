// Load dependencies
const Webpack = require('webpack');
const PreloadSchema = require('./PreloadSchema');
const EpiWebpack = require('@episerver/webpack');

// Load configuration
const preload = require('../preload.json');

// Validate configuration
PreloadSchema.validate(preload);

/**
 * Generate the partial webpack configuration for the Styles and HTML 
 * output.
 * 
 * @param { {[key:string] : string} }     env     Webpack Execution environment variables
 * @param { string }                      bundle  The bundle name that is being created
 * @returns { Partial<Webpack.Configuration> }    The partial Webpack configuration to be merged into the final configuration
 */
 module.exports = (env, bundle) => {
    return {
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    use: [{
                        loader: 'ts-loader',
                        options: {
                            allowTsInNodeModules: false,
                            onlyCompileBundledFiles: true
                        }
                    }, {
                        loader: EpiWebpack.PreLoadLoader,
                        options: {
                            pattern: '**/*.tsx',
                            extension: '.tsx'
                        }
                    }, {
                        loader: './config/ComponentPreloader',
                        options: {
                            typeScript: true,
                            components: preload.components
                        }
                    }]
                },
                {
                    test: /\.js$/,
                    enforce: "pre",
                    loader: "source-map-loader"
                }
            ]
        }
    }
 }