// Export complete sub-systems
export * from './provider'
export * from './hooks'

// Export models and types
export * from './models'
export type { IContentDeliveryAPI, IContentDeliveryAPIStatic, ContentRequest } from './content-delivery/icontent-delivery-api'
export type { ComponentLoader, ComponentLoaderStatic, ComponentsCache } from './loader/types'

// Export factories
export { createComponentLoader } from './loader/factory'
export { createInstance as createContentDeliveryClient } from './content-delivery/factory'

// Export components
export { ContentArea } from './components/ContentArea'
export { ContentAreaItem } from './components/ContentAreaItem'
export { ContentComponent } from './components/ContentComponent'
export { EditableField } from './components/EditableField'
export { ErrorBoundary } from './components/ErrorBoundary'

// Exports HOCs
export { withOnPageEditing } from './components/EditableField'
export { withErrorBoundary } from './components/ErrorBoundary'

// Export utilities as namespaces
export * as Utils from './util'

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