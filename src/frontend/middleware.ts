import type { NextMiddleware } from 'next/server'
import { NextResponse } from 'next/server'

function isLowerCase(input: string) : boolean 
{
    return input === input.toLowerCase()
}

/**
 * Process all URLs matching the requests defined in the configuration
 * 
 * @param       request     The web request
 * @returns     The web response
 */
export const withOptiCms : NextMiddleware = async request => 
{    
    if (!isLowerCase(request.nextUrl.pathname)) {
        const newUrl = request.nextUrl.clone()
        let newPath = request.nextUrl.pathname.toLowerCase()
        if (!newPath.startsWith("/episerver/cms/content"))
            newPath = `/api/cmsproxy${ newPath }`
        newUrl.pathname = newPath
        return NextResponse.rewrite(newUrl)
    }   
    return NextResponse.next()
}

export default withOptiCms
export const config = { 
    matcher: [ 
        "/EPiServer/CMS/Content/:path*",
        "/EPiServer/EPiServer.Forms/:path*"
    ] 
}