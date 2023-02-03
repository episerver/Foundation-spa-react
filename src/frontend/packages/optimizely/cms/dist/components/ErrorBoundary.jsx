import React, { Component } from 'react';
const DEBUG_ENABLED = process.env.NODE_ENV != "production";
export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        if (DEBUG_ENABLED)
            console.error(error);
        return { hasError: true, error };
    }
    componentDidCatch(error, errorInfo) {
        try {
            if (DEBUG_ENABLED) {
                const groupName = `‼ ${this.props.componentName ?? 'Component'} error caught at boundary`;
                console.groupCollapsed(groupName);
                console.info("Component name", this.props.componentName ?? '');
                console.info(errorInfo);
                console.error(error);
                console.groupEnd();
            }
        }
        catch {
            // Just give up...
        }
        // You can also log the error to an error reporting service
        // logErrorToMyService(error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return this.props.fallback ?
                this.props.fallback :
                <div className='error caught-error'>{this.state?.error?.name}: {this.state?.error?.message}</div>;
        }
        return this.props.children;
    }
}
ErrorBoundary.displayName = "Optimizely CMS: Error boundary";
export function withErrorBoundary(BaseComponent, fallback) {
    const wrapped = (props) => <ErrorBoundary componentName={BaseComponent.displayName} fallback={fallback}>
        <BaseComponent {...props}/>
    </ErrorBoundary>;
    wrapped.displayName = `${BaseComponent.displayName ?? 'Component'} with error boundary`;
    return wrapped;
}
export default ErrorBoundary;
//# sourceMappingURL=ErrorBoundary.jsx.map