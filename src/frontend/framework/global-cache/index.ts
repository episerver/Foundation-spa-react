export type GlobalCacheType = {
    getContainer:  () => { __gc__?: GlobalCacheStorage }
    set: <T = any>(key: string, data: T) => void
    get: <T = any>(key: string) => T | undefined
}

export type GlobalCacheStorage = Record<string, { key: string, data: any, created: Date, lastHit: Date }>

const fallback : { __gc__: GlobalCacheStorage } = { __gc__: {} }

export const GlobalCache : GlobalCacheType =
{
    get: (key) => {
        const c = GlobalCache.getContainer()
        if (c.__gc__ && c.__gc__[key]) {
            c.__gc__[key].lastHit = new Date()
            return c.__gc__[key].data
        }
        return undefined
    },

    set: (key, data) => {
        const c = GlobalCache.getContainer()
        const created = new Date();
        if (!c.__gc__) c.__gc__ = {};
        c.__gc__[key] = { key, data, created, lastHit: created }
    },

    getContainer: () => {
        try {
            if (global)
                return (global as typeof global & { __gc__?: GlobalCacheStorage });
        } catch (e)
        {}
        try {
            if (window)
                return (window as typeof window & { __gc__?: GlobalCacheStorage });
        } catch (e)
        {}
        return fallback
    }
}

export default GlobalCache