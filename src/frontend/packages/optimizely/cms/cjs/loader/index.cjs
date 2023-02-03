"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./types"), exports);
tslib_1.__exportStar(require("./default-loader"), exports);
tslib_1.__exportStar(require("./factory"), exports);
var factory_1 = require("./factory");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return factory_1.createComponentLoader; } });
//# sourceMappingURL=index.js.map