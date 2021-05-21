import React from 'react';
import { Taxonomy, Services, useEpiserver } from '@episerver/spa-core';

type ImageBreakPoint = { code: 'img', imgWidth: string | number, format?: string, order?: number }
type SourceBreakPoint = { code: string, cssMedia: string, imgWidth: string | number, format?: string, order?: number }
type Breakpoint = ImageBreakPoint | SourceBreakPoint;

export type ResponsiveImageProps = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
    breakpoints: Breakpoint[]
    aspectRatio?: string,
    key?: string,
    quality?: number,
    upscale?: boolean
}

let responsiveImageId : number = 0;

function parseDimension(dimension: number | string) : [ number, string ]
{
    if (typeof(dimension) === 'number') return [ dimension, 'px' ];
    const size = parseFloat(dimension);
    if (isNaN(size)) return [ undefined, 'px' ];
    const unit = dimension.replace(size.toString(), '');
    return [ size, unit ];
}

function isImageAsset(iContent: Taxonomy.IContent) : boolean {
    return iContent?.contentType?.length > 0 && iContent.contentType[0].toLowerCase() === 'image';
}

export const ResponsiveContentImage : React.FunctionComponent<ResponsiveImageProps & {
    content: Taxonomy.IContent
}> = (props) => {
    if (isImageAsset(props.content)) {
        const imgUrl = Services.ContentLink.createHref(props.content);
        const altText : string = (typeof (props.content?.name) == 'string' ? props.content.name : props.content?.name?.value) || "image";
        return <ResponsiveImage alt={ altText } { ...props } src={ imgUrl } />
    }
}

export const ResponsiveImage : React.FunctionComponent<ResponsiveImageProps> = (props) => {

    if (props.srcSet) return <img {...props} />; //We already have a responsive definition, so keep that.
    const imgQuality = props.quality || 85;
    const keyprefix = `${ props.key || 'picture' }-${ ++responsiveImageId }-`

    const sources = props.breakpoints.sort((a,b) => {return (a.order || 0) - (b.order || 0); }).map(bp => {
        const key = keyprefix + '-' + bp.code;
        if (bp.code === 'img') 
            return <ResponsiveImageImg key={ key } src={ props.src } bp={ bp as ImageBreakPoint } ratio={ props.aspectRatio } imgQuality={ imgQuality } keyprefix={ key } className={ props.className } alt={ props.alt } />
        else
            return <ResponsiveImageSource key={ key } src={ props.src } bp={ bp as SourceBreakPoint } ratio={ props.aspectRatio } imgQuality={ imgQuality } keyprefix={ key } />
    }).filter(x => x);

    return <picture>
        { sources }
    </picture>
}

const ResponsiveImageSource : React.FunctionComponent<{
    src: string,
    bp: SourceBreakPoint,
    keyprefix: string,
    ratio: string,
    imgQuality: number
}> = (props) => 
{
    const bp = props.bp;
    const keyprefix = props.keyprefix;
    const ratio = props.ratio;
    const imgQuality = props.imgQuality;
    const ctx = useEpiserver();
    const imgUrl = new URL(props.src, ctx.getEpiserverURL());


    const srcProps : React.SourceHTMLAttributes<HTMLSourceElement> & { key?: string } = {
        media: bp.cssMedia,
        key: keyprefix + bp.code,
        style: {}
    };
    if (bp.format) {
        srcProps.type = "image/"+bp.format;
        imgUrl.searchParams.set('format', bp.format);
        srcProps.key += '-' + bp.format;
    }
    if (bp.imgWidth) {
        const [imgWidth, imgWidthUnit] = parseDimension(bp.imgWidth);
        if (imgWidthUnit.toLowerCase() === 'px') {
            imgUrl.searchParams.set('width', imgWidth.toString());
            if (ratio) {
                const [ h, v ] = ratio.split('/', 2).map(x => parseFloat(x));
                if (h && v) {
                    const imgHeight = Math.round((imgWidth/h)*v);
                    imgUrl.searchParams.set('height', imgHeight.toString());
                    imgUrl.searchParams.set('mode', 'crop');
                }
            }
        }
    }
    if (props.imgQuality) {
        imgUrl.searchParams.set('quality', imgQuality.toString());
    }
    if (ratio) srcProps.style.aspectRatio = ratio;
    srcProps.srcSet = imgUrl.href;
    return <source { ...srcProps }/>
}

const ResponsiveImageImg : React.FunctionComponent<{
    src: string,
    bp: ImageBreakPoint,
    keyprefix: string,
    ratio: string,
    imgQuality: number,
    className?: string,
    alt?: string
}> = (props) => 
{
    const bp = props.bp;
    const keyprefix = props.keyprefix;
    const ratio = props.ratio;
    const imgQuality = props.imgQuality;
    const ctx = useEpiserver();
    const imgUrl = new URL(props.src, ctx.getEpiserverURL());
    imgUrl.searchParams.set('upscale','false');

    const srcProps : React.ImgHTMLAttributes<HTMLImageElement> & { key?: string } = {
        key: keyprefix + bp.code,
        className: props.className,
        alt: props.alt,
        style: {}
    };
    if (bp.format) {
        imgUrl.searchParams.set('format', bp.format);
        srcProps.key += '-' + bp.format;
    }
    if (bp.imgWidth) {
        const [imgWidth, imgWidthUnit] = parseDimension(bp.imgWidth);
        if (imgWidthUnit.toLowerCase() === 'px') {
            imgUrl.searchParams.set('width', imgWidth.toString());
            if (ratio) {
                const [ h, v ] = ratio.split('/', 2).map(x => parseFloat(x));
                if (h && v) {
                    const imgHeight = Math.round((imgWidth/h)*v);
                    imgUrl.searchParams.set('height', imgHeight.toString());
                    imgUrl.searchParams.set('mode', 'crop');
                }
            }
        }
    }
    if (props.imgQuality) {
        imgUrl.searchParams.set('quality', imgQuality.toString());
    }
    if (ratio) srcProps.style.aspectRatio = ratio;
    srcProps.src = imgUrl.href;
    return <img { ...srcProps }/>
}

export default ResponsiveImage;