// Import React
import type { ComponentProps, FunctionComponent } from 'react'

// Import Next.JS & SWR
import type { AppProps } from 'next/app'
import type { NextRouter } from 'next/router'
import Head from 'next/head'
import { SWRConfig } from 'swr'                                    // SWR Context

// Import Next Auth
import { SessionProvider } from 'next-auth/react'             // Authentication session

// Import Optimizely CMS
import OptimizelyCmsContext from '@optimizely/cms/context'    // Optimizely Content Cloud Context
import ErrorBoundary from '@optimizely/cms/error-boundary'    // Optimizely Content Cloud Context

// Framework
import { CurrentContent } from '@framework/current-content'

// Local files
import { Layout } from '@components/shared/Layout'                 // Generic website layout
import { AuthorizeApi } from '@components/shared/Utils'     // Get the authorization API
import CmsComponents from '@components/cms'                 // Get the component cache to be used
import Website from 'website.cjs'
import '../styles/globals.css'

import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '../components/shared/Layout/createEmotionCache';

const CMS_DOMAIN = process.env.OPTIMIZELY_DXP_URL ?? ''
const DEBUG = process.env.NODE_ENV !== 'production';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

type AppType<P = {}> = FunctionComponent<AppProps<P>>

const MyApp : AppType<MyAppProps> = ({ Component, pageProps: { fallback, session, baseType, emotionCache = clientSideEmotionCache, ...pageProps }, router }) =>
{
    //Define the default locale for the context
    const defaultLocale = (router as NextRouter).locale ?? (router as NextRouter).defaultLocale ?? 'en'
    const requestPath = (router as NextRouter).asPath
    
    // Bulid the configuration for the SWR Library
    const swrConfig : ComponentProps<typeof SWRConfig>["value"] = { 
        fallback: fallback ?? {}, 
        suspense: false,
        onError(err, key, config) {
            console.error("SWR Caught Error", err, key, config)
        }, 
        shouldRetryOnError(err) {
            if (DEBUG) console.log("SWRConfig > shouldRetryOnError:", err)
            const is404 = (err as any)?.errorData?.code == 404
            return !is404
        }
    }

    // Create the application, using the following structure CMS > Error Boundary > Settings > Resolved Content > 
    const defaultSiteId = Website.id
    if (DEBUG) {
        console.groupCollapsed("Site - _App.js")
        console.log("Site - _App.js > SWR Config", swrConfig)
        console.log("Site - _App.js > CMS Domain", CMS_DOMAIN)
        console.log("Site - _App.js > Default locale", defaultLocale)
        console.log("Site - _App.js > Default site", defaultSiteId)
        console.log("Site - _App.js > Components", Object.getOwnPropertyNames(CmsComponents))
        console.log("Site - _App.js > Session", session)
        console.log("Site - _App.js > Base Type", baseType)
        console.log("Site - _App.js > PageProps", pageProps)
        console.groupEnd()
    }
    return <OptimizelyCmsContext cmsDomain={ CMS_DOMAIN } defaultBranch={ defaultLocale } components={ CmsComponents } defaultSiteId={ defaultSiteId } currentUrl={ requestPath } swrOptions={ swrConfig }>
        <CacheProvider value={emotionCache}>
            <Head>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <title>{ Website.name }</title>
                <meta name="x-component-type" content={ baseType } />
            </Head>
            <ErrorBoundary componentName='Optimizely CMS Root'>
                <SessionProvider session={ session } refetchOnWindowFocus refetchWhenOffline={ false } refetchInterval={ 120 } >
                    <AuthorizeApi>
                        <CurrentContent value={ pageProps.contentId }>
                            { baseType === 'Block' ? <Component {...pageProps} /> : <Layout><Component { ...pageProps }/></Layout> }
                        </CurrentContent>
                    </AuthorizeApi>
                </SessionProvider>
            </ErrorBoundary>
        </CacheProvider>
    </OptimizelyCmsContext>
}

export type MyAppProps = {
    /**
     * SWR Fallback data
     */
    fallback?: Record<string, any>

    /**
     * Session data
     */
    session?: ComponentProps<typeof SessionProvider>['session']

    /**
     * Base selected component
     */
    baseType?: string

    /**
     * The unique identifier for the currently 
     * rendered content item
     */
    contentId?: string

    /**
     * The currenlty selected locale used for rendering
     */
    locale?: string

    /**
     * Catch all allowing other properties to be injected
     */
    [otherProps: string]: any
}

export default MyApp