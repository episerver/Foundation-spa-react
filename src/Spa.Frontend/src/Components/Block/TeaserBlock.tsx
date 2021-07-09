import React, { FunctionComponent, CSSProperties } from "react";
import { Components, Services, Taxonomy } from '@episerver/spa-core';
import { TeaserBlockProps } from 'app/Models/Content/TeaserBlockData';
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
    const margin = Taxonomy.Property.readPropertyValue(props.data, "margin");
    const padding = Taxonomy.Property.readPropertyValue(props.data, "padding");
    if (margin) classes.push(margin);
    if (padding) classes.push(padding);
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
    const backgroundColor = Taxonomy.Property.readPropertyValue(props.data, "backgroundColor");
    const opacity = Taxonomy.Property.readPropertyValue(props.data, "blockOpacity");
    return {
        "backgroundColor": backgroundColor || "transparent",
        "opacity": opacity || 1
    }
}

export const TeaserBlock : FunctionComponent<TeaserBlockProps> = (props) => {

    const imageOne = (() => {
        const image = Taxonomy.Property.readPropertyValue(props.data, "image");
        const imageSize = Taxonomy.Property.readPropertyValue(props.data, "imageSize");
        if (!image) return null;
        return <div className="col-4">
            <div  style={ {maxWidth: `${ imageSize }%`} }>
                <Components.Property iContent={ props.data } field="image" />
            </div>
        </div>
    })();
    const imageTwo = (() => {
        const image = Taxonomy.Property.readPropertyValue(props.data, "secondImage");
        const imageSize = Taxonomy.Property.readPropertyValue(props.data, "secondImageSize");
        if (!image) return;
        return <div className="col-4">
            <div  style={ {maxWidth: `${ imageSize }%`} }>
                <Components.Property iContent={ props.data } field="secondImage" />
            </div>
        </div>
    })();

    const headingColor = Taxonomy.Property.readPropertyValue(props.data, "headingColor");
    const headingSize = Taxonomy.Property.readPropertyValue(props.data, "headingSize");
    const headingStyle = Taxonomy.Property.readPropertyValue(props.data, "headingStyle");
    const textColor = Taxonomy.Property.readPropertyValue(props.data, "textColor");
    const link = Taxonomy.Property.readPropertyValue(props.data, "link");

    const teaserContent = <div className="row">
        { imageOne }
        <div className={`col-${ imageOne ? '8' : '12' } d-flex align-items-center`}>
            <div className="teaser-title" style={ { color: headingColor, 
                fontSize: headingSize + 'pt',
                textDecoration: headingStyle } }><Components.Property iContent={ props.data } field="heading" /></div>
        </div>
        { imageTwo }
        <div className={`col-${ imageTwo ? '8' : '12' }`} style={ { color: textColor || headingColor } }>
            <Components.Property iContent={ props.data } field="text" />
        </div>
    </div>;

    if (link)
        return <a href={ Services.ContentLink.createHref(link) } className={ getBlockClasses(props).join(' ') } style={ getBlockStyles(props)}>{ teaserContent }</a>
    return <div className={ getBlockClasses(props).join(' ') } style={ getBlockStyles(props) }>{ teaserContent }</div>
}
export default TeaserBlock;