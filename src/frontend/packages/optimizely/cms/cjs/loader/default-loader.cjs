"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultComponentLoader = void 0;
const tslib_1 = require("tslib");
function isServer() {
    try {
        return (window && window.location && window.addEventListener) ? false : true;
    }
    catch (_a) {
        return true;
    }
}
function isWebpack() {
    try {
        return typeof (__webpack_modules__) != 'undefined';
    }
    catch (_a) {
        return true;
    }
}
const debug = false; //process.env['NODE_ENV'] == 'development'
const componentPromises = {};
/**
 * Default implementation of the component loader, assuming all
 * components are accessible within: @components/.... to allow
 * for dynamic import building
 */
class DefaultComponentLoader {
    constructor() {
        this.prefix = "@components/cms";
        if (debug)
            console.log("Default-Loader.newInstance");
        if (!isWebpack())
            throw new Error('The DefaultComponentLoader requires Webpack 5+');
        // Pre-fetch & validate the components
        if (isServer()) {
            Object.keys(__webpack_modules__).forEach(k => {
                if (k.indexOf(" ") > 0) { // Dynamic imports have a space, but get resolved, so we don't know where @components/cms points to
                    let dynamicModule = {};
                    __webpack_modules__[k](dynamicModule, null, __webpack_require__);
                    if (!dynamicModule.exports)
                        return;
                    const exports = dynamicModule.exports;
                    const keys = exports.keys();
                    if (debug)
                        console.log(`Default-Loader.newInstance: PreFetched ${keys.length} modules for dynamic import ${k}`);
                }
            });
        }
        else {
            try {
                window.__dcl__ = this;
            }
            catch (e) { }
        }
    }
    get AsyncComponents() {
        return componentPromises;
    }
    get R() {
        return __webpack_require__;
    }
    get M() {
        return __webpack_modules__;
    }
    buildComponentImport(path, prefix, tag = "") {
        // Process the path
        if (path.slice(-1)[0] === "Content")
            path = path.slice(0, -1);
        // Standardize to lowercase
        path = path.map((p, i) => i < (path.length - 1) ? p.toLowerCase() : p);
        // Process prefix
        prefix = prefix === null || prefix === void 0 ? void 0 : prefix.toLowerCase();
        if (prefix && path[0] != prefix)
            path.unshift(prefix);
        return path.join('/') + tag;
    }
    dynamicSync(path, prefix, tag = "") {
        const dynamicModule = this.dynamicModuleSync(path, prefix, tag);
        if (!dynamicModule)
            throw new Error(`Module ${this.buildComponentImport(path, prefix, tag)} cannot be resolved synchronously`);
        if (!(dynamicModule === null || dynamicModule === void 0 ? void 0 : dynamicModule.default))
            throw new Error(`Module ${this.buildComponentImport(path, prefix, tag)} does not have a default export`);
        return dynamicModule.default;
    }
    dynamicAsync(path, prefix, tag = "") {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const dynamicModule = yield this.dynamicModuleAsync(path, prefix, tag);
            if (!(dynamicModule === null || dynamicModule === void 0 ? void 0 : dynamicModule.default))
                throw new Error(`Module ${this.buildComponentImport(path, prefix, tag)} does not have a default export (1)`);
            if (!dynamicModule.default.then)
                return dynamicModule.default;
            const returnValue = yield dynamicModule.default;
            if (!returnValue.default)
                throw new Error(`Module ${this.buildComponentImport(path, prefix, tag)} does not have a default export (2)`);
            return returnValue.default;
        });
    }
    dynamicModuleSync(path, prefix, tag = "") {
        //if (!isServer()) return undefined
        const dynamicPath = this.buildComponentImport(path, prefix, tag);
        if (typeof (dynamicPath) !== 'string' || dynamicPath.length < 1)
            return undefined;
        if (debug)
            console.log("Default-Loader.dynamicModuleSync", `@components/cms/${dynamicPath}`);
        //@ts-expect-error resolveWeak is a non-standard function introduced by WebPack
        const moduleId = require.resolveWeak(`@components/cms/${dynamicPath}`);
        if (isServer() && __webpack_require__.m[moduleId]) {
            const exports = {};
            __webpack_require__.m[moduleId].call(exports, {}, exports, __webpack_require__);
            return exports;
        }
        else {
            const mod = __webpack_require__(moduleId);
            if (debug)
                console.log("Default-Loader.dynamicModuleSync (Browser)", `@components/cms/${dynamicPath}`, mod);
            return mod;
        }
        //throw new Error(`Module "@components/cms/${dynamicPath}" cannot be loaded synchronously`)
    }
    dynamicModuleAsync(path, prefix, tag = "") {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const dynamicPath = this.buildComponentImport(path, prefix, tag);
            if (typeof (dynamicPath) !== 'string' || dynamicPath.length < 1)
                return undefined;
            if (Object.getOwnPropertyNames(componentPromises).includes(dynamicPath) && typeof (componentPromises[dynamicPath].then) === 'function') {
                return componentPromises[dynamicPath];
            }
            if (debug)
                console.log("Default-Loader.dynamicModuleAsync", `@components/cms/${dynamicPath}`, Object.getOwnPropertyNames(componentPromises));
            const dynamicModule = Promise.resolve().then(() => tslib_1.__importStar(require(
            /* webpackInclude: /\.(js|json|jsx|ts|tsx)$/ */
            /* webpackExclude: /\.(md|css)$/ */
            /* webpackMode: "eager" */
            /* webpackPrefetch: true */
            `@components/cms/${dynamicPath}`))).then(m => {
                dynamicModule.result = m;
                return m;
            });
            componentPromises[dynamicPath] = dynamicModule;
            return yield dynamicModule;
        });
    }
    tryDynamicSync(path, prefix, tag = "") {
        try {
            return this.dynamicSync(path, prefix, tag);
        }
        catch (e) {
            if (debug) {
                const dynamicPath = this.buildComponentImport(path, prefix, tag);
                console.warn("Default-Loader.tryDynamicSync", "Error loading component", dynamicPath);
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
                console.warn("Default-Loader.tryDynamicModuleSync", "Error loading component", dynamicPath);
            }
        }
        return undefined;
    }
    tryDynamicAsync(path, prefix, tag = "") {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.dynamicAsync(path, prefix, tag).catch(e => {
                if (debug) {
                    const dynamicPath = this.buildComponentImport(path, prefix, tag);
                    console.warn("Default-Loader.tryDynamicAsync", "Error loading component", dynamicPath);
                }
                return undefined;
            });
        });
    }
    tryDynamicModuleAsync(path, prefix, tag = "") {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.dynamicModuleAsync(path, prefix, tag).catch(e => {
                if (debug) {
                    const dynamicPath = this.buildComponentImport(path, prefix, tag);
                    console.warn("Default-Loader.tryDynamicModuleAsync", "Error loading component", dynamicPath);
                }
                return undefined;
            });
        });
    }
}
exports.DefaultComponentLoader = DefaultComponentLoader;
//# sourceMappingURL=default-loader.js.map