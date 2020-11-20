const GlobalConfig = require('@episerver/webpack/Config');
const path = require('path');
const webpack = require('webpack');
const ZipLibrary = require('zip-webpack-plugin');
const DeployToEpiserverPlugin = require('./DeployToEpiserverPlugin');

module.exports = (env) => {

    /** @type {GlobalConfig} */
	const config        = new GlobalConfig(__dirname, env);
    const srvPath       = path.resolve(__dirname, config.getServerPath());
    const webPath       = config.getWebPath();
    const outPrefix     = config.getSpaPath();
    const distPath      = path.resolve(__dirname, config.getEpiPath());
    const mode          = config.getNodeEnv();
    const forProduction = mode.toLowerCase() === 'production';
    const zipPath = config.getEnvVariable('ZIP_PATH');
    const epiBaseUrl = config.getEnvVariable('EPI_URL');
    const epiDeployPath = config.getEnvVariable('EPI_DEPLOY_PATH');

    console.log('');
    console.log('Starting Episerver ' + mode.toLowerCase() + ' server build');
    console.log('  - Building Episerver Server Side Rendering from: ' + srvPath);
    console.log('  - Writing files to: '+ path.resolve(distPath, outPrefix));
    console.log('  - Assuming site running at (relative to domain): ' + webPath);
    console.log('');

    const webpackConfig = {
        entry: path.join(srvPath, 'server.tsx'),
        target: 'web',
        mode: mode,
        devtool: forProduction ? 'source-map' : 'inline-source-map',
		output: {
			filename: outPrefix+'server.js',
            chunkFilename: outPrefix+'server.[name].[contenthash:8].js',
			path: distPath,
			publicPath: webPath
        },
        resolve: config.getResolveConfig(),
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
                        loader: '@episerver/webpack/PreLoadLoader',
                        options: {
                            pattern: '**/*.tsx',
                            extension: '.tsx'
                        }
                    }]
                },
                {
                    test: /\.js$/,
                    enforce: "pre",
                    loader: "source-map-loader"
                },
                {
                    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [{ loader: '@episerver/webpack/EmptyLoader' }]
                },
                {
                    test: /\.(s[ca]ss)$/,
                    use: [{ loader: '@episerver/webpack/EmptyLoader' }]
                }
            ]
        },
        plugins: [
            // Ensure we run browser logic
            new webpack.NormalModuleReplacementPlugin(
                /react-dom\/server/,
                function (resource) {
                    resource.request = "react-dom/server.browser";
                }
            ),

            // Embed jQuery globals
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery'
            }),

            // Neither frontend nor backend is running in NodeJS, so define some variables
            new webpack.DefinePlugin(config.getDefineConfig(env)),

            new ZipLibrary({
                filename: 'app.server',
                path: zipPath,
                extension: 'spa'
            }),

            new DeployToEpiserverPlugin({
                filename: 'app.server.spa',
                filepath: path.resolve(distPath, zipPath),
                base: epiBaseUrl,
                path: epiDeployPath
            })
        ]
    }

    return webpackConfig;
}