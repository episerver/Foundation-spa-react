import '../styles/globals.css'

import type { AppProps } from 'next/app'
import Head from 'next/head'

import { SessionProvider } from 'next-auth/react'           // Authentication session
import { Provider as Optimizely } from '@optimizely/cms'    // Optimizely Content Cloud Context
import * as SWR from 'swr'                             // SWR Context

import { Layout } from '@components/shared'                 // Generic website layout
import { AuthorizeApi } from '@components/shared/Utils'     // Get the authorization API
import CmsComponents from '@components/cms'                 // Get the component cache to be used

function MyApp({ Component, pageProps: { fallback, session, baseType, components, ...pageProps } }: AppProps) {
    fallback = fallback ?? {}
    return <Optimizely.ContextProvider cmsDomain={ process.env.OPTIMIZELY_DXP_URL ?? '' } defaultBranch={ pageProps?.locale } currentContentId={ pageProps.contentId } components={ CmsComponents }>
        <SessionProvider session={session} refetchOnWindowFocus refetchInterval={ 300 } >
            <AuthorizeApi>
                <Head>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <title>Foundation</title>
                </Head>
                <SWR.SWRConfig value={{ fallback }} >
                    { baseType === 'Block' ? 
                        <Component { ...pageProps } /> : 
                        <Layout contentId={ pageProps.contentId ?? '-' }><Component { ...pageProps } /></Layout> }
                </SWR.SWRConfig>
            </AuthorizeApi>
        </SessionProvider>
    </Optimizely.ContextProvider>
}

export default MyApp
