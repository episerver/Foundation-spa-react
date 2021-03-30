// Node.JS
const path = require('path');

// Webpack
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

// Epi Webpack tools
const EpiWebpack = require('@episerver/webpack');

// Configuration
const manifest = require('./manifest.json');

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

    const webpackConfig = {
        entry: path.resolve(srcPath,'index.tsx'),
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
                {
                    test: /\.css$/,
                    use: 
                    [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: 'styles'
                            }
                        },
                        {
                            loader: 'css-loader',
                            options: { 
                                sourceMap: true 
                            }
                        }, 
                        'postcss-loader',
                        {
                            loader: 'resolve-url-loader',
                            options: {
                                debug: true,
                                //root: outPath,
                                sourceMap: true
                            }
                        }
                    ],
                },
                {
                    test: /\.(s[ca]ss)$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: 'styles'
                            }
                        }, {
                            loader: 'css-loader',
                            options: { 
                                sourceMap: true 
                            }
                        }, 
                        'postcss-loader',
                        {
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
        // Optimize frontend bundling
		optimization: {
			mergeDuplicateChunks: true,
            runtimeChunk: 'single',
            emitOnErrors: false,
			splitChunks: {
				chunks: 'all',
				maxInitialRequests: 50,
				maxAsyncRequests: 1000,
				minSize: 1,
				automaticNameDelimiter: '.',
				cacheGroups: {
                    // Split Node Modules into separate files
					lib: {
						test: /[\\/]node_modules[\\/]/,
						name(module, chunks, cacheGroupKey) {
							// get the name. E.g. node_modules/packageName/not/this/part.js
							// or node_modules/packageName
							const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

							// npm package names are URL-safe, but some servers don't like @ symbols
							return `${cacheGroupKey}.${packageName.replace('@', '')}`;
						},
                        
                    },
                    
                    // Split Application components into separate files, might be needed if you don't provide a loader
					components: {
						test: /[\\/]src[\\/][Cc]omponents[\\/]/,
						name(module, chunks, cacheGroupKey) {
							// get the name. E.g. node_modules/packageName/not/this/part.js
                            // or node_modules/packageName
                            const componentId = module.identifier().match(/[\\/]src[\\/][Cc]omponents[\\/](.*)/)[1].split(path.sep).map(x => x.split(".")[0]).join('.');

							//const packageName = module.context.match(/[\\/][Cc]omponents[\\/](.*?)([\\/]|$)/)[1];

							// npm package names are URL-safe, but some servers don't like @ symbols
							return `${cacheGroupKey}.${componentId.toLowerCase().replace('@', '')}`;
                        }
					},
                    
                    // Split Application components into separate files, might be needed if you don't provide a loader
					async_components: {
						test: /[\\/]src[\\/][Aa]sync[Cc]omponents[\\/]/,
						name(module, chunks, cacheGroupKey) {
							// get the name. E.g. node_modules/packageName/not/this/part.js
                            // or node_modules/packageName
                            const componentId = module.identifier().match(/[\\/]src[\\/][Aa]sync[Cc]omponents[\\/](.*)/)[1].split(path.sep).map(x => x.split(".")[0]).join('.');

							//const packageName = module.context.match(/[\\/][Cc]omponents[\\/](.*?)([\\/]|$)/)[1];

							// npm package names are URL-safe, but some servers don't like @ symbols
							return `${cacheGroupKey}.${componentId.toLowerCase().replace('@', '')}`;
                        }
					}
				},
			},
			minimize: forProduction,
			minimizer: forProduction ? [new TerserPlugin({})] : []
		},
        plugins: [

            // Neither frontend nor backend is running in NodeJS, so define some variables
            new webpack.DefinePlugin(config.getDefineConfig(env)),

            new HtmlWebpackPlugin({
                template: 'src/index.html',
                title: manifest.name,
                filename: 'index.html',
                packagePath: outPath,
                minify: {
                    removeComments: false,
                    preserveLineBreaks: true,
                    collapseWhitespace: false,
                    collapseBooleanAttributes: true
                }
            }),

            new WebpackManifestPlugin({
                basePath: outPath,
                writeToFileEmit: true,
                seed: manifest
            }),

            new MiniCssExtractPlugin({
                filename: 'styles/[name].[contenthash:8].css',
                chunkFilename: 'styles/[name].[contenthash:8].css',
                ignoreOrder: true
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

    return webpackConfig;
}