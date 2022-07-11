import type { ComponentType } from 'react'
import type { ComponentLoader, DynamicProps } from "./types"

declare const __webpack_modules__ : Record<string, any>
declare const __webpack_require__ : {
    (id:string): any
    m: Record<string, any>
}

function isServer() : boolean 
{
    try {
        return (window && window.location && window.addEventListener) ? false : true
    } catch {
        return true
    }
}
function isWebpack() : boolean 
{
    try {
        return typeof(__webpack_modules__) != 'undefined'
    } catch {
        return true
    }
}
const debug = false; //process.env['NODE_ENV'] == 'development'
const componentPromises : Record<string, Promise<any>> = {}

/**
 *  Not sure what the intention of this code is.... 
 */
type AsyncLoader = (req: string) => Promise<any>
type WebpackModule = { exports ?: AsyncLoader & { keys: () => string[] } }

/**
 * Default implementation of the component loader, assuming all
 * components are accessible within: @components/.... to allow
 * for dynamic import building
 */
export class DefaultComponentLoader implements ComponentLoader
{
    public readonly prefix : string = "@components/cms"

    public get AsyncComponents() : Record<string, Promise<any>> 
    {
        return componentPromises;
    }

    public get R() : any 
    {
        return __webpack_require__
    }

    public get M() : any 
    {
        return __webpack_modules__
    }

    public constructor()
    {
        if (debug) console.log("Default-Loader.newInstance")

        if (!isWebpack())
            throw new Error('The DefaultComponentLoader requires Webpack 5+');

        // Pre-fetch & validate the components
        if(isServer()) {
            Object.keys(__webpack_modules__).forEach(k => {
                if (k.indexOf(" ") > 0) { // Dynamic imports have a space, but get resolved, so we don't know where @components/cms points to
                    let dynamicModule : WebpackModule = {}
                    __webpack_modules__[k](dynamicModule, null, __webpack_require__)
                    if (!dynamicModule.exports) return
                    const exports = dynamicModule.exports
                    const keys = exports.keys()
                    if (debug) console.log(`Default-Loader.newInstance: PreFetched ${ keys.length } modules for dynamic import ${ k }`)
                }
            })
        } else {
            try {
                (window as any).__dcl__ = this;
            } catch (e) {}
        }
    }

    public buildComponentImport(path: string[], prefix ?: string, tag : string = "") 
    {
        // Process the path
        if (path.slice(-1)[0] === "Content")
            path = path.slice(0, -1)

        // Standardize to lowercase
        path = path.map((p, i) => i < (path.length - 1) ? p.toLowerCase() : p)

        // Process prefix
        prefix = prefix?.toLowerCase()
        if (prefix && path[0] != prefix)
            path.unshift(prefix)

        return path.join('/') + tag;
    }

    public dynamicSync<P = DynamicProps>(path: string[], prefix?: string, tag: string = ""): ComponentType<P>
    {
        const dynamicModule = this.dynamicModuleSync<{default ?: ComponentType<P>}>(path, prefix, tag)
        if (!dynamicModule)
            throw new Error(`Module ${ this.buildComponentImport(path, prefix, tag) } cannot be resolved synchronously`)
        if (!dynamicModule?.default)
            throw new Error(`Module ${ this.buildComponentImport(path, prefix, tag) } does not have a default export`)
        return dynamicModule.default
    }

    public async dynamicAsync<P = DynamicProps>(path: string[], prefix?: string, tag: string = "") : Promise<ComponentType<P>>
    {
        const dynamicModule = await this.dynamicModuleAsync<{default ?: ComponentType<P>}>(path, prefix, tag)
        if (!dynamicModule?.default)
            throw new Error(`Module ${ this.buildComponentImport(path, prefix, tag) } does not have a default export (1)`)

        if (!(dynamicModule.default as unknown as Promise<any>).then)
            return dynamicModule.default

        const returnValue = await (dynamicModule.default as unknown as Promise<any>)
        if (!returnValue.default)
            throw new Error(`Module ${ this.buildComponentImport(path, prefix, tag) } does not have a default export (2)`)

        return returnValue.default
    }

    public dynamicModuleSync<MT>(path: string[], prefix?: string, tag: string = "") : MT | undefined
    {
        //if (!isServer()) return undefined
        const dynamicPath = this.buildComponentImport(path, prefix, tag)
        if (typeof(dynamicPath) !== 'string' || dynamicPath.length < 1) return undefined

        if (debug) console.log("Default-Loader.dynamicModuleSync", `@components/cms/${dynamicPath}`)
        //@ts-expect-error resolveWeak is a non-standard function introduced by WebPack
        const moduleId = require.resolveWeak(`@components/cms/${dynamicPath}`)
        if (isServer() && __webpack_require__.m[moduleId]) {
            const exports : MT = {} as MT
            __webpack_require__.m[moduleId].call(exports, {}, exports, __webpack_require__)
            return exports
        } else {
            const mod = __webpack_require__(moduleId)
            if (debug) console.log("Default-Loader.dynamicModuleSync (Browser)", `@components/cms/${dynamicPath}`, mod)
            return mod;
        }
        
        //throw new Error(`Module "@components/cms/${dynamicPath}" cannot be loaded synchronously`)
    }

    public async dynamicModuleAsync<MT = any>(path: string[], prefix?: string, tag: string = "")
    {
        const dynamicPath = this.buildComponentImport(path, prefix, tag)
        if (typeof(dynamicPath) !== 'string' || dynamicPath.length < 1) return undefined

        if (Object.getOwnPropertyNames(componentPromises).includes(dynamicPath) && typeof(componentPromises[dynamicPath].then) === 'function')
        {
            return componentPromises[dynamicPath];
        }

        if (debug) console.log("Default-Loader.dynamicModuleAsync", `@components/cms/${dynamicPath}`, Object.getOwnPropertyNames(componentPromises))
        const dynamicModule : Promise<MT> = import(
            /* webpackInclude: /\.(js|json|jsx|ts|tsx)$/ */
            /* webpackExclude: /\.(md|css)$/ */
            /* webpackMode: "eager" */
            /* webpackPrefetch: true */
            `@components/cms/${dynamicPath}`
        ).then(m => {
            (dynamicModule as Promise<MT> & {result?: MT}).result = m;
            return m
        })
        componentPromises[dynamicPath] = dynamicModule;
        return await dynamicModule
    }

    public tryDynamicSync<P = DynamicProps>(path: string[], prefix?: string, tag: string = "") : ComponentType<P> | undefined
    {
        try {
            return this.dynamicSync<P>(path,prefix,tag);
        } catch (e) {
            if (debug) {
                const dynamicPath = this.buildComponentImport(path, prefix, tag)
                console.warn("Default-Loader.tryDynamicSync","Error loading component", dynamicPath)
            }
        }
        return undefined;
    }

    public tryDynamicModuleSync<MT = any>(path: string[], prefix?: string, tag: string = "") : MT | undefined
    {
        try {
            return this.dynamicModuleSync(path,prefix,tag);
        } catch (e) {
            if (debug) {
                const dynamicPath = this.buildComponentImport(path, prefix, tag)
                console.warn("Default-Loader.tryDynamicModuleSync","Error loading component", dynamicPath)
            }
        }
        return undefined;
    }

    public async tryDynamicAsync<P = DynamicProps>(path: string[], prefix?: string, tag: string = "") : Promise<ComponentType<P> | undefined>
    {
        return this.dynamicAsync<P>(path, prefix, tag).catch(e => {
            if (debug) {
                const dynamicPath = this.buildComponentImport(path, prefix, tag)
                console.warn("Default-Loader.tryDynamicAsync","Error loading component", dynamicPath)
            }
            return undefined
        })
    }

    public async tryDynamicModuleAsync(path: string[], prefix?: string, tag: string = "")
    {
        return this.dynamicModuleAsync(path, prefix, tag).catch(e => {
            if (debug) {
                const dynamicPath = this.buildComponentImport(path, prefix, tag)
                console.warn("Default-Loader.tryDynamicModuleAsync","Error loading component", dynamicPath)
            }
            return undefined
        })
    }
}