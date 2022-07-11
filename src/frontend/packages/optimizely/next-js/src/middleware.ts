/* eslint-disable @next/next/no-server-import-in-page */
import type { NextRequest, NextMiddleware, NextFetchEvent } from 'next/server'
import { NextResponse } from 'next/server'
import { withAuth } from 'next-auth/middleware'

export type OptiCmsMiddleware = (req: NextRequest, event: NextFetchEvent, nextMiddleware ?: NextMiddleware) => ReturnType<NextMiddleware>

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

export default withOptiCms