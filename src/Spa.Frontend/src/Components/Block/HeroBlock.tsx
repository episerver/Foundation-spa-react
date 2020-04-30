import React, { ReactNode } from 'react';
import CmsComponent from 'Episerver/Components/CmsComponent';
import EpiComponent from 'Episerver/EpiComponent';
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
            <CmsComponent context={this.props.context} contentLink={ background.value } className="d-cover" expandedValue={ background.expandedValue } />
            <div className="callout">
                <div className="container">
                    <div className="row">
                        <div className="col d-flex">
                        { this.renderCallOut() }
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }

    protected renderCallOut() : ReactNode
    {
        let callOutClasses : Array<string> = ['callout-content','mt-5'];
        let callOutStyles : any = {
            opacity: this.props.data.callout.calloutOpacity.value
        };
        if (this.props.data.callout.backgroundColor) {
            callOutStyles.backgroundColor = this.props.data.callout.backgroundColor;
        }
        switch (this.props.data.callout.calloutContentAlignment.value) {
            case "right":
                callOutClasses.push('mr-0');
                callOutClasses.push('ml-auto');
                callOutClasses.push('text-right');
                break;
            case "center":
                callOutClasses.push('mr-auto');
                callOutClasses.push('ml-auto');
                callOutClasses.push('text-center');
                break;
            case "left":
            default:
                callOutClasses.push('mr-auto');
                callOutClasses.push('ml-0');
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
        return <div className={ callOutClasses.join(' ') } style={ callOutStyles } dangerouslySetInnerHTML={ this.htmlObject(this.props.data.callout.calloutContent.value) } ></div>;
    }
}