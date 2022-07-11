import React, { Component, ComponentType, PropsWithChildren } from 'react';
export declare type ErrorBoundaryProps = PropsWithChildren<{
    componentName?: string;
}>;
export declare type ErrorBoundaryState = {
    hasError: boolean;
};
export declare class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps);
    static displayName: string;
    static getDerivedStateFromError(error: Error): {
        hasError: boolean;
    };
    componentDidCatch(error: Error, errorInfo: any): void;
    render(): string | number | boolean | React.ReactFragment | JSX.Element | null | undefined;
}
export declare function withErrorBoundary<P>(BaseComponent: ComponentType<P>): ComponentType<P>;
