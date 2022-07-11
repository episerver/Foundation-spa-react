#!/usr/bin/env node
const fs = require('fs')
const glob = require('glob')
const path = require('path')

const requireReplacer = {
    /**
     * Method to update require statement if needed
     * 
     * @param {string} statement 
     * @param {string} module 
     * @returns {string}
     */
    replacer: (statement, module) =>
    {
        const importPath = module.split('/')
        if (importPath[0].toLowerCase() === '@optimizely' && importPath.length >= 3 && !module.endsWith('.cjs')) {
            process.stdout.write(`   - Rewriting import of ${ module } to CJS import\n`)
            return statement.replace(module, module + '.cjs')
        }
        if ((importPath[0] == "." || importPath[0] == "..") && importPath.length >= 2 && !module.endsWith('.cjs'))
        {
            process.stdout.write(`   - Rewriting import of ${ module } to CJS import\n`)
            return statement.replace(module, module + '.cjs')
        }
        if ((importPath[0] == "." || importPath[0] == "..") && importPath.length == 1)
        {
            process.stdout.write(`   - Rewriting import of ${ module } to CJS import\n`)
            return statement.replace(module,`${ module }/index.cjs`)
        }
        return statement
    },

    /**
     * The regex to find all require statements
     * 
     * @type {RegExp}
     */
    regex: /require\([\"\'](.*)[\"\']\)/ig
}

process.stdout.write(`Mixed mode module processing for CommonJS (for modules that default to ESModule)\n`)

const globPattern = path.join(process.cwd(), process.argv[2] ?? '*.cjs')
const files = glob.sync(globPattern);
for (const file of files) {
    process.stdout.write(`\n - Processing file: ${ file }\n`)
    const body = fs.readFileSync(file).toString()
    const newBody = body.replaceAll(requireReplacer.regex, requireReplacer.replacer)
    fs.writeFileSync(file, newBody)
}