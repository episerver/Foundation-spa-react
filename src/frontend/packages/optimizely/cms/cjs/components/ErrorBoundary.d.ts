import type { ComponentType, PropsWithChildren, ReactNode } from 'react';
import React, { Component } from 'react';
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
    render(): string | number | boolean | React.ReactFragment | JSX.Element | null | undefined;
}
export declare function withErrorBoundary<P>(BaseComponent: ComponentType<P>, fallback?: ReactNode): ComponentType<P>;
export default ErrorBoundary;
