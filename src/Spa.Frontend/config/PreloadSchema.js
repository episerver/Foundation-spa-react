// Config check
const SchemaUtils = require('schema-utils');
const JsonSchema = require('json-schema');

/**
 * The configuration schema for the ComponentHTMLPreloadPlugin Webpack plugin.
 * 
 * @type { JsonSchema.JSONSchema6 } 
 */
const PreLoadSchema = {
    type: 'object',
    properties: {
        appId: {
            type: 'string',
            minLength: 1,
            maxLength: 64,
            description: "The identifier of the application container, minimum of 1 chars, max 64 chars",
        },
        components: {
            type: 'array',
            items: {
                type: "string",
                minLength: 1,
                description: "The component to be pre-loaded (absolute, non-relative, reference)"
            },
            description: "The list of components to be pre-loaded into the application",
        }
    },
    required: ['appId']
}

/**
 * @typedef { PreLoadType }
 * @type { { appId: string, components ?: string[] } }
 */


/**
 * Module definition
 */
module.exports = {
    /**
     * JSON Schema definition for the preload file
     */
    Schema: PreLoadSchema,
    
    /**
     * Validate the data from the preload file
     * 
     * @param { * } preload 
     * @returns { preload is PreLoadType }
     */
    validate: (preload) => SchemaUtils.validate(PreLoadSchema, preload, { name: "Preload schema validation"})
}