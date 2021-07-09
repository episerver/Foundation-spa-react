// Node.JS
const path = require('path');

// Webpack
const Webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

// Optimizely Webpack Utilities
const Config = require('@episerver/webpack/cjs/util/Config').GlobalConfig;

/**
 * Generate the partial webpack configuration for the Styles and HTML 
 * output.
 * 
 * @param { {[key:string] : string} }     env     Webpack Execution environment variables
 * @param { string }                      bundle  The bundle name that is being created
 * @returns { Partial<Webpack.Configuration> }    The partial Webpack configuration to be merged into the final configuration
 */
 module.exports = (env, bundle) => {

    /** @type {Config} */
    const epiEnv        = env.EPI_ENV || process.env.EPI_ENV;
    const config        = new Config(path.join(__dirname, ".."), env, epiEnv);
    const mode          = config.getEpiEnvironment() === 'development' ? 'development' : 'production';
    const forProduction = mode.toLowerCase() === 'production';

    return {
		module: {
            rules: [
                {
                    test: /\.json$/,
                    sideEffects: false,
                    use: [{
                        loader: './config/JsonLoader',
					}],
					type: 'javascript/auto',
				}
			]
		},
        // Optimize frontend bundling
		optimization: {
			mergeDuplicateChunks: true,
            runtimeChunk: 'single',
            emitOnErrors: false,
            providedExports: true,
            usedExports: true,
			sideEffects: true,
			innerGraph: true,
			realContentHash: true,
			splitChunks: {
				usedExports: true,
				chunks: 'all',
				// maxInitialRequests: 10,
				// maxAsyncRequests: 1000,
				// minSize: 1,
				automaticNameDelimiter: '.',
				cacheGroups: {
                    // Split Node Modules into separate files
					lib: {
						test: /[\\/]node_modules[\\/]/,
						priority: 30,
						name(module, chunks, cacheGroupKey) {
							// get the name. E.g. node_modules/packageName/not/this/part.js
							// or node_modules/packageName
							const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

							// npm package names are URL-safe, but some servers don't like @ symbols
							let cacheGroupSuffix = packageName.replace('@', '').split('-',2)[0];
							if (cacheGroupSuffix == 'react') 
								cacheGroupSuffix = packageName.replace('@', '').split('-').join('.');
							return cacheGroupKey + "." + cacheGroupSuffix;
						},
                        
                    },
					"lib.local": {
						test: /[\\/]lib[\\/](.+?)[\\/]/,
						priority: 1,
						name(module, chunks, cacheGroupKey) {
							// get the name. E.g. lib/packageName/not/this/part.js
							// or lib/packageName

							const packageName = module.context.match(/[\\/]lib[\\/](.*?)([\\/]|$)/)[1];

							// npm package names are URL-safe, but some servers don't like @ symbols
							return `${cacheGroupKey}.${packageName.replace('@', '').split('-',2)[0]}`;
						},
                        
                    },

                    // Keep inline separated
                    /*inline: {
						test: /[\\/]src[\\/](.*?).inline.scss$/,
						name(module, chunks, cacheGroupKey) {
                            const matches = module.identifier().match(/.*[\\\\\\/](.*?).inline.scss/);
                            const chunkName = `${cacheGroupKey}.${ matches[1].toLowerCase() }`;
                            return chunkName;
                        }
                    },*/

                    // Split Application components into separate files, might be needed if you don't provide a loader
					components: {
						test: /[\\/]src[\\/][Cc]omponents[\\/]/,
						priority: 10,
						name(module, chunks, cacheGroupKey) {
							// get the name. E.g. node_modules/packageName/not/this/part.js
                            // or node_modules/packageName
                            const componentId = module.identifier().match(/[\\/]src[\\/][Cc]omponents[\\/](.*)/)[1].split(path.sep).map(x => x.split(".")[0]).join('.');

							//const packageName = module.context.match(/[\\/][Cc]omponents[\\/](.*?)([\\/]|$)/)[1];

							// npm package names are URL-safe, but some servers don't like @ symbols
							return `${cacheGroupKey}.${componentId.toLowerCase().replace('@', '')}`;
                        },
                        reuseExistingChunk: true
					},
                    
                    // Split Application components into separate files, might be needed if you don't provide a loader
					async_components: {
						test: /[\\/]src[\\/][Aa]sync[Cc]omponents[\\/]/,
						priority: 20,
						name(module, chunks, cacheGroupKey) {
							// get the name. E.g. node_modules/packageName/not/this/part.js
                            // or node_modules/packageName
                            const componentId = module.identifier().match(/[\\/]src[\\/][Aa]sync[Cc]omponents[\\/](.*)/)[1].split(path.sep).map(x => x.split(".")[0]).join('.');

							//const packageName = module.context.match(/[\\/][Cc]omponents[\\/](.*?)([\\/]|$)/)[1];

							// npm package names are URL-safe, but some servers don't like @ symbols
							return `${cacheGroupKey}.${componentId.toLowerCase().replace('@', '')}`;
                        },
                        reuseExistingChunk: true
					}
				},
			},
			minimize: forProduction,
			minimizer: forProduction ? [new TerserPlugin({
				terserOptions: {
					ecma: '2020',
					module: true,
					toplevel: true,
					compress: {
						drop_console: true,
						arguments: true,
					}
				}
			})] : []
		}
    }
}
