const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const EpiWebpackAddOn = require('@episerver/webpack');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

// Configuration
const manifest = require('./manifest.json');

module.exports = (env) => {
    // Bundle info
    const bundle        = 'app.html.spa';

    //Configs
    /** @type {EpiWebpackAddOn.Config} */
	const config        = new EpiWebpackAddOn.Config(__dirname, env, process.env.EPI_ENV);
    const srcPath       = config.getSourceDir();
    const pubPath       = config.getAssetDir();
    const distPath      = config.getDistDir();

    // Environment configs
    const webPath       = config.getWebPath() + 'spaview/' + bundle + '/';
    const mode          = config.getEpiEnvironment() === 'development' ? 'development' : 'production';
    const forProduction = mode.toLowerCase() === 'production';
    const outPath       = webPath;

    const webpackConfig = {
        entry: path.resolve(srcPath,'index.tsx'),
        target: 'web',
        mode: mode,
        devtool: forProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            /* publicPath: webPath */
            contentBase: [pubPath, distPath],
            contentBasePublicPath: [config.getWebPath(), config.getWebPath() + 'spaview/'],
            compress: true,
            port: 9000,
            bonjour: true,
            historyApiFallback:  {
                rewrites: [
                    { from: /^\//, to: webPath + '/index.html' },
                ]
            },
            serveIndex: true
        },
		output: {
			filename: 'scripts/[name].[contenthash:8].js',
			chunkFilename: 'scripts/[name].[contenthash:8].js',
			path: distPath,
			publicPath: webPath
        },
        resolve: config.getResolveConfig({
            extensions: ['.css']
        }),
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
                        loader: EpiWebpackAddOn.PreLoadLoader,
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
                                outputPath: 'fonts/',
                                publicPath: webPath + 'fonts/'
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
                                publicPath: webPath + 'images/'
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
                        },
                        {
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
                },
                {
                    test: /\.css$/,
                    use: [ 
                    {
                        loader: 'style-loader',
                    }, {
                        loader: 'css-loader'
                    } ]
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
            })
        ]
    }

    return webpackConfig;
}