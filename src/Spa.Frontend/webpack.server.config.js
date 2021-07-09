// Node.JS
const path = require('path');

// Webpack
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const TerserPlugin = require('terser-webpack-plugin');

// Epi Webpack tools
const EpiWebpack = require('@episerver/webpack');

// Configuration
const manifest = require('./manifest.json'); // Application Manifest
const preload = require('./preload.json'); // Preloader configuration

// Webpack config partials
const stylesConfig = require('./config/webpack.module.rules.styles'); // Styles processing
const optimizationConfig = require('./config/webpack.optimization'); // Build optimization
const scriptsConfig = require('./config/webpack.module.rules.scripts') // Scripts processing

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

    /**
     * @type webpack.Configuration
     */
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
                    keep_classnames: true,
					ecma: '2020',
					module: true,
					toplevel: true,
					compress: {
						drop_console: true,
						arguments: true,
					}
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

    

    const outputConfig = merge(
        scriptsConfig(env, bundle), // Script processing
        stylesConfig(env, bundle, true),  // Append SASS/SCSS/CSS processing
        webpackConfig,              // Specific configuration
    );

    return outputConfig;
}