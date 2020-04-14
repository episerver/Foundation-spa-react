const path = require('path')
const webpack = require('webpack')
const globalConfig = require('./global.config');

/**
 * Webpack configuration module which generates the .Net based
 * Server Side Rendering javascript file. Which is a monolith
 * containing all resources
 */
module.exports = (env) => {
    const serverPath = globalConfig.getEnvVariable('SERVER_PATH', 'server', env);
    const filePath = globalConfig.getEnvVariable('SPA_PATH', 'Spa', env);
    const epiPath = globalConfig.getEnvVariable('EPI_PATH', '../Foundation', env);
    const webPath = globalConfig.getEnvVariable('WEB_PATH', '/', env);

    const config = {
        target: 'node',
        entry: {
            server: path.resolve(__dirname, serverPath, 'server.tsx')
        },
        output: {
            filename: path.join(filePath,'[name].js'),
            chunkFilename: path.join(filePath,'[name].chunk.js'),
            path: path.resolve(__dirname, epiPath),
            publicPath: webPath
        },
        node: {
            __dirname: false,
            __filename: false
        },
        resolve: globalConfig.getResolveConfig(env),
        module: {
            rules: [{
                test: /\.(ts|tsx)$/,
                use: [{
                    loader: 'ts-loader'
                }, {
                    loader: path.resolve('lib/PreLoadLoader.js'),
                    options: {
                        pattern: '**/*.tsx',
                        extension: '.tsx'
                    }
                }]
            }, {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{ loader: path.resolve('lib/EmptyLoader.js') }]
            }, {
                test: /\.(s[ca]ss)$/,
                use: [{ loader: path.resolve('lib/EmptyLoader.js') }]
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
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify(globalConfig.getEnvVariable("NODE_ENV","development",env)),
				'process.env.DEBUG': JSON.stringify(globalConfig.getEnvVariable("DEBUG","1",env)),
				'process.env.EPI_URL': JSON.stringify(globalConfig.getEnvVariable("EPI_URL","/",env)),
				'process.env.WEB_PATH': JSON.stringify(globalConfig.getEnvVariable("WEB_PATH","",env))
			})
        ]
    }
    return config;
};