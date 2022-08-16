"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.withOptiCms = void 0;
const server_1 = require("next/server");
const middleware_1 = require("next-auth/middleware");
exports.withOptiCms = (0, middleware_1.withAuth)((req) => {
    if (req.nextUrl.pathname.toLowerCase().startsWith("/episerver/cms/content")) {
        const newPath = `/episerver/cms/content${req.nextUrl.pathname.substring(22)}`;
        const url = req.nextUrl.clone();
        url.pathname = newPath;
        return server_1.NextResponse.rewrite(url);
    }
});
exports.default = exports.withOptiCms;
exports.config = { matcher: ["/admin"] };
/*type NextMiddlewareResult = ReturnType<NextMiddleware> | void;
export type OptiCmsMiddleware = (req: NextRequest, event: NextFetchEvent, nextMiddleware ?: NextMiddleware) => NextMiddlewareResult

export const withOptiCms : OptiCmsMiddleware = async (req, event, nextMiddleware) => {
    if (req.nextUrl.pathname.toLowerCase().startsWith("/episerver/cms/content")) {
        const newPath = `/episerver/cms/content${req.nextUrl.pathname.substring(22)}`
        const url = req.nextUrl.clone()
        url.pathname = newPath

        const resp = await withAuth(req)
        return resp ?? NextResponse.rewrite(url)
    }

    return nextMiddleware ? nextMiddleware(req, event) : undefined
}

export default withOptiCms*/ 
//# sourceMappingURL=middleware.js.map