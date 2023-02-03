const debug = process.env['NODE_ENV'] == 'development';
const componentPromises = {};
/**
 * Default implementation of the component loader, assuming all
 * components are accessible within: @components/cms.... to allow
 * for dynamic import building
 */
export class DefaultComponentLoader {
    get AsyncComponents() {
        return componentPromises;
    }
    constructor(cache) {
        this.prefix = "@components/cms";
        this.cache = cache ?? {};
        if (debug)
            console.log("Optimizely - CMS: DefaultComponentLoader.newInstance");
    }
    buildComponentImport(path, prefix, tag = "") {
        // Process the path
        if (path.slice(-1)[0] === "Content")
            path = path.slice(0, -1);
        // Standardize to lowercase
        path = path.map((p, i) => i < (path.length - 1) ? p.toLowerCase() : p);
        // Process prefix
        prefix = prefix?.toLowerCase();
        if (prefix && path[0] != prefix)
            path.unshift(prefix);
        return path.join('/') + tag;
    }
    dynamicSync(path, prefix, tag = "") {
        const dynamicPath = this.buildComponentImport(path, prefix, tag);
        if (!this.cache[dynamicPath]) {
            if (debug)
                console.warn("Optimizely - CMS: DefaultComponentLoader.dynamicSync component not cached: ", `@components/cms/${dynamicPath}`);
            throw new Error(`Component ${dynamicPath} cannot be resolved synchronously`);
        }
        return this.cache[dynamicPath];
    }
    async dynamicAsync(path, prefix, tag = "") {
        if (debug)
            console.log("Optimizely - CMS: DefaultComponentLoader.dynamicAsync", `@components/cms/${this.buildComponentImport(path, prefix, tag)}`);
        const dynamicModule = await this.dynamicModuleAsync(path, prefix, tag);
        if (!dynamicModule?.default)
            throw new Error(`Module ${this.buildComponentImport(path, prefix, tag)} does not have a default export (1)`);
        if (!dynamicModule.default.then)
            return dynamicModule.default;
        const returnValue = await dynamicModule.default;
        if (!returnValue.default)
            throw new Error(`Module ${this.buildComponentImport(path, prefix, tag)} does not have a default export (2)`);
        return returnValue.default;
    }
    dynamicModuleSync(path, prefix, tag = "") {
        const dynamicPath = this.buildComponentImport(path, prefix, tag);
        if (debug)
            console.log("Optimizely - CMS: DefaultComponentLoader.dynamicModuleSync", `@components/cms/${dynamicPath}`);
        throw new Error(`Module "@components/cms/${dynamicPath}" cannot be loaded synchronously`);
    }
    async dynamicModuleAsync(path, prefix, tag = "") {
        const dynamicPath = this.buildComponentImport(path, prefix, tag);
        if (typeof (dynamicPath) !== 'string' || dynamicPath.length < 1)
            return undefined;
        if (Object.getOwnPropertyNames(componentPromises).includes(dynamicPath) && typeof (componentPromises[dynamicPath].then) === 'function')
            return componentPromises[dynamicPath];
        if (debug)
            console.log("Optimizely - CMS: DefaultComponentLoader.dynamicModuleAsync", `@components/cms/${dynamicPath}`);
        const dynamicModule = import(
        /* webpackInclude: /\.(js|json|jsx|ts|tsx)$/ */
        /* webpackExclude: /\.(md|css)$/ */
        /* webpackMode: "lazy-once" */
        /* webpackPrefetch: true */
        /* webpackChunkName: "component.[request]" */
        `@components/cms/${dynamicPath}`).then(m => {
            dynamicModule.result = m;
            return m;
        });
        componentPromises[dynamicPath] = dynamicModule;
        return await dynamicModule;
    }
    tryDynamicSync(path, prefix, tag = "") {
        try {
            return this.dynamicSync(path, prefix, tag);
        }
        catch (e) {
            if (debug) {
                const dynamicPath = this.buildComponentImport(path, prefix, tag);
                console.warn("Optimizely - CMS: DefaultComponentLoader.tryDynamicSync", "Error loading component", dynamicPath);
            }
        }
        return undefined;
    }
    tryDynamicModuleSync(path, prefix, tag = "") {
        try {
            return this.dynamicModuleSync(path, prefix, tag);
        }
        catch (e) {
            if (debug) {
                const dynamicPath = this.buildComponentImport(path, prefix, tag);
                console.warn("Optimizely - CMS: DefaultComponentLoader.tryDynamicModuleSync", "Error loading component", dynamicPath);
            }
        }
        return undefined;
    }
    async tryDynamicAsync(path, prefix, tag = "") {
        return this.dynamicAsync(path, prefix, tag).catch(e => {
            if (debug) {
                const dynamicPath = this.buildComponentImport(path, prefix, tag);
                console.warn("Optimizely - CMS: DefaultComponentLoader.tryDynamicAsync", "Error loading component", dynamicPath);
            }
            return undefined;
        });
    }
    async tryDynamicModuleAsync(path, prefix, tag = "") {
        return this.dynamicModuleAsync(path, prefix, tag).catch(e => {
            if (debug) {
                const dynamicPath = this.buildComponentImport(path, prefix, tag);
                console.warn("Optimizely - CMS: DefaultComponentLoader.tryDynamicModuleAsync", "Error loading component", dynamicPath);
            }
            return undefined;
        });
    }
}
export default DefaultComponentLoader;
//# sourceMappingURL=default-loader.js.map