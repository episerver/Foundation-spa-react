"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRecommendations = exports.default = exports.useProductRecs = exports.Provider = void 0;
const tslib_1 = require("tslib");
exports.Provider = require("./provider");
var provider_1 = require("./provider");
Object.defineProperty(exports, "useProductRecs", { enumerable: true, get: function () { return provider_1.useProductRecs; } });
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return provider_1.useProductRecs; } });
var use_recommendations_1 = require("./hooks/use-recommendations");
Object.defineProperty(exports, "useRecommendations", { enumerable: true, get: function () { return use_recommendations_1.useRecommendations; } });
(0, tslib_1.__exportStar)(require("./peeriusheadless"), exports);
//# sourceMappingURL=index.js.map