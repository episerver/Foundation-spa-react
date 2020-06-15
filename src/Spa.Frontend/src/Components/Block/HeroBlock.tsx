import React, { ReactNode } from 'react';
import CmsComponent from '@episerver/spa-core/Components/CmsComponent';
import EpiComponent from '@episerver/spa-core/EpiComponent';
import HeroBlockData from 'app/Models/Content/HeroBlockData';
import './HeroBlock.scss';

export default class HeroBlock extends EpiComponent<HeroBlockData> {

    public render() : ReactNode
    {
        let background = this.props.data.mainBackgroundVideo.value == null ? 
                                this.props.data.backgroundImage : 
                                this.props.data.mainBackgroundVideo;

        let cssClasses : Array<string> = ['hero-block'];
        if (this.props.data.margin?.value) cssClasses.push(this.props.data.margin.value);
        if (this.props.data.padding?.value) cssClasses.push(this.props.data.padding.value);
        if (this.props.data.blockRatio?.value) cssClasses.push(`r-${this.props.data.blockRatio.value}`);

        return <div className={cssClasses.join(' ')}>
            <div className="hero-block__overlay"/>
            <CmsComponent context={this.props.context} contentLink={ background.value } className="d-cover" expandedValue={ background.expandedValue } />
            <div className="callout">
                <div className="container h-100">
                    <div className="row h-100">
                        { this.renderCallOutColumn() }
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
}