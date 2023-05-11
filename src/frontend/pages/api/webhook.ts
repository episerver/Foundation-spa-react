import type { NextApiHandler } from 'next'
import { getSession } from 'next-auth/react'

export const webHookHandler : NextApiHandler<{body: string}> = async (req, res) => {
    res.send({
        body: req.body
    })
}

export default webHookHandler;