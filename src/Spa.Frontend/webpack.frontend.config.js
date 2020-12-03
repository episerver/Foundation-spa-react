const CopyWebpackPlugin = require('copy-webpack-plugin');
const GlobalConfig = require('@episerver/webpack/Config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const DeployToEpiserverPlugin = require('./DeployToEpiserverPlugin');

module.exports = (env) => {
    // Bundle info
    const bundle        = 'app.html.spa';

    //Configs
    /** @type {GlobalConfig} */
	const config        = new GlobalConfig(__dirname, env);
    const srcPath       = path.resolve(__dirname, 'src');

    // Environment configs
    const webPath       = config.getWebPath();
    const mode          = config.getNodeEnv();
    const forProduction = mode.toLowerCase() === 'production';
    const epiBaseUrl    = config.getEnvVariable('EPI_URL');
    const epiDeployPath = config.getEnvVariable('EPI_DEPLOY_PATH', '/api/episerver/v3/deploy');

    const webpackConfig = {
        entry: path.resolve(srcPath,'index.tsx'),
        target: 'web',
        mode: mode,
        devtool: forProduction ? 'source-map' : 'inline-source-map',
		output: {
			filename: 'scripts/[name].[contenthash:8].js',
			chunkFilename: 'scripts/[name].[contenthash:8].js',
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
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'fonts'
                            }
                        }
                    ]
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
                        }, {
                            loader: 'postcss-loader', // Run post css actions
                            options: {
                                postcssOptions: {
                                    plugins: function () { // post css plugins, can be exported to postcss.config.js
                                        return [
                                            require('precss'),
                                            require('autoprefixer')
                                        ];
                                    }
                                }
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

        // Optimize frontend bundling
		optimization: {
			mergeDuplicateChunks: true,
            runtimeChunk: 'single',
            emitOnErrors: false,
			splitChunks: {
				chunks: 'all',
				maxInitialRequests: 1000,
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
						}
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
                title: 'Episerver Foundation Single Page Application',
                filename: 'index.html'
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
                            from: path.join(srcPath,'favicon.ico'),
                            to: 'favicon.ico'
                        }, {
                            from: path.join(srcPath,'robots.txt'),
                            to: 'robots.txt'
                        }, {
                            from: path.join(srcPath,'web.config'),
                            to: 'web.config'
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