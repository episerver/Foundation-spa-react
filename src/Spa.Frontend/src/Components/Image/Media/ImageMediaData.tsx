import React, { ReactNode, ReactNodeArray } from 'react';
import { Core, ComponentTypes } from '@episerver/spa-core';
import ImageMediaDataData from 'app/Models/Content/ImageMediaDataData';

export default class ImageMediaData extends ComponentTypes.AbstractComponent<ImageMediaDataData>
{
    protected breakPoints: {[size: string]: { imgWidth: string, cssMedia: string}} = {
        xl: {
            cssMedia: "(min-width: 1410px)",
            imgWidth: "1920"
        },
        lg: {
            cssMedia: "(min-width: 960px)",
            imgWidth: "1410"
        },
        md: {
            cssMedia: "(min-width: 720px)",
            imgWidth: "960"
        },
        sm: {
            cssMedia: "(min-width: 540px)",
            imgWidth: "720"
        },
        img: {
            cssMedia: "(min-width: 1px)",
            imgWidth: "540"
        }
    };

    public render() : ReactNode {
        let cssClass : string = "img-fluid"
        if (this.props.className !== undefined) {
            cssClass = cssClass + " " + this.props.className
        }
        if (this.props.data.url !== null) {
            let imgUrl: URL = new URL(Core.DefaultContext.getEpiserverUrl(this.props.data.url));
            imgUrl.searchParams.set("upscale", "false"); //Never upscale an image, leave that to the browser
            imgUrl.searchParams.set("quality", "85"); //Lossy processing
            let webpUrl : URL = new URL(Core.DefaultContext.getEpiserverUrl(this.props.data.url));
            webpUrl.searchParams.set("upscale", "false"); //Never upscale an image, leave that to the browser
            webpUrl.searchParams.set("format", "webp"); //Format as WebP
            webpUrl.searchParams.set("quality", "85"); //Lossy processing

            let sources: ReactNodeArray = [];
            let keyPrefix : string = `img-${ this.props.data.contentLink.id }-`;
            for (let size in this.breakPoints)
            {
                imgUrl.searchParams.set("width", this.breakPoints[size].imgWidth);
                webpUrl.searchParams.set("width", this.breakPoints[size].imgWidth);
                if (size == "img") {
                    sources.push(<img src={imgUrl.href} className={ cssClass.trim() }  key={ keyPrefix + size } />);
                    sources.push(<source media={ this.breakPoints[size].cssMedia } srcSet={ webpUrl.href }  type="image/webp" key={ keyPrefix + size + '-webp'}/>);
                } else {
                    sources.push(<source media={ this.breakPoints[size].cssMedia } srcSet={ imgUrl.href }  key={ keyPrefix + size }/>);
                    sources.push(<source media={ this.breakPoints[size].cssMedia } srcSet={ webpUrl.href }  type="image/webp" key={ keyPrefix + size + '-webp'} />);
                }
            }
            //console.log(this.props.data);
            return <picture>
                {sources}
            </picture>
        }
        return <span className={ cssClass.trim() + " no-img" }/>;
    }
}