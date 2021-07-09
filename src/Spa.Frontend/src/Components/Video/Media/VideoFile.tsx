import React, { FunctionComponent } from 'react'
import { useEpiserver } from '@episerver/spa-core'
import { VideoFileProps } from 'app/Models/Content/VideoFileData'


export const VideoFile : FunctionComponent<VideoFileProps> = (props) => {
    const ctx = useEpiserver();
    const vidUrl = ctx.getEpiserverUrl(props.contentLink);
    const classes : Array<string> = ['img-fluid'];
    if (props.className) classes.push(props.className);
    return <video autoPlay loop playsInline muted className={ classes.join(' ') }><source src={ vidUrl.href } type="video/mp4" />The video tag is not supported</video>
}

export default VideoFile;