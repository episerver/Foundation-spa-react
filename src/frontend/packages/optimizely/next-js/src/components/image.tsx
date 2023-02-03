import React from 'react'
import NextJsImage from 'next/image'
import type { ImageProps } from 'next/image'
import { OptimizelyImageLoader } from '..'
import type { ContentReference } from '@optimizely/cms/models'
import { ContentReference as CRUtils } from '@optimizely/cms/utils'

type Extend<Base, Extension> = Omit<Base, keyof Extension> & Extension
type OptiImageProps = Extend<Omit<ImageProps, 'loader'>, { src: ContentReference }>

export const Image : React.FC<OptiImageProps> = props => {
    let newSrc : string = CRUtils.createContentUrl(props.src) ?? "#image"

    const imgProps = { 
        ...props, 
        src: newSrc, 
        loader: OptimizelyImageLoader 
    }

    return <NextJsImage { ...imgProps } />
}
Image.displayName = "Optimizely CDN Image Delivery"