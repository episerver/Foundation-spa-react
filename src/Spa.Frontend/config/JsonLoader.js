const getOptions = require( 'loader-utils').getOptions;
const validateOptions = require('schema-utils').validate;
const Schema = require('json-schema');
const Webpack = require('webpack');

/**
 * Webpack JSON Loader Configuration schema
 * 
 * @type { Schema.JSONSchema6 }
 */
const NoParseJsonLoadeConfig = {
    type: 'object',
    properties: {
    }
};
/**
 * Webpack JSON Loader Configuration Definition
 * 
 * @typedef NoParseJsonLoadeConfig
 * @type { {} }
 */

/**
 * Webpack loader that build-time validates the JSON and then outputs it as a
 * JavaScript Object (rather then a string, wrapped with a JSON.parse around it)
 * 
 * @type    { Webpack.LoaderDefinitionFunction<NoParseJsonLoadeConfig> }
 * @this    { Webpack.LoaderContext<NoParseJsonLoadeConfig> } The current context
 * @param   {string}  source    The source of the resource that must be loaded
 * @returns {string}            An empty string
 */
const NoParseJsonLoader = function (source) {
    const options = getOptions(this) || {};
    validateOptions(NoParseJsonLoadeConfig, options, { name: 'No Parse JsonLoader'});
    let jsData = undefined;
    try {
        jsData = JSON.stringify(JSON.parse(source));
    } catch (e) {
        throw new Error("Invalid JSON received!");
    }
    return "var jsonData = " + jsData + ";\nmodule.exports = jsonData;";
}
module.exports = NoParseJsonLoader;