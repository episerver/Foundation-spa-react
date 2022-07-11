"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Provider = exports.default = void 0;
const tslib_1 = require("tslib");
(0, tslib_1.__exportStar)(require("./context"), exports);
(0, tslib_1.__exportStar)(require("./use"), exports);
(0, tslib_1.__exportStar)(require("./provider"), exports);
var use_1 = require("./use");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return use_1.useProductRecs; } });
var provider_1 = require("./provider");
Object.defineProperty(exports, "Provider", { enumerable: true, get: function () { return provider_1.ContextProvider; } });
//# sourceMappingURL=index.js.map