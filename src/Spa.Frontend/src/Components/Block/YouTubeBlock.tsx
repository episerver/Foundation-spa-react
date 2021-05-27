import React, { FunctionComponent, useState } from 'react';
import ReactPlayer  from 'react-player';
import { YouTubeBlockProps } from 'app/Models/Content/YouTubeBlockData';

export const YouTubeBlock : FunctionComponent<YouTubeBlockProps> = (props) => {
    let itemStyles : any = {}; /*{
        paddingTop: this.props.data.paddingLeft.value + 'px',
        paddingRight: this.props.data.paddingRight.value + 'px',
        paddingBottom: this.props.data.paddingBottom.value + 'px',
        paddingLeft: this.props.data.paddingLeft.value + 'px'
    }*/

    return <div className="col-12">
        <div className="embed-responsive embed-responsive-16by9" style={ itemStyles }>
            <ReactPlayer url={ props.data.youTubeLink.value } className='embed-responsive-item' width='inherit' height='inherit' />
        </div>
    </div>
}

export default YouTubeBlock;