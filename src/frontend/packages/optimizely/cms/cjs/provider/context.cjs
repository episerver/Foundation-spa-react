"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
const react_1 = require("react");
exports.Context = (0, react_1.createContext)({
    isReady: false,
    isEditable: false,
    inEditMode: false,
    defaultBranch: 'en'
});
exports.default = exports.Context;
//# sourceMappingURL=context.js.map