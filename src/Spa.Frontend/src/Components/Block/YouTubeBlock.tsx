import React, { FunctionComponent, useState, useEffect } from 'react';
import { Taxonomy, useEpiserver } from '@episerver/spa-core';

import { YouTubeBlockProps } from 'app/Models/Content/YouTubeBlockData';

export const YouTubeBlock : FunctionComponent<YouTubeBlockProps> = (props) => {
    const ctx = useEpiserver();
    const [RP, setReactPlayer] = useState(null);

    let itemStyles : any = {}; /*{
        paddingTop: this.props.data.paddingLeft.value + 'px',
        paddingRight: this.props.data.paddingRight.value + 'px',
        paddingBottom: this.props.data.paddingBottom.value + 'px',
        paddingLeft: this.props.data.paddingLeft.value + 'px'
    }*/
    
    useEffect(() => {
        if (ctx.isServerSideRendering()) return;
        let isCancelled : boolean = false;
        import(
            /* webpackPreload: true */
            /* webpackMode: "lazy" */
            'react-player'
        ).then(x => { if (!isCancelled) setReactPlayer(x);});
        return () => { isCancelled = true };
    }, []);

    const youTubeLink = Taxonomy.Property.readPropertyValue(props.data, "youTubeLink");

    const Player = RP ? 
        <RP.default url={ youTubeLink } className='embed-responsive-item' width='inherit' height='inherit' /> : 
        <div style={{ width: '100%;' }} />

    return <div className="col-12">
        <div className="embed-responsive embed-responsive-16by9" style={ itemStyles }>
            { Player }
        </div>
    </div>
}

export default YouTubeBlock;