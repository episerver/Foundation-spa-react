import React, { Component } from 'react';
export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
        try {
            const groupName = `‼ ${this.props.componentName ?? 'Component'} error caught at boundary`;
            console.groupCollapsed(groupName);
            console.info("Component name", this.props.componentName ?? '');
            console.info(errorInfo);
            console.error(error);
            console.groupEnd();
        }
        catch {
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
ErrorBoundary.displayName = "Optimizely CMS: Error boundary";
export function withErrorBoundary(BaseComponent) {
    const wrapped = (props) => <ErrorBoundary componentName={BaseComponent.displayName}><BaseComponent {...props}/></ErrorBoundary>;
    wrapped.displayName = `${BaseComponent.displayName ?? 'Component'} with error boundary`;
    return wrapped;
}
//# sourceMappingURL=ErrorBoundary.jsx.map