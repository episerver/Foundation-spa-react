import React, { ReactNode, ReactNodeArray } from 'react'
import { ComponentTypes } from '@episerver/spa-core'
import VideoFileData from 'app/Models/Content/VideoFileData'

export default class VideoFile extends ComponentTypes.AbstractComponent<VideoFileData>
{
    public render() : ReactNode | ReactNodeArray | null
    {
        let vidUrl = this.getContext().getEpiserverUrl(this.props.data.contentLink.url);

        let classes : Array<string> = ['img-fluid'];
        if (this.props.className) { classes.push(this.props.className); }

        return <video autoPlay loop playsInline muted className={ classes.join(' ') }><source src={vidUrl} type="video/mp4" />The video tag is not supported</video>
    }
}