import React, { ReactNode, ReactNodeArray, CSSProperties } from "react";
import { Components, ComponentTypes, Services } from '@episerver/spa-core';
import TeaserBlockData, { TeaserBlockProps } from 'app/Models/Content/TeaserBlockData';
import './TeaserBlock.scss';

/**
 * Get the CSS Classes to be applied to the main div, based upon the
 * block configuration.
 * 
 * @returns {Array<string>} The list of CSS Classes
 */
const getBlockClasses = (props: TeaserBlockProps) : Array<string> =>
{
    let classes : Array<string> = [
        'teaserblock',
        'h-100',
    ];
    if (props.data.margin?.value) classes.push(props.data.margin.value);
    if (props.data.padding?.value) classes.push(props.data.padding.value);
    return classes;
}

/**
 * Create the CSS Rules to be applied to the div, based upon the block
 * configuration.
 * 
 * @returns {CSSProperties} The CSS Rules
 */
const getBlockStyles = (props: TeaserBlockProps) : CSSProperties =>
{
    return {
        "backgroundColor": props.data.backgroundColor?.value || "transparent",
        "opacity": props.data.blockOpacity?.value || 1
    }
}

export const TeaserBlock : React.FunctionComponent<TeaserBlockProps> = (props) => {

    let imageOne = null;
    if (props.data.image?.value)
        imageOne = <div className="col-4">
        <div  style={ {maxWidth: `${props.data.imageSize.value}%`} }>
            <Components.Property iContent={ props.data } field="image" />
        </div>
    </div>
    let imageTwo = null;
    if (props.data.secondImage?.value)
        imageTwo = <div className="col-4">
            <div  style={ {maxWidth: `${props.data.secondImageSize.value}%`} }>
                <Components.Property iContent={ props.data } field="secondImage" />
            </div>
        </div>

    const teaserContent = <div className="row">
        { imageOne }
        <div className={`col-${ imageOne ? '8' : '12' } d-flex align-items-center`}>
            <div className="teaser-title" style={ { color: props.data.headingColor?.value, 
                fontSize: props.data.headingSize?.value + 'pt',
                textDecoration: props.data.headingStyle?.value } }><Components.Property iContent={ props.data } field="heading" /></div>
        </div>
        { imageTwo }
        <div className={`col-${ imageTwo ? '8' : '12' }`} style={ { color: props.data.textColor?.value || props.data.headingColor?.value } }>
            <Components.Property iContent={ props.data } field="text" />
        </div>
    </div>;

    if (props.data.link?.value)
        return <a href={ Services.ContentLink.createHref(props.data.link.value) } className={ getBlockClasses(props).join(' ') } style={ getBlockStyles(props)}>{ teaserContent }</a>
    return <div className={ getBlockClasses(props).join(' ') } style={ getBlockStyles(props) }>{ teaserContent }</div>
}
export default TeaserBlock;