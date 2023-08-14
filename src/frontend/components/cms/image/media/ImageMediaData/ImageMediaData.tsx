import type { IContentComponent } from '@optimizely/cms/models'
import type { ImageMediaData } from 'schema'

import React from 'react'
import Image from 'next/image'
import { readValue as pv } from '@optimizely/cms/utils'

export const ImageMediaDataComponent : IContentComponent<ImageMediaData> = props =>
{
    const paddingTop : number = pv(props.content, "paddingTop") ?? 0
    const paddingBottom: number = pv(props.content, "paddingBottom") ?? 0
    const paddingLeft: number = pv(props.content, "paddingLeft") ?? 0
    const paddingRight: number = pv(props.content, "paddingRight") ?? 0
    const imageUrl : string = pv(props.content, "url") ?? ""
    const altText : string = pv(props.content, "altText") ?? pv(props.content, "name") ?? ""

    if (!imageUrl || imageUrl == "")
        return <></>

    return <Image src={imageUrl} alt={altText} placeholder="empty" sx={{ width: 1 }}/>
}

ImageMediaDataComponent.displayName = "Image from CMS"

export default ImageMediaDataComponent