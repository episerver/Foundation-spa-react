const getOptions = require('loader-utils').getOptions;
const validateOptions = require('schema-utils').validate;
const Schema = require('json-schema');
const Webpack = require('webpack');

/**
 * The name of this loader, as shown in the output
 * 
 * @type { string }
 */
const LoaderName = "ComponentPreloader";

/**
 * Webpack Component PreLoader configuration definition
 * 
 * @typedef ComponentPreloaderConfig
 * @type { { components ?: string[], typeScript ?: boolean } }
 */
/**
 * Webpack Component PreLoader configuration schema
 * 
 * @type { Schema.JSONSchema6 }
 */
const ComponentPreloaderConfig = {
    type: 'object',
    properties: {
        components: {
            type: "array",
            items: {
                type: 'string',
                minLength: 1
            },
            minItems: 1
        },
        typeScript: {
            type: "boolean",
            default: false
        }
    },
    required: []
};

/**
 * Webpack loader that searches for a __doPreload__() call and then takes two actions:
 * 1) Injects an import for each of the components defined in the provided configratuion
 * 2) Replaces the __doPreload__() call with the actual preloading logic, so the entire
 *    preloading is included in the build-time optimizations.
 * 
 * @type    { Webpack.LoaderDefinitionFunction<ComponentPreloaderConfig> }
 * @this    { Webpack.LoaderContext<ComponentPreloaderConfig> } The current context of the Loader
 * @param   {string}  source    The source of the resource that is being loaded by this loader
 * @returns {string}            The sources with the changes of this loader applied
 */
const ComponentPreloader = function(source) {
    /**
     * @type { ComponentPreloaderConfig }
     */
    const options = getOptions(this) || {};
    validateOptions(ComponentPreloaderConfig, options, { name: 'Component Preloader'});
    const components = options.components || [];
    const typeScript = options.typeScript ? true : false;
    
    /**
     * Return immediately if the __doPreload__() method call is not found in
     * this resource.
     */
    const logger = this.getLogger(LoaderName);
    if (!source.includes('__doPreload__()')) 
        return source;

    logger.status(`Injecting component preloading into: ${ this.request }, for ${ components.length } component(s).`);
    if (typeScript)
        logger.status('Using TypeScript syntax');
    else
        logger.status('Using ES2020 syntax');
    /**
     * @type { { key: string}: string }
     */
    let vars = {};

    /**
     * The list of imports to add to the start of the file
     * 
     * @type { string[] }
     */
    let imports = ["// Generated imports of components to be pre-loaded"];

    /**
     * The list of loads to use within the replacement
     * 
     * @type { string[] }
     */
    let loads = [];

    /**
     * The component display names to set
     * 
     * @type { string[] }
     */
    let names = [];

    logger.status("Processing component names");
    components.forEach(compName => {
        let varName = compName.split('/').join('');
        vars[varName] = compName;
    })

    logger.status("Generating code fragments");
    for (const varName in vars) {
        imports.push(`import ${ varName } from '${ vars[varName] }';`);
        names.push(`${ varName }.displayName = ${ varName }.displayName || \"${ vars[varName]}\";`);
        loads.push(`self.PreLoad['${ vars[varName] }'] = ${ varName };`);
    }

    if (typeScript) {
        logger.status("Injecting TypeScript variable declaration");
        imports.unshift("declare global { interface Window { PreLoad ?: { [ componentName: string ] : GeneratedRCT<unknown> } } }");
        imports.unshift("import { ComponentType as GeneratedRCT } from 'react';");
        imports.unshift("// TypeScript definitions for generated code");
    }

    logger.status("Building constructing function replacement from fragments");

    let promise = `new Promise${ typeScript ? "<{ [ componentName: string ] : GeneratedRCT<unknown> }>" : "" }((resolve, reject) => `

    /**
     * The script to replace the dummy method with
     * 
     * @type { string }
     */
    let script = promise + " {\n" + 
        "    try {\n" +
        "        self.PreLoad = self.PreLoad || {};\n" +
        "        " + names.join("\n        ") + "\n" +
        "        " + loads.join("\n        ") + "\n" +
        "    } catch (e) { reject(e); return; }\n" + 
        "    resolve(self.PreLoad);\n" + 
        "})";

    logger.status("Generating new sources");
    source = `${ imports.join("\n") }\n\n${source.replace("__doPreload__()", script)}`;

    //console.log(source);
    //process.exit(0);
    

    return source;
}

module.exports = ComponentPreloader;