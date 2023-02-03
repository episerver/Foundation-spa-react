import type { ComponentType, ComponentProps, FunctionComponent } from 'react'
import React, { Suspense } from 'react'

/**
 * Wrap the provided element in Suspense tags
 * 
 * @param       el      The component to be wrapped
 * @returns     The wrapped component
 */
export function withSuspense<T extends ComponentType<{}> = ComponentType<{}>>( el: T, fallback?: ComponentProps<typeof Suspense>['fallback'] ) : FunctionComponent<ComponentProps<T>>
{
     const Component = el as ComponentType<ComponentProps<T>>
     const newComponent : FunctionComponent<ComponentProps<T>> = props => <Suspense fallback={ fallback }><Component { ...props } /></Suspense>
     newComponent.displayName = el.displayName ? el.displayName + " with Suspense" : undefined
 
     //@ts-expect-error This is Optimizely CMS Component specific
     newComponent.getStaticProps = el.getStaticProps
     //@ts-expect-error This is Optimizely CMS Component specific
     newComponent.getDynamicProps = el.getDynamicProps
     //@ts-expect-error This is Optimizely CMS Component specific
     newComponent.getContentFields = el.getContentFields
 
     return newComponent
}

export default withSuspense