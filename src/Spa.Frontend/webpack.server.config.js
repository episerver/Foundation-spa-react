const GlobalConfig = require('@episerver/webpack/Config');
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const DeployToEpiserverPlugin = require('./DeployToEpiserverPlugin');

module.exports = (env) => {

    const bundle        = 'app.server.spa';
    const srcPath       = path.resolve(__dirname, 'server');

    /** @type {GlobalConfig} */
	const config        = new GlobalConfig(__dirname, env);
    const webPath       = config.getWebPath();
    const mode          = config.getNodeEnv();
    const forProduction = mode.toLowerCase() === 'production';
    const epiBaseUrl = config.getEnvVariable('EPI_URL');
    const epiDeployPath = config.getEnvVariable('EPI_DEPLOY_PATH', '/api/episerver/v3/deploy');

    const webpackConfig = {
        entry: path.resolve(srcPath, 'server.tsx'),
        target: 'web',
        mode: mode,
        devtool: forProduction ? 'source-map' : 'inline-source-map',
		output: {
			filename: 'server.js',
            chunkFilename: 'server.[name].[contenthash:8].js',
			path: path.join(__dirname, 'dist', bundle),
			publicPath: webPath + bundle + '/'
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

            // Neither frontend nor backend is running in NodeJS, so define some variables
            new webpack.DefinePlugin(config.getDefineConfig(env)),

            //Keep the Spa folder clean
            new CleanWebpackPlugin({
                dry: false,
                verbose: false,
                cleanOnceBeforeBuildPatterns: [ '**/*' ],
            }),

            new FileManagerPlugin({
                events: {
                    onEnd: {
                        archive: [
                            {
                                source: 'dist/' + bundle,
                                destination: 'dist/epi-bundle/' + bundle,
                                format: 'zip'
                            }
                        ]
                    }
                }
            }),

            new DeployToEpiserverPlugin({
                filename: bundle,
                filepath: 'dist/epi-bundle',
                base: epiBaseUrl,
                path: epiDeployPath
            })
        ]
    }

    return webpackConfig;
}