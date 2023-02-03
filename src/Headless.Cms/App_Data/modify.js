const fs = require('node:fs')
const filePath = './foundation.contentmanifest.json'

const rawData = fs.readFileSync(filePath, { encoding: "utf8"})
const data = JSON.parse(rawData)

for (var i = 0; i < data.contentTypes.length; i++) {
    if (data.contentTypes[i].baseType == "Media" || data.contentTypes[i].baseType == "Image" || data.contentTypes[i].baseType == "Video") {
        data.contentTypes[i] = undefined
        continue
    }

    var propertyIdx = getCategoryPropertyIdx(data.contentTypes[i])
    if (propertyIdx != -1) {
        data.contentTypes[i].properties[propertyIdx] = undefined
        data.contentTypes[i].properties = data.contentTypes[i].properties.filter(x => x)
    }
}
data.contentTypes = data.contentTypes.filter(x => x)

for (var i = 0; i < data.languageBranches.length; i++) {
    if (!data.languageBranches[i].enabled)
    data.languageBranches[i] = undefined
}
data.languageBranches = data.languageBranches.filter(x => x)

fs.writeFileSync(filePath, JSON.stringify(data, undefined, 2), { encoding: "utf8" })


function getCategoryPropertyIdx(contentType)
{
    for (var j = 0; j < contentType.properties.length ; j++)
    {
        if (contentType.properties[j].name == "Categories" && contentType.properties[j].dataType == "PropertyContentReferenceList")
            return j;
    }
    return -1;
}