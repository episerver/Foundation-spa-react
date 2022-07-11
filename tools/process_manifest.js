#!/bin/node
const fs = require('fs')
const path = require('path')
const cwd = process.cwd()

const apiManifest = "foundation.contentmanifest.api.json"
const manifest = "foundation.contentmanifest.json"

const apiManifestFile = path.join(cwd, apiManifest)
const manifestFile = path.join(cwd, manifest)

process.stdout.write(`Working in:  ${ cwd }\n`)
process.stdout.write(`Input file:  ${ apiManifestFile }\n`)
process.stdout.write(`Output file: ${ manifestFile }\n`)

// Start handling
fs.readFile(apiManifestFile, (err, data) => {
    if (err) throw err
    processApiManifest(JSON.parse(data))
});

// First call-back, to process actual manifest
function processApiManifest(data)
{
    process.stdout.write("\nFiltering content types:\n")

    data.contentTypes = (data.contentTypes ?? []).filter(ct => {
        const ctName = ct.name
        if (ctName.substring(ctName.length - 12) === "ElementBlock") {
            process.stdout.write(` - Removing Optimizely Form element: ${ ctName }\n`)
            return false
        }
        
        if (ctName === 'FormStepBlock' || ctName === 'FormContainerBlock') {
            process.stdout.write(` - Removing Optimizely Forms container: ${ ctName }\n`)
            return false
        }

        if (ctName == 'StandardCategory') {
            process.stdout.write(` - Removing CMS Category: ${ ctName }\n`)
            return false
        }
		
        if (ctName.substring(ctName.length - 8) === "Settings") {
            process.stdout.write(` - Removing Foundation Settings Model: ${ ctName }\n`)
            return false
        }

        //process.stdout.write(` - Kept ${ ctName }\n`)
        return true
    })

    /*data.contentTypes = data.contentTypes.map(x => {
        const oldPropCount = (x.properties ?? []).length
        x.properties = (x.properties ?? []).filter(p => p.name !== "Description")
        const newPropCount = (x.properties ?? []).length

        if (oldPropCount != newPropCount)
            process.stdout.write(` - ${ x.name } went from ${ oldPropCount } to ${ newPropCount } properties\n`)
        return x
    })*/

    fs.writeFile(manifestFile, JSON.stringify(data, undefined, undefined), () => {
        process.stdout.write("\nDone!\n")
        process.exit(0)
    })
}