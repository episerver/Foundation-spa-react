import type { AppType, AppProps } from 'next/app'
import type { ComponentProps, FunctionComponent, ComponentType } from 'react'
import type { EmotionCache } from '@emotion/cache';
import type { EmotionCritical } from '@emotion/server/create-instance';
import type { NextComponentType } from 'next';
import type { AppContextType, DocumentContext, DocumentInitialProps } from 'next/dist/shared/lib/utils';
import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document'
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from '../components/shared/Layout/createEmotionCache';
import { NextRouter } from 'next/router';

//#region Document depending types
type EmotionDocumentProps = {
    emotionStyles?: Omit<EmotionCritical, 'html'>
    emotionStyleTags?: JSX.Element[]
}
type EmotionAppProps<P = any> = AppProps<P> & { emotionCache?: EmotionCache }
export type EmotionApp<P = any, R extends NextRouter = NextRouter> = NextComponentType<AppContextType<R>, P, EmotionAppProps<P>>
//#endregion

//#region Configuration
const odp_id = process?.env?.NEXT_PUBLIC_ODP_KEY
const exp_id = process?.env?.NEXT_PUBLIC_EXP_PROJECT_ID
//#endregion

export class AppDocument extends Document<EmotionDocumentProps> {
    public render() {
        const lang = this.props.locale ?? 'en'
        // eslint-disable-next-line @next/next/no-sync-scripts
        const optimizelyWebEx = exp_id ? <script src={` https://cdn.optimizely.com/js/${ exp_id }.js`} /> : undefined
        const optimizelyDataPlatform = odp_id ? <script dangerouslySetInnerHTML={{__html: `var zaius = window['zaius']||(window['zaius']=[]);zaius.methods=["initialize","onload","customer","entity","event","subscribe","unsubscribe","consent","identify","anonymize","dispatch"];zaius.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);zaius.push(t);return zaius}};(function(){for(var i=0;i<zaius.methods.length;i++){var method=zaius.methods[i];zaius[method]=zaius.factory(method)}var e=document.createElement("script");e.type="text/javascript";e.async=true;e.src=("https:"===document.location.protocol?"https://":"http://")+"d1igp3oop3iho5.cloudfront.net/v2/${odp_id}/zaius-min.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)})(); `}} /> : undefined
        return <Html lang={ lang }>
              <Head>
                { optimizelyWebEx }
                { optimizelyDataPlatform }
                <meta name="emotion-insertion-point" />
                { this.props.emotionStyleTags }
              </Head>
              <body>
                <Main />
                <NextScript />
              </body>
            </Html>
    }

    public static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps & EmotionDocumentProps> 
    {
        const originalRenderPage = ctx.renderPage
        const cache = createEmotionCache()
        const { extractCriticalToChunks } = createEmotionServer(cache)

        ctx.renderPage = (opts) => originalRenderPage({
            ...opts,
            enhanceApp: (App: EmotionApp) => {
                return (props) => <App emotionCache={ cache } {...props} />
            }
        })

        const initialProps = await Document.getInitialProps(ctx)

        const emotionStyles = extractCriticalToChunks(initialProps.html);
        const emotionStyleTags = emotionStyles.styles.map((style) => (
            <style
                data-emotion={`${style.key} ${style.ids.join(" ")}`}
                key={style.key}
                dangerouslySetInnerHTML={{ __html: style.css }}
            />
        ));

        return {
            ...initialProps,
            emotionStyleTags,
        };
    }
}

export default AppDocument