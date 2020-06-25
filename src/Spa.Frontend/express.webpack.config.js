const CopyWebpackPlugin = require('copy-webpack-plugin');
const GlobalConfig = require('@episerver/webpack/Config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

module.exports = (env) => {

    /** @type {GlobalConfig} */
	const config        = new GlobalConfig(__dirname, env);
    const srcPath       = path.resolve(__dirname, config.getSourcePath());
    const srvPath       = path.resolve(__dirname, config.getExpressPath());
    const webPath       = config.getWebPath();
    const distPath      = path.resolve(__dirname, config.getEnvVariable('EXPRESS_TARGET_PATH','dist'));
    const mode          = config.getNodeEnv();
    const outPrefix     = '';
    const forProduction = mode.toLowerCase() === 'production';

    console.log('Starting Express ' + mode.toLowerCase() + ' build');
    console.log('  - Building web application from: ' + srcPath);
    console.log('  - Building server side rendering from: ' + srvPath);
    console.log('  - Writing files to: '+ path.resolve(distPath, outPrefix));
    console.log('  - Assuming site running at (relative to domain): ' + webPath);
    console.log('');

    const globalConfig = {
        target: 'web',
        mode: mode,
        devtool: forProduction ? 'source-map' : 'inline-source-map',
		output: {
			filename: forProduction ? 'Scripts/[name].[contenthash:8].js' : 'Scripts/[name].js',
			chunkFilename: forProduction ? 'Scripts/[name].chunk.[contenthash:8].js' : 'Scripts/[name].chunk.js',
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
                            allowTsInNodeModules: true
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
                }
            ]
        }
    }

    const frontConfig = {
        entry: path.join(srcPath, 'index.tsx'),

        // Optimize frontend bundling
		optimization: {
			mergeDuplicateChunks: true,
            runtimeChunk: 'single',
            noEmitOnErrors: true,
			splitChunks: {
				chunks: 'all',
				maxInitialRequests: 25,
				maxAsyncRequests: 10,
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
                    
                    // Split Application components into separate files
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
			minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})]
		},
        module: {
            rules: [
                {
                    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'Fonts'
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
                                hmr: true,
                                outputPath: 'Styles'
                            }
                        }, {
                            loader: 'css-loader',
                            options: { 
                                sourceMap: true 
                            }
                        }, {
                            loader: 'postcss-loader', // Run post css actions
                            options: {
                                plugins: function () { // post css plugins, can be exported to postcss.config.js
                                    return [
                                        require('precss'),
                                        require('autoprefixer')
                                    ];
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
        plugins: [

            new HtmlWebpackPlugin({
                template: path.join(srcPath,'index.html'),
                title: 'Episerver Foundation Single Page Application',
                filename: 'index.html'
            }),

            new MiniCssExtractPlugin({
                filename: 'Styles/[name].css',
                chunkFilename: 'Styles/[name].chunk.css',
                ignoreOrder: true
            }),

            new CopyWebpackPlugin([
                {
                    from: path.join(srcPath,'favicon.ico'),
                    to: 'favicon.ico'
                }, {
                    from: path.join(srcPath,'robots.txt'),
                    to: 'robots.txt'
                }
            ]),

            // The frontend doesn't run in Node, so replace the environment variables in the build
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(mode),
                'process.env.DEBUG': JSON.stringify(forProduction ? 'false' : 'true'),
                'process.env.EPI_URL': JSON.stringify(config.getEpiserverURL()),
                'process.env.WEB_PATH': JSON.stringify(config.getWebPath())
            })
        ],
    }

    const backConfig = {
        target: 'node',
        entry: path.join(srvPath, 'server.ts'),
        externals: [nodeExternals({
            whitelist: [
                /^\@episerver\// //The library is currently distributed as TypeScript, so must be bundled
            ]
        })],
        node: {
            global: false,
            __filename: false,
            __dirname: false,
        },
        module: {
            rules: [
                {
                    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [{ loader: '@episerver/webpack/EmptyLoader' }]
                }, {
                    test: /\.(s[ca]ss)$/,
                    use: [{ loader: '@episerver/webpack/EmptyLoader' }]
                }
            ]
        },
        output: {
            filename: 'server.[name].js',
            chunkFilename: forProduction ? 'server.[name].chunk.[contenthash:8].js' : 'server.[name].chunk.js'
        }
    }

    if (!forProduction) {
        backConfig.plugins = backConfig.plugins || [];
        backConfig.plugins.push(new CopyWebpackPlugin([
            {
                from: path.join(__dirname,'.env'),
                to: ''
            }
        ]));
    }

    const webpackConfig = [ merge(globalConfig, frontConfig), merge(globalConfig, backConfig)];
    return webpackConfig;
}