import React, { useState, useEffect } from 'react'
import type { FunctionComponent } from 'react'
import OptimizelyContext from './context'
import type { ContextType as OptimizelyContextType } from './context'
import PeeriusHeadless, { TrackBuilder } from '../peeriusheadless'
import { Zaius } from '@zaiusinc/web-sdk'

export type ContextProviderProps = {
    trackerDomain ?: string
    trackerName ?: string
    enableDebug ?: boolean
    defaultLocale ?: string
    odpJsUrl ?: string
    odpId ?: string
}

export const ContextProvider : FunctionComponent<ContextProviderProps> = (props) =>
{
    const [ lib, setLib ] = useState<PeeriusHeadless>()
    const [ lang, setLang ] = useState<string>(props.defaultLocale ?? "en")
    const [ debug, setDebug ] = useState<boolean>(props.enableDebug === true)
    const trackerUrl = `https://${ props.trackerDomain }/tracker/headless.page`
    const trackerName = props.trackerName ?? 'PeeriusHeadless'
    const odpId = props.odpId ?? ''
    const odpJsUrl = props.odpJsUrl

    // Initialize Optimizely Data Platform
    useEffect(() => {// Only use in browser
        Zaius.initialize({ 
            trackerId: odpId ?? '',
            jsUrl: odpJsUrl
        })
    }, [ odpId, odpJsUrl ])

    // Initialize Optimizely Product Recs
    useEffect(() => {
        if ((window as Window & { [key: string]: any})[trackerName] &&
                (window as Window & { [key: string]: any})[trackerName].track)
        {
            if (debug) console.log("Injecting Optimizely scripts - Skipped as scripts have already loaded")
            setLib((window as Window & { [key: string]: any})[trackerName])
            return
        }

        const script = document.createElement('script')
    
        script.src = trackerUrl
        script.async = true
        script.onload = () => setLib((window as Window & { [key: string]: any})[trackerName])
    
        if (debug) console.log("Injecting Optimizely scripts")
        document.body.appendChild(script)
    
        return () => {
          if (debug) console.log("Removing Optimizely scripts")
          document.body.removeChild(script)
        }
      }, [trackerUrl, trackerName, debug])

    // Create context container
    const value : OptimizelyContextType = {
        lib,
        lang,
        debug,
        odp: Zaius,
        actions: {
            setLang,
            setDebug,
            track: (data: TrackBuilder) => {
                const event = data.build()
                if (debug) console.log("Track", event)
                Zaius.event("pageview", event)
                if (event.pageType == "product" && (event as any).product?.refCode)
                    Zaius.event("product", { action: "detail", product_id: (event  as any).product.refCode, ...event })

                return lib?.track(event) ?? null
            },

            //@ts-ignore The signatures of the recommend methods are actually identical, yet as a result of the overloads TypeScript starts complaining
            recommend: (pageTypeId, pageId, widgetId) => lib?.recommend(pageTypeId, pageId, widgetId) ?? null,

            trackAndRecommend: (data: TrackBuilder) => 
            {
                const event = data.build()
                if (debug) console.log("Track & Recommend", event)
                Zaius.event("pageview", event)
                if (event.pageType == "product" && (event as any).product?.refCode)
                    Zaius.event("product", { action: "detail", product_id: (event  as any).product.refCode, ...event })
                return lib?.trackAndRecommend(event) ?? null
            }
        },
        build: {
            home: () => lib ? (new lib.HomeBuilder().lang(lang)) : null,
            other: () => lib ? (new lib.OtherBuilder().lang(lang)) : null,
            product: (sku) => lib ? (new lib.ProductBuilder().lang(lang).product(sku)) : null,
            basket: (basket) => lib ? (new lib.BasketBuilder().lang(lang).basket(basket)) : null
        },
        isReady: lib ? true : false
    }
    
    return <OptimizelyContext.Provider value={ value }>{ props.children }</OptimizelyContext.Provider>
}
ContextProvider.displayName = "Optimizely: Optimization Provider"
ContextProvider.defaultProps = {
    trackerDomain: "partnerdemo.peerius.com",
    trackerName: "PeeriusHeadless",
    defaultLocale: "en",
    enableDebug: false,
    odpId: ""
}
export default ContextProvider;