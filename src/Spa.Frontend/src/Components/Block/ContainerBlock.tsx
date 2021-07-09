import React, { FunctionComponent } from 'react';
import { Components, useEpiserver, usePropertyReader } from '@episerver/spa-core';
import { ContainerBlockProps } from 'app/Models/Content/ContainerBlockData';

export const ContainerBlock : FunctionComponent<ContainerBlockProps> = (props) => {
    const ctx = useEpiserver();
    const read = usePropertyReader();
    const cssClasses : string[] = ["ContainerBlock"];
    const padding = read(props.data, "padding");
    const margin = read(props.data, "margin");
    if (padding) cssClasses.push(padding);
    if (margin)  cssClasses.push(margin);

    const styles : React.CSSProperties = {
        backgroundColor: read(props.data, "backgroundColor"),
        opacity: read(props.data, "blockOpacity")
    }
    
    //Directly output the mainBody
    return <div className={ cssClasses.join(' ') } style={ styles }><Components.ContentArea data={props.data.mainContentArea} /></div>
}
export default ContainerBlock;