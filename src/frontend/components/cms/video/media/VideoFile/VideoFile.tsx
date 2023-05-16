import type { CSSProperties } from 'react'
import type { IContentComponent } from '@optimizely/cms'
import React from 'react'
import { VideoFile } from 'schema'
import { readValue as pv, ContentReference } from '@optimizely/cms/utils'

export const VideoFileComponent : IContentComponent<VideoFile> = ({ content }) =>
{
    const videoAutoPlay = pv(content, "autoplay") ?? false
    const videoDisplayControls = pv(content, "displayControls") ?? false
    const videoLoop = videoAutoPlay
    const videoUrl = content ? ContentReference.createContentUrl(content, true) : undefined
    const videoAlt = pv(content, "name") ?? undefined

    const videoStyles : CSSProperties = {
        position: 'absolute', 
        height: '100%', 
        width: '100%', 
        inset: '0px', 
        objectFit: 'cover', 
        color: 'transparent',
    }

    if (!content)
        return <></>

    return <video src={ videoUrl } autoPlay={ videoAutoPlay } loop={ videoLoop } controls={ videoDisplayControls } style={ videoStyles } muted={ !videoAutoPlay } aria-label={ videoAlt }/>
}

export default VideoFileComponent