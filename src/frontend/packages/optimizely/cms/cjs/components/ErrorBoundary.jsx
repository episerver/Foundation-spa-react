"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withErrorBoundary = exports.ErrorBoundary = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
class ErrorBoundary extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
        var _a, _b;
        try {
            const groupName = `‼ ${(_a = this.props.componentName) !== null && _a !== void 0 ? _a : 'Component'} error caught at boundary`;
            console.groupCollapsed(groupName);
            console.info("Component name", (_b = this.props.componentName) !== null && _b !== void 0 ? _b : '');
            console.info(errorInfo);
            console.error(error);
            console.groupEnd();
        }
        catch (_c) {
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
exports.ErrorBoundary = ErrorBoundary;
ErrorBoundary.displayName = "Optimizely CMS: Error boundary";
function withErrorBoundary(BaseComponent) {
    var _a;
    const wrapped = (props) => <ErrorBoundary componentName={BaseComponent.displayName}><BaseComponent {...props}/></ErrorBoundary>;
    wrapped.displayName = `${(_a = BaseComponent.displayName) !== null && _a !== void 0 ? _a : 'Component'} with error boundary`;
    return wrapped;
}
exports.withErrorBoundary = withErrorBoundary;
//# sourceMappingURL=ErrorBoundary.jsx.map