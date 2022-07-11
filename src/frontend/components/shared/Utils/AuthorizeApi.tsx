import type { FunctionComponent, PropsWithChildren } from 'react'
import { useSession } from 'next-auth/react'
import { useOptimizely } from '@optimizely/cms'
import React from 'react'

export const AuthorizeApi : FunctionComponent<PropsWithChildren<{}>> = props =>
{
    const session = useSession();
    const opti = useOptimizely();

    if (session.status === 'authenticated') {
        const token = session.data.at as string | undefined
        if (token)
            opti.api?.setAccessToken(token)
    }

    return <>{ props.children }</>
}

export default AuthorizeApi