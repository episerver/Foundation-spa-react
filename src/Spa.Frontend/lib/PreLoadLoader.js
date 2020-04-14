const loaderUtils = require('loader-utils');
const validateOptions = require('schema-utils');
const glob = require('glob');
const path = require('path');

const schema = {
    type: 'object',
    properties: {
        pattern: {
            type: 'string'
        },
        extension: {
            type: 'string'
        }
    }
};

/**
 *
 */
module.exports = function (source, map, meta) {
    const options = loaderUtils.getOptions(this);
    validateOptions(schema, options, 'PreLoad loader');
    var test = /\@PreLoad\("(.*)"\,"(.*)"\,"(.*)"\)/;
    var matches = source.match(test);
    if (matches) {
        console.log("Found @PreLoad annotation in: "+this.resourcePath)

        //Context
        var toReplace = matches[0];
        var component_path = matches[1];
        var variable = matches[2];
        var component_prefix = matches[3];
        var component_dir = path.resolve(this.context, component_path);
        var files = glob.sync(component_dir + "/" + options.pattern);

        //Debug
        console.log("  - Search pattern: " + component_dir + "/" + options.pattern);
        console.log("  - Variable: "+variable);
        console.log("  - Component prefix: "+component_prefix);

        //Start building script
        var script = [];
        script.push("declare var " + variable + ": any;");
        script.push("try {"+variable+"="+variable+" || [];} catch (e) {"+variable+" = [];}\n");
        var assignments = [];

        //Handle components
        files.forEach((function (file) {
            var import_module = path.basename(file, options.extension);
            var module_path = path.dirname(file);
            var import_path = path.relative(component_dir, module_path).replace(/\\/gi, "/");
            import_path = component_prefix + (import_path ? import_path + "/" + import_module : import_module);
            
            var module_name = path.relative(component_dir, module_path).replace(/\\/gi, "") + import_module;
            script.push("import " + module_name + " from \"" + import_path + "\";");
            assignments.push(variable + "[\"" + import_path + "\"] = " + module_name + ";");
        }).bind(this));

        var inject = "//Start: Injected PreLoad script\n" + script.join("\n") + "\n" + assignments.join("\n") + "\n//End: Injected PreLoad script\n";

        console.log("  - Injected " + files.length + " modules into " + variable + "\n");
        //console.log(script.join("\n"));
        return source.replace(toReplace, inject);
    }

    return source;
}