"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPromise = void 0;
const tslib_1 = require("tslib");
const cross_fetch_1 = tslib_1.__importDefault(require("cross-fetch"));
tslib_1.__exportStar(require("cross-fetch"), exports);
exports.fetchPromise = Promise.resolve(cross_fetch_1.default);
exports.default = exports.fetchPromise;
//# sourceMappingURL=fetch.js.map