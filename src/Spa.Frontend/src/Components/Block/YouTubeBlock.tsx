import React, { ReactNode } from 'react';
import EpiComponent from '@episerver/spa-core/EpiComponent';
import YouTubeBlockData from 'app/Models/Content/YouTubeBlockData';

export default class YouTubeBlock extends EpiComponent<YouTubeBlockData> {

    public render() : ReactNode
    {
        let itemStyles : any = {}; /*{
            paddingTop: this.props.data.paddingLeft.value + 'px',
            paddingRight: this.props.data.paddingRight.value + 'px',
            paddingBottom: this.props.data.paddingBottom.value + 'px',
            paddingLeft: this.props.data.paddingLeft.value + 'px'
        }*/

        return <div className="col-12">
            <div className="embed-responsive embed-responsive-16by9" style={ itemStyles }>
                <iframe className="embed-responsive-item" src={ this.props.data.youTubeLink.value }></iframe>
            </div>
        </div>;
    }
}