import type { ComponentType, PropsWithChildren, ReactNode, FunctionComponent } from 'react';
import { Component } from 'react';
export type ErrorBoundaryProps = PropsWithChildren<{
    componentName?: string;
    fallback?: ReactNode;
}>;
export type ErrorBoundaryState = {
    hasError: boolean;
    error?: Error;
};
export declare class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps);
    static displayName: string;
    static getDerivedStateFromError(error: Error): {
        hasError: boolean;
        error: Error;
    };
    componentDidCatch(error: Error, errorInfo: any): void;
    render(): ReactNode;
}
export type ErrorBoundaryWrapper = <P>(BaseComponent: ComponentType<P>, fallback?: ReactNode) => FunctionComponent<P>;
export declare const withErrorBoundary: ErrorBoundaryWrapper;
export default ErrorBoundary;
