import React, { Component, ComponentType, PropsWithChildren } from 'react'

export type ErrorBoundaryProps = PropsWithChildren<{
    componentName?: string
}>
export type ErrorBoundaryState = {
    hasError: boolean
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static displayName : string = "Optimizely CMS: Error boundary"
  
    static getDerivedStateFromError(error: Error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }
  
    componentDidCatch(error: Error, errorInfo: any) {
        try {
            const groupName = `‼ ${ this.props.componentName ?? 'Component'} error caught at boundary`
            console.groupCollapsed(groupName)
            console.info("Component name", this.props.componentName ?? '')
            console.info(errorInfo)
            console.error(error)
            console.groupEnd()
        } catch {
            // Just give up...
        }
        // You can also log the error to an error reporting service
        // logErrorToMyService(error, errorInfo);
    }
  
    render() {
        if (this.state.hasError) {
            return <></>;
        }
        return this.props.children; 
    }
}

export function withErrorBoundary<P>(BaseComponent: ComponentType<P>) : ComponentType<P>
{
    const wrapped : ComponentType<P> = (props) => <ErrorBoundary componentName={ BaseComponent.displayName }><BaseComponent {...props} /></ErrorBoundary>
    wrapped.displayName = `${BaseComponent.displayName ?? 'Component'} with error boundary`
    return wrapped
}