import type { FunctionComponent, PropsWithChildren } from 'react'
import { useSession } from 'next-auth/react'
import { useOptimizelyCms } from '@optimizely/cms/context'
import React from 'react'
import { useCookies } from 'react-cookie'

type EnhancedSessionData = (NonNullable<ReturnType<typeof useSession>['data']> & { at?: string }) | null
type EnhancedSessionHook = Omit<ReturnType<typeof useSession>, 'data'> & { data: EnhancedSessionData }

/**
 * The Authorize API Component bridges Next-Auth with the Optimizely
 * content delivery API by propagating the session token from Next-Auth
 * to the ContentDelivery API.
 * 
 * @param       props   The Authorize API Component has no properties
 * @returns     The React Fragment with the children
 */
export const AuthorizeApi : FunctionComponent<PropsWithChildren<{}>> = props =>
{
    const { status, data } : EnhancedSessionHook = useSession()
    const { api } = useOptimizelyCms()
    const [ cookies ] = useCookies(['vuid'])
    const token = data?.at

    // Update the VUID header based on the cookies
    const vuid = (((cookies?.vuid ?? '').split("|",2)[0] ?? '') as string).replace(/-/g, "")
    api?.setHeader("X-VUID", vuid)

    // Update the access token from hte session
    if (status === 'authenticated' && token)
        api?.setAccessToken(token)

    // Just return the children
    return <>{ props.children }</>
}

export default AuthorizeApi