const path = require('path')
const webpack = require('webpack')
const GlobalConfig = require('episerver-webpack/Config');

/**
 * Webpack configuration module which generates the .Net based
 * Server Side Rendering javascript file. Which is a monolith
 * containing all resources
 */
module.exports = (env) => {
    const config     = new GlobalConfig(__dirname);
    const serverPath = config.getServerPath(env);
    const filePath   = config.getSpaPath(env);
    const epiPath    = config.getEpiPath(env);
    const webPath    = config.getWebPath(env);

    const webpackConfig = {
        target: 'node',
        entry: {
            server: path.resolve(__dirname, serverPath, 'server.tsx')
        },
        output: {
            filename: path.join(filePath,'[name].js'),
            chunkFilename: path.join(filePath,'server.[name].chunk.js'),
            path: path.resolve(__dirname, epiPath),
            publicPath: webPath
        },
        node: {
            __dirname: false,
            __filename: false
        },
        resolve: config.getResolveConfig(env),
        module: {
            rules: [{
                test: /\.(ts|tsx)$/,
                use: [{
                    loader: 'ts-loader'
                }, {
                    loader: 'episerver-webpack/PreLoadLoader',
                    options: {
                        pattern: '**/*.tsx',
                        extension: '.tsx'
                    }
                }]
            }, {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{ loader: 'episerver-webpack/EmptyLoader' }]
            }, {
                test: /\.(s[ca]ss)$/,
                use: [{ loader: 'episerver-webpack/EmptyLoader' }]
            }]
        },
        plugins: [
            //Force the usage of the browser version of react-dom/server
            new webpack.NormalModuleReplacementPlugin(
                /react-dom\/server/,
                function (resource) {
                    resource.request = "react-dom/server.browser";
                }
            ),

            //Embed jQuery globals
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery'
            }),

			//Expose ENV variables
			new webpack.DefinePlugin(config.getDefineConfig(env))
        ]
    }
    return webpackConfig;
};