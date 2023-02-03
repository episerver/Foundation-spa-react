import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';
export const withOptiCms = withAuth((req) => {
    if (req.nextUrl.pathname.toLowerCase().startsWith("/episerver/cms/content")) {
        const newPath = `/episerver/cms/content${req.nextUrl.pathname.substring(22)}`;
        const url = req.nextUrl.clone();
        url.pathname = newPath;
        return NextResponse.rewrite(url);
    }
});
export default withOptiCms;
export const config = { matcher: ["/admin"] };
//# sourceMappingURL=middleware.js.map