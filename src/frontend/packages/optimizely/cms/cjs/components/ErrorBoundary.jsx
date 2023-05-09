"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withErrorBoundary = exports.ErrorBoundary = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const DEBUG_ENABLED = process.env.NODE_ENV != "production";
class ErrorBoundary extends react_1.Component {
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
        var _a, _b;
        try {
            if (DEBUG_ENABLED) {
                const groupName = `‼ ${(_a = this.props.componentName) !== null && _a !== void 0 ? _a : 'Component'} error caught at boundary`;
                console.groupCollapsed(groupName);
                console.info("Component name", (_b = this.props.componentName) !== null && _b !== void 0 ? _b : '');
                console.info(errorInfo);
                console.error(error);
                console.groupEnd();
            }
        }
        catch (_c) {
            // Just give up...
        }
        // You can also log the error to an error reporting service
        // logErrorToMyService(error, errorInfo);
    }
    render() {
        var _a, _b, _c, _d;
        if (this.state.hasError) {
            return this.props.fallback ?
                this.props.fallback :
                <div className='error caught-error'>{(_b = (_a = this.state) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.name}: {(_d = (_c = this.state) === null || _c === void 0 ? void 0 : _c.error) === null || _d === void 0 ? void 0 : _d.message}</div>;
        }
        return this.props.children;
    }
}
ErrorBoundary.displayName = "Optimizely CMS: Error boundary";
exports.ErrorBoundary = ErrorBoundary;
const withErrorBoundary = function (BaseComponent, fallback) {
    var _a;
    const wrapped = (props) => <ErrorBoundary componentName={BaseComponent.displayName} fallback={fallback}><BaseComponent {...props}/></ErrorBoundary>;
    wrapped.displayName = `${(_a = BaseComponent.displayName) !== null && _a !== void 0 ? _a : 'Component'} with error boundary`;
    return wrapped;
};
exports.withErrorBoundary = withErrorBoundary;
exports.default = ErrorBoundary;
//# sourceMappingURL=ErrorBoundary.jsx.map