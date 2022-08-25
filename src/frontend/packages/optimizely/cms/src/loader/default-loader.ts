import type { ComponentType } from 'react'
import type { ComponentLoader, DynamicProps } from "./types"
import type { ContextType } from '../provider/context'

const debug = false; //process.env['NODE_ENV'] == 'development'
const componentPromises : Record<string, Promise<any>> = {}

export type ComponentsCache = Required<ContextType>['components']

/**
 * Default implementation of the component loader, assuming all
 * components are accessible within: @components/cms.... to allow
 * for dynamic import building
 */
export class DefaultComponentLoader implements ComponentLoader
{
    public readonly prefix : string = "@components/cms"
    protected readonly cache : ComponentsCache

    public get AsyncComponents() : Record<string, Promise<any>> 
    {
        return componentPromises;
    }

    public constructor(cache ?: ComponentsCache)
    {
        if (debug) console.log("Default-Loader.newInstance")

        this.cache = cache ?? {}

        // try making the component loader available in the browser
        try {
            (window as any).__dcl__ = this;
        } catch (e) {}
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
        const dynamicPath = this.buildComponentImport(path, prefix, tag) 
        if (!this.cache[dynamicPath])
            throw new Error(`Component ${ dynamicPath } cannot be resolved synchronously`)
        return this.cache[dynamicPath] as ComponentType<P>
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
        const dynamicPath = this.buildComponentImport(path, prefix, tag) 
        throw new Error(`Module "@components/cms/${dynamicPath}" cannot be loaded synchronously`)
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