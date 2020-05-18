const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const GlobalConfig = require('episerver-webpack/Config');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (env) => {
	const config   = new GlobalConfig(__dirname);
    const srcPath  = config.getSourcePath(env);
    const filePath = config.getSpaPath(env);
    const epiPath  = config.getEpiPath(env);
	const webPath  = config.getWebPath(env);

	const webpackConfig = {
		target: 'web',
		entry: {
			app: path.resolve(__dirname,srcPath,'index.tsx'),
		},
		resolve: config.getResolveConfig(env),
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
			minimize: config.getNodeEnv(env) == 'production',
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
						hmr: config.getNodeEnv() === 'development',
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
			new webpack.DefinePlugin(config.getDefineConfig(env))
		]
	};
	return webpackConfig;
};