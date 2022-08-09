import '../styles/globals.css'

import type { AppProps } from 'next/app'

import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'           // Authentication session
import { Provider as Optimizely } from '@optimizely/cms'    // Optimizely Content Cloud Context
import { SWRConfig } from 'swr'                             // SWR Context

import { Layout } from '@components/shared'                 // Generic website layout
import { AuthorizeApi } from '@components/shared/Utils'
//import optimizely from '@optimizely/optimizely-sdk';

function MyApp({ Component, pageProps: { fallback, session, baseType, components, ...pageProps } }: AppProps) {
    fallback = fallback ?? {}
    //const optimizelyClient = optimizely.createInstance({
    //    sdkKey: "<Your_SDK_KEY>" // Provide the sdkKey of your desired environment here
    //});
    //optimizelyClient.getEnabledFeatures('abc', {});

    //<Script src="https://cdn.optimizely.com/js/20293561231.js" defer strategy='beforeInteractive' />
    return <Optimizely.ContextProvider cmsDomain={ process.env.OPTIMIZELY_DXP_URL ?? '' } defaultBranch={ pageProps?.locale } currentContentId={ pageProps.contentId }>
        <SessionProvider session={session} refetchOnWindowFocus refetchInterval={ 300 } >
            <AuthorizeApi>
                <Head>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <title>Foundation</title>
                </Head>
                <SWRConfig value={{ fallback }} >
                    { baseType === 'Block' ? 
                        <Component { ...pageProps } /> : 
                        <Layout contentId={ pageProps.contentId ?? '-' }><Component { ...pageProps } /></Layout> }
                </SWRConfig>
            </AuthorizeApi>
        </SessionProvider>
    </Optimizely.ContextProvider>
}

export default MyApp