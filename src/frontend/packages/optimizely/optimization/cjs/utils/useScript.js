"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useScript = void 0;
const react_1 = require("react");
const useScript = (url, name) => {
    const [lib, setLib] = (0, react_1.useState)({});
    (0, react_1.useEffect)(() => {
        const script = document.createElement('script');
        script.src = url;
        script.async = true;
        script.onload = () => setLib({ [name]: window[name] });
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, [url, name]);
    return lib;
};
exports.useScript = useScript;
exports.default = exports.useScript;
//# sourceMappingURL=useScript.js.map