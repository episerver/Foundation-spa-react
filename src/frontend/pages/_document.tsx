import type { FunctionComponent } from 'react'
import type { DocumentProps } from 'next/document'
import { Html, Head, Main, NextScript } from 'next/document'
import * as React from 'react';
import Document, { DocumentContext } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import type { AppType } from 'next/app';
import createTheme from '../components/shared/Layout/theme';
import createEmotionCache from '../components/shared/Layout/createEmotionCache';
import type { MyAppProps } from './_app';

const theme = createTheme('light')

interface MyDocumentProps extends DocumentProps {
  emotionStyleTags: JSX.Element[];
}

export const AppDocument : FunctionComponent<MyDocumentProps> = props => {
    const { emotionStyleTags } = props
    const odp_id = process.env.NEXT_PUBLIC_ODP_KEY ?? 'ZZZZZZZ-ZZZZZZZZZZZZZZ'
    const exp_id = process.env.NEXT_PUBLIC_EXP_PROJECT_ID ?? '00000000000'
    const exp_url = `https://cdn.optimizely.com/js/${ exp_id }.js`
    return <Html>
        <Head>
            <meta name="theme-color" content={theme.palette.primary.main} />
            <link rel="shortcut icon" href="/favicon.ico" />
            <meta name="emotion-insertion-point" content="" />
            { emotionStyleTags }
            <script type="text/javascript" dangerouslySetInnerHTML={{
              __html: `
                // Optimizely Data Platform
                var zaius = window['zaius']||(window['zaius']=[]);zaius.methods=["initialize","onload","customer","entity","event","subscribe","unsubscribe","consent","identify","anonymize","dispatch"];zaius.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);zaius.push(t);return zaius}};(function(){for(var i=0;i<zaius.methods.length;i++){var method=zaius.methods[i];zaius[method]=zaius.factory(method)}var e=document.createElement("script");e.type="text/javascript";e.async=true;e.src=("https:"===document.location.protocol?"https://":"http://")+"d1igp3oop3iho5.cloudfront.net/v2/${ odp_id }/zaius-min.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)})();
                
                // Edits to this script should only be made below this line.
                zaius.event('pageview');
            `}} />
            { /* eslint-disable-next-line @next/next/no-sync-scripts */ }
            <script src={exp_url} />
        </Head>
        <body>
            <Main />
            <NextScript />
        </body>
    </Html>
}

export default AppDocument


// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
//@ts-ignore Ignore errors
AppDocument.getInitialProps = async (ctx: DocumentContext) => {
    // Resolution order
    //
    // On the server:
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. document.getInitialProps
    // 4. app.render
    // 5. page.render
    // 6. document.render
    //
    // On the server with error:
    // 1. document.getInitialProps
    // 2. app.render
    // 3. page.render
    // 4. document.render
    //
    // On the client
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. app.render
    // 4. page.render
  
    const originalRenderPage = ctx.renderPage;
  
    // You can consider sharing the same Emotion cache between all the SSR requests to speed up performance.
    // However, be aware that it can have global side effects.
    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);
  
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App: React.ComponentType<React.ComponentProps<AppType> & MyAppProps>) =>
          function EnhanceApp(props) {
            return <App emotionCache={cache} {...props} />;
          },
      });
  
    const initialProps = await Document.getInitialProps(ctx);
    // This is important. It prevents Emotion to render invalid HTML.
    // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => (
      <style
        data-emotion={`${style.key} ${style.ids.join(' ')}`}
        key={style.key}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    ));
  
    return {
      ...initialProps,
      emotionStyleTags,
    };
  };