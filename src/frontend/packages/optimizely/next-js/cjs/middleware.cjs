"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withOptiCms = void 0;
const tslib_1 = require("tslib");
const server_1 = require("next/server");
const middleware_1 = require("next-auth/middleware");
const withOptiCms = (req, event, nextMiddleware) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (req.nextUrl.pathname.toLowerCase().startsWith("/episerver/cms/content")) {
        const newPath = `/episerver/cms/content${req.nextUrl.pathname.substring(22)}`;
        const url = req.nextUrl.clone();
        url.pathname = newPath;
        const resp = yield (0, middleware_1.withAuth)(req);
        return resp !== null && resp !== void 0 ? resp : server_1.NextResponse.rewrite(url);
    }
    return nextMiddleware ? nextMiddleware(req, event) : undefined;
});
exports.withOptiCms = withOptiCms;
exports.default = exports.withOptiCms;
//# sourceMappingURL=middleware.js.map