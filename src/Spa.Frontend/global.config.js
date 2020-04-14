const path = require('path');
const dotenv = require('dotenv');

//Parse .env file and load into context
dotenv.config();

//Global configuration helper
module.exports = {
    /**
     * Generate the resolve configuration for Webpack
     * 
     * @param   {object}    envOverrides    The Environment overrides through the Webpack CLI
     * @returns {object}    The Resolve configuration for Webpack
     */
    getResolveConfig(envOverrides = undefined) {
        const libDir = path.resolve(__dirname, this.getEnvVariable('LIB_PATH', 'lib', envOverrides));
        const srcDir = path.resolve(__dirname, this.getEnvVariable('SRC_PATH', 'src', envOverrides));
        const serverDir = path.resolve(__dirname, this.getEnvVariable('SERVER_PATH', 'server', envOverrides));
        const expressDir = path.resolve(__dirname, this.getEnvVariable('EXPRESS_PATH', 'express', envOverrides));

        const resolveConfig = {
            alias: {
                "app": srcDir,
                "app.server": serverDir,
                "app.express": expressDir,
                "Episerver": path.resolve(libDir, 'Episerver')
            },
            extensions: ['.js', '.jsx', '.json', '.tsx', '.ts']
        };

        const enableForms = this.getEnvVariable('EPI_FORMS_INCLUDE', 'false', envOverrides);
        if (enableForms.toLowerCase() == "true") {
            const formsDir = path.resolve(__dirname,  this.getEnvVariable('EPI_FORMS_PATH', '../Foundation/Scripts/EPiServer.ContentApi.Forms', envOverrides));
            resolveConfig.alias["EPiServer.ContentApi.Forms"] = formsDir;
        }

        return resolveConfig;
    },

    /**
     * Read a value from the NodeJS Environment
     * 
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