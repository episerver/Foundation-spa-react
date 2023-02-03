import type { FunctionComponent } from 'react'
import type { DocumentProps } from 'next/document'
import { Html, Head, Main, NextScript } from 'next/document'

export const AppDocument : FunctionComponent<DocumentProps> = props => {
    const odp_id = process.env.NEXT_PUBLIC_ODP_KEY ?? 'ZZZZZZZ-ZZZZZZZZZZZZZZ'
    const exp_id = process.env.NEXT_PUBLIC_EXP_PROJECT_ID ?? '00000000000'
    const exp_url = `https://cdn.optimizely.com/js/${ exp_id }.js`
    return <Html>
        <Head>
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