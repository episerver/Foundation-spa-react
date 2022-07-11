"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOptimizely = exports.useAndInitOptimizely = void 0;
const tslib_1 = require("tslib");
const react_1 = require("react");
const context_1 = tslib_1.__importDefault(require("./context"));
const useAndInitOptimizely = (inEditMode, isEditable) => {
    const opti = (0, react_1.useContext)(context_1.default);
    if (inEditMode === true) {
        opti.inEditMode = true;
    }
    if (isEditable === true) {
        opti.isEditable = true;
    }
    return opti;
};
exports.useAndInitOptimizely = useAndInitOptimizely;
const useOptimizely = () => {
    return (0, react_1.useContext)(context_1.default);
};
exports.useOptimizely = useOptimizely;
exports.default = exports.useOptimizely;
//# sourceMappingURL=use.js.map