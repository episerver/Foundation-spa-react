// React Bindings
export * as Models from './models/index'
export * as Provider from './provider/index'
export * as Components from './components/index'

// Convenience short-hands
export { useOptimizely, useAndInitOptimizely } from './provider/use'
export { ContentComponent } from './components/ContentComponent'
export { EditableField } from './components/EditableField'
export { useContent, useContents, useContentComponent } from './hooks'

// Dynamic component loader (Webpack 5+)
export * as ComponentLoader from './loader/index'

// GraphQL Client
export { setup as createGqlClient } from './graphql/index'
export * as GraphQL from './graphql/index'

// Content Delivery API Client
export { default as cdapi } from './content-delivery/index'
export * as ContentDelivery from './content-delivery/index'

// Various utilities
export * as Utils from './util/index'

// Global scope additions
import type { OptiOnPageEditingContext } from './opti-on-page-editing'
declare global {
    interface Window {
        /**
         * The EPiServer namespace used by the Optimizely Content Cloud
         * client side libraries.
         */
        epi ?: OptiOnPageEditingContext
    }
}