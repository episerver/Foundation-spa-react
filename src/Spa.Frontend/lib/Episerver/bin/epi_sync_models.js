const fs = require('fs');
const path = require("path");
const StringUtils = require('episerver/Util/StringUtils');
const dotenv = require('dotenv');
const axios = require('axios');

/**
 * Episerver Model Synchronization Job
 */
class EpiModelSync {
    _servicePath = 'api/episerver/v3/model'
    _rootDir = null
    _config = null
    _iContentProps = ["contentLink"];

    /**
     * Create a new instance of the job
     * 
     * @param {string} spaDir       The directory where the SPA is located 
     * @param {string} envFile      The environment file to use as configuration source
     */
    constructor(spaDir, envFile) {
        if (!fs.existsSync(spaDir))  throw "SPA Directory not found";
        if (!fs.existsSync(envFile)) throw ".env File not found";

        this._rootDir = spaDir;
        this._config = dotenv.parse(fs.readFileSync(envFile));
    }

    /**
     * Run the configuration job
     */
    run() {
        console.log('***** Start: Episerver IContent Model Synchronization *****')
        console.log(' - Ensuring models directory exists ('+ this.getModelPath() +')');
        console.log(' - Retrieving content types')
        const me = this;
        this._doRequest(this.getServiceUrl()).then(r => {
            const modelNames = r.map(x => x.Name);
            me.clearModels(modelNames.map(x => me.getModelInterfaceName(x)));
            console.log(' - Start creating/updating model definitions');
            modelNames.forEach(model => me.createModelFile(model, modelNames));
            me.createAsyncTypeMapper(modelNames);
        }).catch(reason => console.log(reason));
    }

    /**
     * Generate a TypeMapper component which enables loading of the types from Episerver
     * 
     * @param {string[]} allItemNames The model names fetched from Episerver
     */
    createAsyncTypeMapper(allItemNames) {
        const mapperFile = path.join(this.getModelPath(), 'TypeMapper.ts');
        let mapper = "import { IContentType } from 'Episerver/Models/IContent';\nimport EpiserverSpaContext from 'Episerver/Spa';\n";
        mapper += "import BaseTypeMapper, { TypeMapperTypeInfo } from 'Episerver/Loaders/BaseTypeMapper'\n;"
        //allItemNames.forEach(x => mapper += "import {"+this.getModelInstanceName(x)+"} from './"+ this.getModelInterfaceName(x)+"';\n")
        mapper += "\nexport default class TypeMapper extends BaseTypeMapper {\n";
        mapper += "  protected map : { [type: string]: TypeMapperTypeInfo } = {\n";
        allItemNames.forEach(x => mapper += "    '" + x + "': {dataModel: '"+this.getModelInterfaceName(x)+"',instanceModel: '" + this.getModelInstanceName(x) + "'},\n");
        mapper += "  }\n";

        mapper += "  protected async doLoadType(typeInfo: TypeMapperTypeInfo) : Promise<IContentType> {\n";
        mapper += "    return import(\n";
        mapper += "    /* webpackInclude: /\\.ts$/ */\n";
        mapper += "    /* webpackExclude: /\\.noimport\\.ts$/ */\n";
        mapper += "    /* webpackChunkName: \"types\" */\n";
        mapper += "    /* webpackMode: \"lazy-once\" */\n";
        mapper += "    /* webpackPrefetch: true */\n";
        mapper += "    /* webpackPreload: false */\n";
        mapper += "    \"./\" + typeInfo.dataModel).then(exports => {\n";
        mapper += "      return exports[typeInfo.instanceModel];\n";
        mapper += "    }).catch(reason => {\n";
        mapper += "      if (EpiserverSpaContext.isDebugActive()) {\n";
        mapper += "        console.error(`Error while importing ${typeInfo.instanceModel} from ${typeInfo.dataModel} due to:`, reason);\n";
        mapper += "      }\n";
        mapper += "      return null;\n";
        mapper += "    });\n";
        mapper += "  }\n";

        mapper += "}\n";

        fs.writeFile(mapperFile, mapper, () => {
            console.log(' - Written type mapper');
        });
    }

    /**
     * Create a model file for the specified type
     * 
     * @protected
     * @param {string}      typeName 
     * @param {string[]}    allItemNames 
     */
    createModelFile(typeName, allItemNames) {
        //console.log('   - Fetching model definition for '+typeName);
        const me = this;
        this._doRequest(this.getServiceUrl(typeName)).then(info => {
            const interfaceName = me.getModelInterfaceName(info.Name);
            const propsInterfaceName = me.getComponentPropertiesInterfaceName(info.Name);
            const instanceName = me.getModelInstanceName(info.Name);
            const fileName = interfaceName + ".ts";

            //Imports
            let iface = "import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'episerver/Property'\n";
            iface += "import IContent, { BaseIContent } from 'episerver/Models/IContent'\n";
            iface += "import ContentLink from 'episerver/Models/ContentLink'\n";
            iface += "import { ComponentProps } from 'episerver/EpiComponent'\n\n"

            //Heading
            iface += "/**\n * "+(info.DisplayName ? info.DisplayName : info.Name)+"\n *\n * "+(info.Description ? info.Description : "No Description available.")+"\n *\n * @GUID "+info.GUID+"\n */\n";

            //Actual interface
            iface += "export default interface "+interfaceName+" extends IContent {\n";
            info.Properties.forEach(prop => {
                let propName = me.processFieldName(prop.Name);
                if (!me._iContentProps.includes(propName)) {
                    iface += "    /**\n     * "+(prop.DisplayName ? prop.DisplayName : prop.Name)+"\n     *\n     * "+(prop.Description ? prop.Description : "No description available")+"\n     */\n";
                    iface += "    " + propName + ": " + me.ConvertTypeToSpaProperty(prop.Type, allItemNames) + "\n\n";

                    if (allItemNames.includes(prop.Type)) {
                        iface = "import " + prop.Type + "Data from './" + prop.Type + "Data'\n" +iface;
                    }
                }
            });
            iface += "}\n\n";

            //Convenience interface
            iface += "/**\n * Convenience interface for componentDidUpdate & componentDidMount methods.\n */\n";
            iface += "export interface " + propsInterfaceName + " extends ComponentProps<"+interfaceName+"> {}\n\n";

            //Instance type
            iface += "export class " + instanceName + " extends BaseIContent<" + interfaceName + "> implements " + interfaceName + " {\n";
            iface += "    protected _typeName : string = \""+info.Name+"\";\n"
            iface += "    /**\n     * Map of all property types within this content type.\n     */\n"
            iface += "    protected _propertyMap : { [propName: string]: string } = {\n";
            info.Properties.forEach(prop => {
                let propName = me.processFieldName(prop.Name);
                iface += "        '"+propName+"': '"+prop.Type+"',\n"
            });
            iface += "    }\n\n"
            info.Properties.forEach(prop => {
                let propName = me.processFieldName(prop.Name);
                if (!me._iContentProps.includes(propName)) {
                    iface += "    /**\n     * "+(prop.DisplayName ? prop.DisplayName : prop.Name)+"\n     *\n     * "+(prop.Description ? prop.Description : "No description available")+"\n     */\n";
                    iface += "    public " + propName + ": " + me.ConvertTypeToSpaProperty(prop.Type, allItemNames) + ";\n\n";
                }
            });
            iface += "}\n";

            //Write interface
            const fullTarget = path.join(me.getModelPath(), fileName);
            fs.writeFile(fullTarget, iface, () => {
                console.log("   - " + interfaceName + " written to " + fullTarget);
            });
        });
    }

    /**
     * Convert the reported model type to a TypeScript type
     * 
     * @protected
     * @param {string}      typeName        The name of the type
     * @param {string[]}    allItemNames    The list of types in Episerver (for property blocks)
     */
    ConvertTypeToSpaProperty(typeName, allItemNames)
    {
        switch (typeName) {
            case "Boolean":
                return "BooleanProperty";
            case "Decimal":
            case "Number":
            case "FloatNumber":
                return "NumberProperty";
            case "String":
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

    /**
     * Remove all models from the models folder, except thos explicitly kept
     * 
     * @protected
     * @param {string[]} keep The model names to keep in the output folder
     */
    clearModels(keep) {
        console.log(' - Cleaning model directory');
        const modelPath = this.getModelPath();
        const files = fs.readdirSync(modelPath);
        files.forEach(file => {
            const name = path.parse(file).name;
            if (name != "TypeMapper" && keep && !keep.includes(name)) {
                console.log('  - Removing old model: ', name)
                fs.unlinkSync(path.join(modelPath, file));
            }
        });
    }

    /**
     * Build the service path within Episerver to fetch the model
     * 
     * @protected
     * @param {string} modelName The name of the model
     * @returns {string}
     */
    getServiceUrl(modelName) {
        return this._servicePath + (modelName ? '/'+modelName : '');
    }

    /**
     * Get (and create if needed) the path where the models must be stored
     * 
     * @protected
     * @returns {string}
     */
    getModelPath() {
        if (!this._config.EPI_MODEL_PATH) {
            throw new 'Episerver models directory not set';
        }
        const modelPath = path.join(this._rootDir, this._config.EPI_MODEL_PATH);
        if (!fs.existsSync(modelPath)) {
            fs.mkdirSync(modelPath, {"recursive": true});
        }
        return modelPath;
    }

    /**
     * Generate the TypeScript interface name
     * 
     * @protected
     * @param {string} modelName    The name of the model in Episerver
     * @returns {string}
     */
    getModelInterfaceName(modelName) {
        return StringUtils.SafeModelName(modelName) + 'Data';
    }

    getModelInstanceName(modelName) {
        return StringUtils.SafeModelName(modelName) + 'Type';
    }

    /**
     * Generate the TypeScript interface name
     * 
     * @protected
     * @param {string} modelName    The name of the model in Episerver
     * @return {string}
     */
    getComponentPropertiesInterfaceName(modelName) {
        return StringUtils.SafeModelName(modelName) + 'Props';
    }


    processFieldName(originalName)
    {
        let processedName = originalName;
        processedName = processedName.charAt(0).toLowerCase() + processedName.slice(1);
        return processedName;
    }

    _doRequest(url) {
        return axios.request({
            method: 'get',
            baseURL: this._config.EPI_URL,
            url: url,
            headers: {
                Authorization: 'Bearer '+(this._config.EPI_MODEL_DEV_KEY ? this._config.EPI_MODEL_DEV_KEY : '-'),
                Accept: 'application/json'
            }
        }).catch(reason => {
            console.log('Error while fetching (url, reason)', url, reason);
            return null;
        }).then(response => {
            return response.data;
        });
    }
}


let cwd = process.cwd();
let configFile = path.join(cwd, ".env");
const sync = new EpiModelSync(cwd, configFile)
sync.run();


