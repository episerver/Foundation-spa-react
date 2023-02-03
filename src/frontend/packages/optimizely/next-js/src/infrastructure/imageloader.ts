import type { ImageLoader } from 'next/image'

export const OptimizelyImageLoader : ImageLoader = props => {
    const imgUrl = new URL(props.src, 'http://localhost')
    if (props.width) 
        imgUrl.searchParams.set('width', `${props.width}`)

    imgUrl.searchParams.set('quality', `${ props.quality ?? 85 }`)

    return imgUrl.href
}