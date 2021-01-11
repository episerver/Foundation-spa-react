import React, { CSSProperties, ReactNode } from 'react';
import { Components, ComponentTypes } from '@episerver/spa-core';
import HeroBlockData from 'app/Models/Content/HeroBlockData';
import './HeroBlock.scss';

export default class HeroBlock extends ComponentTypes.AbstractComponent<HeroBlockData> {

    public render() : ReactNode
    {

        //console.warn(this.props);

        let background = this.props.data.mainBackgroundVideo.value == null ? 
                                this.props.data.backgroundImage : 
                                this.props.data.mainBackgroundVideo;

        let cssClasses : Array<string> = [];
        if (this.props.data.margin?.value) cssClasses.push(this.props.data.margin.value);
        if (this.props.data.padding?.value) cssClasses.push(this.props.data.padding.value);
        //if (this.props.data.blockRatio?.value) cssClasses.push(`r-${this.props.data.blockRatio.value}`);

        let calloutClasses : Array<string> = ['callout'];
        if(this.props.data.callout.margin?.value) calloutClasses.push(this.props.data.callout.margin.value);
        if(this.props.data.callout.padding?.value) calloutClasses.push(this.props.data.callout.padding.value);

        let innerContainerStyles : CSSProperties = {};
        //console.log(this.props.data.blockRatio);
        switch(this.props.data.blockRatio.value){
            case '5:1':
                innerContainerStyles.paddingBottom = '20%';
                break;
            case '4:1':
                innerContainerStyles.paddingBottom = '25%';
                break;
            case '3:1':
                innerContainerStyles.paddingBottom = '33%';
                break;
            case '16:9':
                innerContainerStyles.paddingBottom = '55%';
                break;
            case '3:2':
                innerContainerStyles.paddingBottom = '65%';
                break;
            case '4:3':
                innerContainerStyles.paddingBottom = '75%';
                break;
            case '1:1':
                innerContainerStyles.paddingBottom = '100%';
                break;
            case '2:3':
                innerContainerStyles.paddingBottom = '150%';
                break;
            case '9:16':
                innerContainerStyles.paddingBottom = '175%';
                break;
            default:
                //console.log("Attempting Padding Set");
                innerContainerStyles.paddingBottom = '50%';
                break;
        }

        let overlayStyles : any = {};
        overlayStyles.backgroundColor = this.props.data.backgroundColor.value;
        overlayStyles.opacity = this.props.data.blockOpacity.value;

        //console.log(overlayStyles);

        let screenWidthStyles : any = {};
        screenWidthStyles.justifyContent = this.props.data.callout.calloutPosition.value;

        const calloutStyles : any = {
            color: this.props.data.callout.calloutTextColor.value,
            textAlign: this.props.data.callout.calloutContentAlignment.value,
            backgroundColor: this.props.data.callout.backgroundColor.value
        };


        let blockId : string = 'hero-block-' + this.props.data.contentLink.id;

        return <div className={cssClasses.join(' ')} id={blockId} data-blockid={this.props.data.contentLink.id} data-name={this.props.data.name}>
            <div className="hero-block" style={innerContainerStyles}>
                <div className="hero-block__image">
                    <Components.EpiserverContent context={this.props.context} contentLink={ background.value } className="d-cover" expandedValue={ background.expandedValue } />
                </div>
            
                <div className="hero-block__overlay" style={overlayStyles}/>
                <div className="screen-width-wrapper">
                    <div className="hero-block__callout screen-width-container" style={screenWidthStyles}>
                        {this.props.data.link?.value &&
                            <div className="hero-block-link" onClick={this.goToLink.bind(this)}></div>
                        }
                        <div className={calloutClasses.join(' ')} style={calloutStyles}>
                            <div className="hero-block__callout-content"  dangerouslySetInnerHTML={ this.htmlObject(this.props.data.callout.calloutContent.value) }></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }

    protected renderCallOutColumn() : ReactNode
    {
        let columnClasses : Array<string> = ['col', 'd-flex'];
        switch (this.props.data.callout.calloutContentAlignment.value) {
            case "right":
                columnClasses.push('justify-content-end');
                break;
            case "center":
                columnClasses.push('justify-content-center');
                break;
            case "left":
            default:
                columnClasses.push('justify-content-start');
                break;
        }
        switch (this.props.data.callout.calloutPosition.value) {
            case "flex-start":
                columnClasses.push('align-items-start');
                break;
            case "flex-end":
                columnClasses.push('align-items-end');
                break;
            case "center":
            default:
                columnClasses.push('align-items-center');
                break;
        }
        return <div className={ columnClasses.join(' ') }>{ this.renderCallOut() }</div>
    }

    protected renderCallOut() : ReactNode
    {
        let callOutClasses : Array<string> = ['callout-content'];
        let callOutStyles : any = {
            opacity: this.props.data.callout.calloutOpacity.value
        };
        if (this.props.data.callout.backgroundColor) {
            callOutStyles.backgroundColor = this.props.data.callout.backgroundColor;
        }
        switch (this.props.data.callout.calloutContentAlignment.value) {
            case "right":
                callOutClasses.push('text-right');
                break;
            case "center":
                callOutClasses.push('text-center');
                break;
            case "left":
            default:
                callOutClasses.push('text-left');
                break;
        }
        switch (this.props.data.callout.calloutTextColor.value) {
            case "Dark":
                callOutClasses.push('text-dark');
                break;
            default:
                callOutClasses.push('text-light');
                break;
        }
        return <div className={ callOutClasses.join(' ') } style={ callOutStyles } dangerouslySetInnerHTML={ this.htmlObject(this.props.data.callout.calloutContent.value) } />;
    }

    goToLink = () => {
        location.href = this.props.data.link.value;
    }
}