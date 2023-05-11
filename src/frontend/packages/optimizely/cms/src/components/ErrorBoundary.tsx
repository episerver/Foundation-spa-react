import type { ComponentType, PropsWithChildren, ReactNode, FunctionComponent } from 'react'
import React, { Component } from 'react'

const DEBUG_ENABLED = process.env.NODE_ENV != "production"

export type ErrorBoundaryProps = PropsWithChildren<{
    componentName?: string
    fallback ?: ReactNode
}>
export type ErrorBoundaryState = {
    hasError: boolean,
    error?: Error
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static displayName : string = "Optimizely CMS: Error boundary"
  
    static getDerivedStateFromError(error: Error) {
        // Update state so the next render will show the fallback UI.
        if (DEBUG_ENABLED) console.error(error)
        return { hasError: true, error };
    }
  
    componentDidCatch(error: Error, errorInfo: any) {
        try {
            if (DEBUG_ENABLED) {
                const groupName = `‼ ${ this.props.componentName ?? 'Component'} error caught at boundary`
                console.groupCollapsed(groupName)
                console.info("Component name", this.props.componentName ?? '')
                console.info(errorInfo)
                console.error(error)
                console.groupEnd()
            }
        } catch {
            // Just give up...
        }
        // You can also log the error to an error reporting service
        // logErrorToMyService(error, errorInfo);
    }
  
    render() : ReactNode {
        if (this.state.hasError) {
            return this.props.fallback ? 
                this.props.fallback : 
                <div className='error caught-error'>{ this.state?.error?.name }: { this.state?.error?.message }</div>
        }
        return this.props.children; 
    }
}

export type ErrorBoundaryWrapper = <P>(BaseComponent: ComponentType<P>, fallback?: ReactNode) => FunctionComponent<P>

export const withErrorBoundary : ErrorBoundaryWrapper = function <P>(BaseComponent: ComponentType<P>, fallback?: ReactNode) {
    const wrapped : FunctionComponent<P> = (props) => <ErrorBoundary componentName={ BaseComponent.displayName } fallback={ fallback }><BaseComponent { ...props as JSX.IntrinsicAttributes & P }/></ErrorBoundary>
    wrapped.displayName = `${BaseComponent.displayName ?? 'Component'} with error boundary`
    return wrapped
}

export default ErrorBoundary