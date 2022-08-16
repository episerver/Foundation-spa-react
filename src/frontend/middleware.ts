import type { NextMiddleware } from 'next/server'
import { NextResponse } from 'next/server'

function isLowerCase(input: string) : boolean 
{
    return input === input.toLowerCase()
}

export const withOptiCms : NextMiddleware = async request => 
{    
    if (!isLowerCase(request.nextUrl.pathname)) {
        const newUrl = request.nextUrl.clone()
        newUrl.pathname = request.nextUrl.pathname.toLowerCase()
        return NextResponse.rewrite(newUrl)    
    }   
    return NextResponse.next()
    
}

export default withOptiCms
export const config = { matcher: [ "/EPiServer/CMS/Content/:path*" ] }