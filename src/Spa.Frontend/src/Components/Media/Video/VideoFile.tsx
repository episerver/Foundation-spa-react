import React, { ReactNode, ReactNodeArray } from 'react'
import EpiComponent from 'Episerver/EpiComponent'
import VideoFileData from 'app/Models/Content/VideoFileData'

export default class VideoFile extends EpiComponent<VideoFileData>
{
    public render() : ReactNode | ReactNodeArray | null
    {
        //console.log(this.props.data);
        let vidUrl = this.getContext().getEpiserverUrl(this.props.data.contentLink.url);
        //let imgUrl = "";//this.getContext().getEpiserverUrl(this.props.data.previewImage.value.url);

        return <video autoPlay loop playsInline muted className="img-fluid w-100"><source src={vidUrl} type="video/mp4" />The video tag is not supported</video>
    }
}