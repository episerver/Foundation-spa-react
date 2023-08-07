import type { FunctionComponent, PropsWithChildren } from 'react'
import { useSession } from 'next-auth/react'
import { useOptimizelyCms } from '@optimizely/cms/context'
import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useSWRConfig } from 'swr'

type EnhancedSessionData = (NonNullable<ReturnType<typeof useSession>['data']> & { at?: string }) | null
type EnhancedSessionHook = Omit<ReturnType<typeof useSession>, 'data'> & { data: EnhancedSessionData }

const DEBUG = process.env.NODE_ENV == 'development'

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
    const swr = useSWRConfig()

    // Read values
    const token = data?.at
    //const vuid = (((cookies?.vuid ?? '').split("|",2)[0] ?? '') as string).replace(/-/g, "")
    const vuid = ((cookies?.vuid ?? '') as string).replace(/-/g, "")

    // Process VUID
    useEffect(() => {
        if (status !== 'authenticated' && swr && api && (api.getHeader("X-VUID") != vuid || api.getQueryParam("vuid") != vuid)) {
            api?.setHeader("X-VUID", vuid)
            api?.setQueryParam("vuid", vuid)
            swr?.mutate(() => true)
            if (DEBUG) console.log("Received new VUID, updating SWR Cache", vuid)
        }
        return () => {
            api?.setHeader('X-VUID', "")
            api?.setQueryParam("vuid", "")
        }
    }, [ api, swr, vuid, status ])

    // Update the access token from the session
    useEffect(() => {
        if (api && swr && token && status === 'authenticated' && !api.hasAccessToken(token)) {
            api?.setAccessToken(token)
            swr?.mutate(() => true)
            if (DEBUG) console.log("Received new token, updating SWR Cache", token)
        }
        return () => {
            api?.setAccessToken("")
        }
    }, [ api, swr, status, token ])

    // Just return the children
    return <>{ props.children }</>
}

export default AuthorizeApi