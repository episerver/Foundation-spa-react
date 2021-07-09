import React, { CSSProperties, FunctionComponent as FC } from 'react';
import { Components, usePropertyReader } from '@episerver/spa-core';
import { HeroBlockProps } from 'app/Models/Content/HeroBlockData';
import { HeroBlockCalloutProps } from 'app/Models/Content/HeroBlockCalloutData';
import { readContainerStyles, stringToTextAlign } from 'app/Models/IContentWithBaseStyles';

// import './HeroBlock.scss';

export const HeroBlock : FC<HeroBlockProps> = (props) =>
{
    const read = usePropertyReader();
    const [cssClasses, cssProps] = readContainerStyles(props.data);
    const callout = read(props.data, "callout");

    if (cssProps.opacity) delete cssProps.opacity;

    return <div className={ cssClasses.join(' ') }>
        <div className="hero-block" style={ cssProps }>
            <HeroBlockImage { ...props } />
            <HeroBlockOverlay { ...props } />
            <HeroBlockCallout data={ callout } contentLink={ callout.contentLink } />
        </div>
    </div>
}
export const HeroBlockImage : FC<HeroBlockProps> = (props) => {
    const read = usePropertyReader();
    const background = read(props.data, "mainBackgroundVideo") ? 
                                props.data.mainBackgroundVideo :
                                props.data.backgroundImage;

    if (!background) return null;
    return <div className="hero-block__image">
        <Components.EpiserverContent contentLink={ background } className="d-cover" />
    </div>
}
export const HeroBlockOverlay : FC<HeroBlockProps> = (props) => {
    const read = usePropertyReader();
    const overlayStyles : CSSProperties = {};
    overlayStyles.backgroundColor = read(props.data, "backgroundColor");
    overlayStyles.opacity = read(props.data, "blockOpacity");
    return <div className="hero-block__overlay" style={overlayStyles}/>
}
export const HeroBlockCallout : FC<HeroBlockCalloutProps> = (props) =>
{
    const read = usePropertyReader();
    if (!props.data) return null;
    const [calloutClasses, calloutBaseStyles] = readContainerStyles(props.data);

    const screenWidthStyles : CSSProperties = {};
    screenWidthStyles.justifyContent = read(props.data, "calloutPosition");

    const calloutStyles : CSSProperties = {
        ...calloutBaseStyles,
        color: read(props.data, "calloutTextColor"),
        textAlign: stringToTextAlign(read(props.data, "calloutContentAlignment")),
    };
    return <div className="screen-width-wrapper">
        <div className="hero-block__callout screen-width-container" style={ screenWidthStyles }>
                <div className={calloutClasses.join(' ')} style={calloutStyles}>
                    <div className="hero-block__callout-content"  dangerouslySetInnerHTML={ { __html: read(props.data, "calloutContent") } }></div>
                </div>
        </div>
    </div>
}
export default HeroBlock;