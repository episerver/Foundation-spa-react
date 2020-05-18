const loaderUtils = require('loader-utils');
const validateOptions = require('schema-utils');

/**
 * Webpack Empty loader configuration definition
 */
const schema = {
    type: 'object',
    properties: {
    }
};

/**
 * Webpack loader to emit empty resources, used to ignore SCSS file on Server
 * Side Rendering builds of the Episerver SPA
 * 
 * @param   {string}  source    The source of the resource that must be loaded
 * @returns {string}            An empty string
 */
module.exports = (source) => {
    const options = loaderUtils.getOptions(this);
    if (options) {
        validateOptions(schema, options, 'Empty loader');
    }

    return '';
}