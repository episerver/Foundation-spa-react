// Node.JS
const path = require('path');

// Webpack
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

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
    // Bundle info
    const bundle        = 'app.html.spa';

    // Configs
    /** @type {EpiWebpack.Config} */
    const epiEnv        = env.EPI_ENV || process.env.EPI_ENV;
	const config        = new EpiWebpack.Config(__dirname, env, epiEnv);
    const srcPath       = config.getSourceDir();
    const pubPath       = config.getAssetPath();

    // Environment configs
    const webPath       = config.getWebPath();
    const mode          = config.getEpiEnvironment() === 'development' ? 'development' : 'production';
    const forProduction = mode.toLowerCase() === 'production';
    const epiBaseUrl    = config.getEpiserverURL();
    const epiDeployPath = config.getEnvVariable('EPI_DEPLOY_PATH', '/api/episerver/v3/deploy');
    const outPath       = webPath + 'spaview/' + bundle + '/';
    const distPath      = path.join(__dirname, 'dist', bundle);

    console.log("Starting a "+ ( forProduction ? 'production' : 'development' )+" build");

    const webpackConfig = {
        entry: {
            main: './src/index.tsx',
        },
        context: config.getRootDir(),
        target: 'web',
        mode: mode,
        devtool: forProduction ? 'source-map' : 'inline-source-map',
		output: {
			filename: 'scripts/[name].[contenthash:8].js',
			chunkFilename: 'scripts/[name].[contenthash:8].js',
			path: distPath,
			publicPath: outPath
        },
        resolve: config.getResolveConfig(),
        module: {
            rules: [
                {
                    test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'fonts',
                                publicPath: outPath + 'fonts/'
                            }
                        }
                    ]
                },
                {
                    test: /\.(png|svg|jpg|jpeg)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'images/',
                                publicPath: outPath + 'images/'
                            }
                        }
                    ]
                },
                
            ]
        },
        plugins: [

            // Neither frontend nor backend is running in NodeJS, so define some variables
            new webpack.DefinePlugin(config.getDefineConfig(env)),

            new WebpackManifestPlugin({
                basePath: outPath,
                writeToFileEmit: true,
                seed: manifest
            }),

            new CopyWebpackPlugin(
                {
                    patterns: [
                        {
                            from: pubPath,
                            to: distPath.replace(path.sep, '/')+'/'
                        }
                    ]
                }
            ),

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

    // Inject support for Leaflet package style loading
    /*webpackConfig.resolve.extensions.push('.scss','.css');
    webpackConfig.resolve.alias = { 
        ...webpackConfig.resolve.alias, 
        leaflet_css: path.join(__dirname, "/node_modules/leaflet/dist/leaflet.css"),
        leaflet_marker: path.join(__dirname, "/node_modules/leaflet/dist/images/marker-icon.png"),
        leaflet_marker_2x: path.join(__dirname, "/node_modules/leaflet/dist/images/marker-icon-2x.png"),
        leaflet_marker_shadow: path.join(__dirname, "/node_modules/leaflet/dist/images/marker-shadow.png")
    };*/
    //console.log(webpackConfig.resolve);
    //process.exit(0);

    const outputConfig = merge(
        scriptsConfig(env, bundle),         // Script processing
        optimizationConfig(env, bundle),    // Bundling optimizations
        stylesConfig(env, bundle),          // Append SASS/SCSS/CSS processing
        webpackConfig,                      // Specific configuration
    );

    return outputConfig;
}