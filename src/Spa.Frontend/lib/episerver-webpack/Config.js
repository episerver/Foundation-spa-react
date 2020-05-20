const path = require('path');
const dotenv = require('dotenv');

class GlobalConfig {
    /**
     * Stored root directory of the SPA
     * 
     * @private
     * @var string
     */
    _rootDir = null;
    
    constructor(rootDir) {
        this._rootDir = rootDir;
        dotenv.config({path: this.__dirname});
    }

    getServerPath(localEnvironment = {}, defaultValue = 'server')
    {
        return this.getEnvVariable('SERVER_PATH', defaultValue, localEnvironment);
    }

    getSpaPath(localEnvironment = {}, defaultValue = 'Spa')
    {
        return this.getEnvVariable('SPA_PATH', defaultValue, localEnvironment);
    }

    getEpiPath(localEnvironment = {}, defaultValue = '../Foundation')
    {
        return this.getEnvVariable('EPI_PATH', defaultValue, localEnvironment);
    }

    getWebPath(localEnvironment = {}, defaultValue = '/')
    {
        return this.getEnvVariable('WEB_PATH', defaultValue, localEnvironment);
    }

    getLibPath(localEnvironment = {}, defaultValue = 'lib')
    {
        return this.getEnvVariable('LIB_PATH', defaultValue, localEnvironment);
    }

    getSourcePath(localEnvironment = {}, defaultValue = 'src')
    {
        return this.getEnvVariable('SRC_PATH', defaultValue, localEnvironment);
    }

    getExpressPath(localEnvironment = {}, defaultValue = 'express')
    {
        return this.getEnvVariable('EXPRESS_PATH', defaultValue, localEnvironment);
    }

    getEpiserverFormsDir(localEnvironment = {}, defaultValue = '../Foundation/Scripts/EPiServer.ContentApi.Forms')
    {
        return this.getEnvVariable('EPI_FORMS_PATH', defaultValue, localEnvironment)
    }

    getNodeEnv(localEnvironment = {}, defaultValue = 'development')
    {
        return this.getEnvVariable("NODE_ENV", defaultValue, localEnvironment);
    }

    isEpiserverFormsEnabled(localEnvironment = {}, defaultValue = 'false') {
        return this.getEnvVariable('EPI_FORMS_INCLUDE', defaultValue, localEnvironment).toLowerCase() == 'true';
    }

    /**
     * Generate the resolve configuration for Webpack
     * 
     * @public
     * @param   {object}    envOverrides    The Environment overrides through the Webpack CLI
     * @returns {object}    The Resolve configuration for Webpack
     */
    getResolveConfig(envOverrides = undefined) {
        const libDir = path.resolve(this._rootDir, this.getLibPath(envOverrides));
        const srcDir = path.resolve(this._rootDir, this.getSourcePath(envOverrides));
        const serverDir = path.resolve(this._rootDir, this.getServerPath(envOverrides));
        const expressDir = path.resolve(this._rootDir, this.getExpressPath(envOverrides));

        const resolveConfig = {
            alias: {
                "app": srcDir,
                "app.server": serverDir,
                "app.express": expressDir
            },
            extensions: ['.js', '.jsx', '.json', '.tsx', '.ts']
        };

        if (this.isEpiserverFormsEnabled()) {
            const formsDir = path.resolve(__dirname,  this.getEpiserverFormsDir(envOverrides));
            resolveConfig.alias["EPiServer.ContentApi.Forms"] = formsDir;
        }

        return resolveConfig;
    }

    getDefineConfig(envOverrides = {})
    {
        return {
            'process.env.NODE_ENV': JSON.stringify(this.getNodeEnv(envOverrides)),
            'process.env.DEBUG': JSON.stringify(this.getEnvVariable("DEBUG","1",envOverrides)),
            'process.env.EPI_URL': JSON.stringify(this.getEnvVariable("EPI_URL","/",envOverrides)),
            'process.env.WEB_PATH': JSON.stringify(this.getWebPath())
        }
    }

    /**
     * Read a value from the NodeJS Environment
     * 
     * @public
     * @param {string} key              The name of the environment variable
     * @param {string} defaultValue     The default value
     * @param {object} overrides        Overrides for the environment
     * @returns {string}                The value of the environment variable, or the defaultValue if it evaluates to false
     */
    getEnvVariable(key, defaultValue = null, overrides = undefined) {
        let env = overrides ? Object.assign({}, process.env, overrides) : process.env;
        return env[key] || defaultValue
    } 
}

module.exports = GlobalConfig;