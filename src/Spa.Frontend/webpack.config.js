const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const globalConfig = require('./global.config');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (env) => {
    const srcPath = globalConfig.getEnvVariable('SRC_PATH', 'src', env);
    const filePath = globalConfig.getEnvVariable('SPA_PATH', 'Spa', env);
    const epiPath = globalConfig.getEnvVariable('EPI_PATH', '../Foundation', env);
	const webPath = globalConfig.getEnvVariable('WEB_PATH', '/', env);
	
	const fullEnv = env ? Object.assign({}, process.env, env) : process.env;

	const config = {
		target: 'web',
		entry: {
			app: path.resolve(__dirname,srcPath,'index.tsx'),
		},
		resolve: globalConfig.getResolveConfig(env),
		optimization: {
			mergeDuplicateChunks: true,
			runtimeChunk: 'single',
			splitChunks: {
				chunks: 'all',
				maxInitialRequests: Infinity,
				minSize: 0,
				cacheGroups: {
					lib: {
						test: /[\\/]node_modules[\\/]/,
						name(module) {
							return 'lib';
						}
					}
				},
			},
			minimize: fullEnv.NODE_ENV == 'production',
			minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})]
		},
		output: {
			filename: path.join(filePath,'Scripts','[name].js'),
			chunkFilename: path.join(filePath,'Scripts','[name].chunk.js'),
			path: path.resolve(__dirname, epiPath),
			publicPath: webPath
		},
		devtool: 'source-map',
		module: {
			rules: [
			{
				test: /\.(ts|tsx)$/,
				loader: 'ts-loader'
			},{
				enforce: "pre",
				test: /\.js$/,
				loader: "source-map-loader"
			},{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
				{
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: path.join(filePath,'Fonts')
					}
				}
				]
			},{
				test: /\.(s[ca]ss)$/,
				use: [
				{
					loader: MiniCssExtractPlugin.loader,
					options: {
						hmr: fullEnv.NODE_ENV === 'development',
						outputPath: path.join(filePath,'Styles/')
					},
				},{
					loader: 'css-loader',
					options: { 
						sourceMap: true 
					}
				},{
					loader: 'postcss-loader', // Run post css actions
					options: {
						plugins: function () { // post css plugins, can be exported to postcss.config.js
							return [
								require('precss'),
								require('autoprefixer')
							];
						}
					}
				},{
					loader: 'resolve-url-loader',
					options: { 
						sourceMap: true
					}
				},{
					loader: 'sass-loader',
					options: {
						sourceMap: true
					}
				}]
			}]
		},
		plugins: [
			new HtmlWebpackPlugin(
				{
					template: path.resolve(__dirname, srcPath, 'index.html'),
					title: 'Episerver Single Page Application',
					filename: path.join(filePath,'index.html')
				}),
				
			new CopyWebpackPlugin(
				[
					{
						from: path.join(srcPath,'favicon.ico'),
						to: path.join(filePath,'favicon.ico')
					}, {
						from: path.join(srcPath,'robots.txt'),
						to: path.join(filePath,'robots.txt')
					}, {
						from: path.join(srcPath,'web.config'),
						to: path.join(filePath,'web.config')
					}
				]
			),
			
			//Enable extraction of CSS
			new MiniCssExtractPlugin(
				{
					filename: path.join(filePath,'Styles','[name].bundle.css'),
					chunkFilename: path.join(filePath,'Styles','[id].chunck.css'),
					ignoreOrder: true
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
	};
	return config;
};