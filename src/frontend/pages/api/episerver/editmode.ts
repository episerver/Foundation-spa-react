import type { NextApiHandler } from 'next'
import { getSession } from 'next-auth/react'

type EpiEditModeResponse = {
    error: true,
    message: string
}

export const epiEditModeHandler : NextApiHandler<EpiEditModeResponse> = async (req, res) => {
    const sess = await getSession({ req })
    if (!sess?.user) 
    {
        return res
            .clearPreviewData()
            .status(401)
            .json({ error: true, message: "Not authorized" })
    }

    const nextUrlReq = req.query['nextUrl']
    if (typeof(nextUrlReq) !== 'string') {
        return res
            .clearPreviewData()
            .status(400)
            .json({ error: true, message: "Invalid or no nextUrl provided"})
    }

    const nextUrl = new URL(nextUrlReq, 'http://localhost')
    const redirTarget = `${ nextUrl.pathname }?${ nextUrl.searchParams.toString() }`

    res
        .setPreviewData({})
        .redirect(307, redirTarget)
        .end()
    return
}

export default epiEditModeHandler