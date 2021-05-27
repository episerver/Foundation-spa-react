// Node.JS
const path = require('path');

// Webpack
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

// Episerver Webpack Utilities
const EpiWebpack = require('@episerver/webpack');

module.exports = (env) => {
    const epiEnv        = env.EPI_ENV || process.env.EPI_ENV;
    const bundle        = 'app.server.spa';
    const srcPath       = path.resolve(__dirname, 'server');
	const config        = new EpiWebpack.Config(__dirname, env, epiEnv);
    const webPath       = config.getWebPath();
    const mode          = config.getEpiEnvironment() === 'development' ? 'development' : 'production';
    const forProduction = mode.toLowerCase() === 'production';
    const epiBaseUrl    = config.getEpiserverURL();
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
			publicPath: webPath + 'spaview/' + bundle + '/'
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
                        loader: EpiWebpack.PreLoadLoader,
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
                    use: [{ loader: EpiWebpack.EmptyLoader }]
                },
                {
                    test: /\.(png|jpg|jpeg|svg)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [{ loader: EpiWebpack.EmptyLoader }]
                },
                {
                    test: /\.(s[ca]ss)$/,
                    use: [{ loader: EpiWebpack.EmptyLoader }]
                },
                {
                    test: /\.css$/,
                    use: [{ loader: EpiWebpack.EmptyLoader }]
                }
            ]
        },
        optimization: {
            minimize: forProduction,
            minimizer: forProduction ? [new TerserPlugin({
                terserOptions: {
                    keep_fnames: true,
                    keep_classnames: true
                }
            })] : [],
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

            new EpiWebpack.DeployToEpiserverPlugin({
                filename: bundle,
                filepath: 'dist/epi-bundle',
                base: epiBaseUrl,
                path: epiDeployPath
            })
        ]
    }

    return webpackConfig;
}