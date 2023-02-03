import type { ComponentType } from 'react'
import type { ComponentLoader, DynamicProps, ComponentsCache } from "./types"

const debug = process.env['NODE_ENV'] == 'development'
const componentPromises : Record<string, Promise<any>> = {}

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
        this.cache = cache ?? {}
        if (debug)
            console.log("Optimizely - CMS: DefaultComponentLoader.newInstance")
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
        if (!this.cache[dynamicPath]) {
            if (debug) console.warn("Optimizely - CMS: DefaultComponentLoader.dynamicSync component not cached: ", `@components/cms/${ dynamicPath }`)
            throw new Error(`Component ${ dynamicPath } cannot be resolved synchronously`)
        }
        return this.cache[dynamicPath] as ComponentType<P>
    }

    public async dynamicAsync<P = DynamicProps>(path: string[], prefix?: string, tag: string = "") : Promise<ComponentType<P>>
    {
        if (debug) console.log("Optimizely - CMS: DefaultComponentLoader.dynamicAsync", `@components/cms/${ this.buildComponentImport(path, prefix, tag) }`)
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
        if (debug) console.log("Optimizely - CMS: DefaultComponentLoader.dynamicModuleSync", `@components/cms/${dynamicPath}`)
        throw new Error(`Module "@components/cms/${dynamicPath}" cannot be loaded synchronously`)
    }

    public async dynamicModuleAsync<MT = any>(path: string[], prefix?: string, tag: string = "")
    {
        const dynamicPath = this.buildComponentImport(path, prefix, tag)
        if (typeof(dynamicPath) !== 'string' || dynamicPath.length < 1) return undefined

        if (Object.getOwnPropertyNames(componentPromises).includes(dynamicPath) && typeof(componentPromises[dynamicPath].then) === 'function')
            return componentPromises[dynamicPath];

        if (debug) console.log("Optimizely - CMS: DefaultComponentLoader.dynamicModuleAsync", `@components/cms/${dynamicPath}`)
        const dynamicModule : Promise<MT> = import(
            /* webpackInclude: /\.(js|json|jsx|ts|tsx)$/ */
            /* webpackExclude: /\.(md|css)$/ */
            /* webpackMode: "lazy-once" */
            /* webpackPrefetch: true */
            /* webpackChunkName: "component.[request]" */
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
                console.warn("Optimizely - CMS: DefaultComponentLoader.tryDynamicSync","Error loading component", dynamicPath)
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
                console.warn("Optimizely - CMS: DefaultComponentLoader.tryDynamicModuleSync","Error loading component", dynamicPath)
            }
        }
        return undefined;
    }

    public async tryDynamicAsync<P = DynamicProps>(path: string[], prefix?: string, tag: string = "") : Promise<ComponentType<P> | undefined>
    {
        return this.dynamicAsync<P>(path, prefix, tag).catch(e => {
            if (debug) {
                const dynamicPath = this.buildComponentImport(path, prefix, tag)
                console.warn("Optimizely - CMS: DefaultComponentLoader.tryDynamicAsync","Error loading component", dynamicPath)
            }
            return undefined
        })
    }

    public async tryDynamicModuleAsync(path: string[], prefix?: string, tag: string = "")
    {
        return this.dynamicModuleAsync(path, prefix, tag).catch(e => {
            if (debug) {
                const dynamicPath = this.buildComponentImport(path, prefix, tag)
                console.warn("Optimizely - CMS: DefaultComponentLoader.tryDynamicModuleAsync","Error loading component", dynamicPath)
            }
            return undefined
        })
    }
}

export default DefaultComponentLoader