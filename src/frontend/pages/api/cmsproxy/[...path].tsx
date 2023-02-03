import type { NextApiHandler } from 'next'

const DEBUG_ENABLED = process.env.NODE_ENV != 'production'

export const cmsProxyHandler : NextApiHandler<{}> = async (req, res) => {
    const path = req.url ?? '/'
    const base = process?.env?.OPTIMIZELY_DXP_URL ?? 'http://localhost'
    const url = new URL(path, base)

    if (DEBUG_ENABLED)
        console.log("CMS-Proxy: Redirecting to:", url.href)
    return res.redirect(302, url.href)
/*
    if (DEBUG_ENABLED)
        console.log("CMS-Proxy: Forwarding proxied request to:", url.href)

    const params : RequestInit = {
        redirect: 'manual',
    }
    const headers : { [key: string]: string | string[] | undefined } = {}
    for (const key of Object.getOwnPropertyNames(req.headers))
    {
        const value = req.headers[key]
        if (!["set-cookie","server","transfer-encoding","content-encoding","vary"].includes(key)) {    
            if (DEBUG_ENABLED)
                console.log("CMS-Proxy: Copying request header:", key, value)
            headers[key] = value
        }
    }

    const cmsResponse = await fetch(url, params)

    if (DEBUG_ENABLED)
        console.log("CMS-Proxy: Received response:", `HTTP/1.1 ${cmsResponse.status} ${cmsResponse.statusText}`)

    if (cmsResponse.status >= 300 && cmsResponse.status < 400)
    {
        const target = cmsResponse.headers.get("location")
        if (target && target.includes("/Util/Login?")) {
            return res.status(401).send("")
        }
    }

    res.statusCode = cmsResponse.status
    res.statusMessage = cmsResponse.statusText
    cmsResponse.headers.forEach((value, key) => {
        if (!["set-cookie","server","transfer-encoding","content-encoding","vary"].includes(key)) {    
            if (DEBUG_ENABLED)
                console.log("CMS-Proxy: Copying response header:", key, value)
            res.setHeader(key, value)
        }
    })
    const body = await cmsResponse.text()
    res.send(body)*/
}

export default cmsProxyHandler