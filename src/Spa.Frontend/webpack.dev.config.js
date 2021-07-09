const webpack = require('webpack');
const { merge } = require('webpack-merge');
const Config = require('@episerver/webpack/cjs/util/Config').GlobalConfig;
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

// Configuration
const manifest = require('./manifest.json');
const scriptsConfig = require('./config/webpack.module.rules.scripts'); // Scripts processing
const stylesConfig = require('./config/webpack.module.rules.styles'); // Styles processing
const optimizationConfig = require('./config/webpack.optimization');

module.exports = (env) => {
    // Bundle info
    const bundle        = 'app.html.spa';

    //Configs
	const config        = new Config(__dirname, env, process.env.EPI_ENV);
    const pubPath       = config.getAssetDir();
    const distPath      = config.getDistDir();

    // Environment configs
    const webPath       = config.getWebPath() + 'spaview/' + bundle + '/';
    const mode          = config.getEpiEnvironment() === 'development' ? 'development' : 'production';
    const forProduction = mode.toLowerCase() === 'production';
    const outPath       = webPath;

    /**
     * @type { webpack.Configuration } The specific bit of the webpack configuration
     */
    const webpackConfig = {
        entry: {
            main: './src/index.tsx',
        },
        context: config.getRootDir(),
        target: 'web',
        mode: mode,
        devtool: forProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            /* publicPath: webPath */
            contentBase: [pubPath, distPath],
            contentBasePublicPath: [config.getWebPath(), config.getWebPath() + 'spaview/'],
            compress: true,
            port: 9000,
            public: config.getEnvVariable('EPI_SPA_DOMAIN', 'localhost'),
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
                    test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                    sideEffects: false,
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
                    sideEffects: false,
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
                }
            ]
        },
        plugins: [

            // Neither frontend nor backend is running in NodeJS, so define some variables
            new webpack.DefinePlugin(config.getDefineConfig(env)),

            new WebpackManifestPlugin({
                fileName: "manifest.json",
                basePath: outPath,
                writeToFileEmit: true,
                seed: manifest
            })
        ]
    }

    /**
     * @type { webpack.Configuration } The final webpack configuration
     */
    const outputConfig = merge(
        scriptsConfig(env, bundle),         // Scripts processing
        optimizationConfig(env, bundle),    // Bundling optimizations
        stylesConfig(env, bundle),          // Append SASS/SCSS/CSS processing
        webpackConfig,                      // Specific configuration
    );

    //console.log(outputConfig.module.rules.map(x => x.test));
    //console.log(outputConfig.plugins);
    //console.log(srcPath);
    //console.log(outputConfig.context);
    //console.log(outputConfig.entry);
    //console.log(outputConfig.optimization);
    //process.exit(0);

    return outputConfig;
}