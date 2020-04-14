const fs = require('fs');
const https = require('https');
const http = require('http');
const url = require("url");
const path = require("path");
const StringUtils = require('../Util/StringUtils');
const dotenv = require('dotenv');

dotenv.config();
let cwd = process.cwd();
let configFile = path.join(cwd, ".env");

console.log("Starting Episerver Content Cloud model synchronization");
console.log("  - Installation directory: " + process.cwd());
console.log("  - Configuration file: " + configFile);

if (!fs.existsSync(configFile)) {
    console.error( "The configuration file does not exist");
    return;
}

let config = {
    "service": getEnvVariable('EPI_URL','') + "/api/episerver/v3/model",
    "target": path.join(cwd, getEnvVariable('EPI_MODEL_PATH','src/Models/Content'))
};
let targetFolder = config.target;
console.log("  - Using Episerver Running at: " + config.service);
console.log("  - Writing new & updated model files to: " + targetFolder);

if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder, {"recursive": true});
}
targetFolder = fs.realpathSync(targetFolder);

generateContentTypes();

function generateContentTypes() {
    let serviceUrl = url.parse(config.service);
    let prot = (arg1, arg2) => {
        console.error("Unsupported protocol", url);
    };
    prot = serviceUrl.protocol == 'https:' ? https.get : http.get;
   
    prot(serviceUrl, (res) => {
        if (res.statusCode != 200) {
            return;
        }
        let data = "";
        res.on('data', (d) => {
            data += d
        });

        res.on("end", () => {
            list = JSON.parse(data);
            let items = [];
            //First collect names
            for (let idx = 0; idx < list.length; idx++) {
                items.push(list[idx].Name);
            }

            //Then generate files
            for (let idx = 0; idx < list.length; idx++) {
                loadAndWriteContentType(list[idx], items);
            }
        });
    });
}

function loadAndWriteContentType(typeName, allItemNames) {
    let infoUrl = url.parse(config.service + '/' + typeName.Name);
    let prot = (arg1, arg2) => {
        console.error("Unsupported protocol", url);
    };
    prot = infoUrl.protocol == 'https:' ? https.get : http.get;
   
    prot(infoUrl, (res) => {
        if (res.statusCode != 200) {
            return;
        }
        let modelData = "";
        res.on('data', (d) => {
            modelData += d
        });
        res.on("end", () => {
            let modelObj = JSON.parse(modelData);
            writeDefinition(modelObj, allItemNames);
        });
    });
}

function writeDefinition(info, allItemNames) {
    let interfaceName = processInterfaceName(info.Name+"Data");
    let fileName = interfaceName + ".ts";

    //Imports
    let iface = "import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'Episerver/Property'\n";
    iface += "import IContent from 'Episerver/Models/IContent'\n";
    iface += "import ContentLink from 'Episerver/Models/ContentLink'\n";
    iface += "import { ComponentProps } from 'Episerver/EpiComponent'\n\n"

    //Heading
    iface += "/**\n * "+(info.DisplayName ? info.DisplayName : info.Name)+"\n *\n * "+(info.Description ? info.Description : "No Description available.")+"\n *\n * @GUID "+info.GUID+"\n */\n";

    //Actual interface
    iface += "export default interface "+interfaceName+" extends IContent {\n";
    for (var i = 0; i < info.Properties.length; i++) {
        let prop = info.Properties[i];
        let propName = processFieldName(prop.Name);
        if (propName == "contentLink") { continue; } //Do not override IContent props
        iface += "    /**\n     * "+(prop.DisplayName ? prop.DisplayName : prop.Name)+"\n     *\n     * "+(prop.Description ? prop.Description : "No description available")+"\n     */\n";
        iface += "    " + propName + ": " + ConvertTypeToSpaProperty(prop.Type, allItemNames) + "\n\n";

        if (allItemNames.includes(prop.Type)) {
            iface = "import " + prop.Type + "Data from './" + prop.Type + "Data'\n" +iface;
        }
    }
    iface += "}\n\n";
    iface += "/**\n * Convenience interface for componentDidUpdate & componentDidMount methods.\n */\n";
    iface += "export interface " + processInterfaceName(info.Name+"Props") + " extends ComponentProps<"+interfaceName+"> {}\n";

    //Write interface
    let fullTarget = path.join(targetFolder,fileName);
    fs.writeFileSync(fullTarget, iface);
    console.log("    - " + interfaceName + " written to " + fullTarget);
}

function ConvertTypeToSpaProperty(typeName, allItemNames)
{
    switch (typeName) {
        case "Boolean":
            return "BooleanProperty";
        case "Decimal":
        case "Number":
        case "FloatNumber":
            return "NumberProperty";
        case "string":
        case "LongString":
        case "XhtmlString":
        case "Url":
            return "StringProperty";
        case "ContentReference":
        case "PageReference":
            return "ContentReferenceProperty";
        case "ContentReferenceList":
            return "Property<Array<ContentLink>>";
        case "ContentArea":
            return "ContentAreaProperty";
        case "LinkCollection":
            return "LinkListProperty";
        default:
            if (allItemNames.includes(typeName)) {
                return typeName+"Data";
            }
            return "Property<any> // Original type: "+typeName;
    }
}

function processInterfaceName(originalName)
{
    return StringUtils.SafeModelName(originalName);
}

function processFieldName(originalName)
{
    let processedName = originalName;
    processedName = processedName.charAt(0).toLowerCase() + processedName.slice(1);
    return processedName;
}

/**
 * Read a value from the NodeJS Environment
 * 
 * @param {string} key              The name of the environment variable
 * @param {string} defaultValue     The default value
 * @param {object} overrides        Overrides for the environment
 * @returns {string}                The value of the environment variable, or the defaultValue if it evaluates to false
 */
function getEnvVariable(key, defaultValue = null, overrides = undefined) {
    let env = overrides ? Object.assign({}, process.env, overrides) : process.env;
    return env[key] || defaultValue
} 
