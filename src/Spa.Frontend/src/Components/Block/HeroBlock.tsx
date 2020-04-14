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

        return <div className={cssClasses.join(' ')}>
            <CmsComponent context={this.props.context} contentLink={ background.value } className="d-block w-100" expandedValue={ background.expandedValue } />
            <div className="callout">
                <div className="container">
                    <div className="row">
                        <div className="col">
                        { this.renderCallOut() }
                        </div>
                    </div>
                </div>
            </div>
        </div>;
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
            case "Right":
                callOutClasses.push('mr-0');
                callOutClasses.push('ml-auto');
                break;
            case "Center":
                callOutClasses.push('mr-auto');
                callOutClasses.push('ml-auto');
                break;
            case "Left":
            default:
                callOutClasses.push('mr-auto');
                callOutClasses.push('ml-0');
                break;
        }
        switch (this.props.data.callout.calloutTextColor.value) {
            case "Dark":
                callOutClasses.push('text-dark');
                break;
            default:
                callOutClasses.push('text-light');
                callOutClasses.push('bg-dark');
                break;
        }
        return <div className={ callOutClasses.join(' ') } style={ callOutStyles } dangerouslySetInnerHTML={ this.htmlObject(this.props.data.callout.calloutContent.value) } ></div>;
    }
}