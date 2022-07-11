import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';
export const withOptiCms = async (req, event, nextMiddleware) => {
    if (req.nextUrl.pathname.toLowerCase().startsWith("/episerver/cms/content")) {
        const newPath = `/episerver/cms/content${req.nextUrl.pathname.substring(22)}`;
        const url = req.nextUrl.clone();
        url.pathname = newPath;
        const resp = await withAuth(req);
        return resp ?? NextResponse.rewrite(url);
    }
    return nextMiddleware ? nextMiddleware(req, event) : undefined;
};
export default withOptiCms;
//# sourceMappingURL=middleware.js.map