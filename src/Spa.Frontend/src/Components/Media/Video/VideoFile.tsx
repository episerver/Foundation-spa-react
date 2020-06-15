import React, { ReactNode, ReactNodeArray } from 'react'
import EpiComponent from '@episerver/spa-core/EpiComponent'
import VideoFileData from 'app/Models/Content/VideoFileData'

export default class VideoFile extends EpiComponent<VideoFileData>
{
    public render() : ReactNode | ReactNodeArray | null
    {
        //console.log(this.props.data);
        let vidUrl = this.getContext().getEpiserverUrl(this.props.data.contentLink.url);
        //let imgUrl = "";//this.getContext().getEpiserverUrl(this.props.data.previewImage.value.url);

        let classes : Array<string> = ['img-fluid'];
        if (this.props.className) { classes.push(this.props.className); }

        return <video autoPlay loop playsInline muted className={ classes.join(' ') }><source src={vidUrl} type="video/mp4" />The video tag is not supported</video>
    }
}