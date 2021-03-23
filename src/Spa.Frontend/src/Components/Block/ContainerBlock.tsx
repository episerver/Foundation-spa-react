import React, { Component, FunctionComponent } from 'react';
import { Components, useEpiserver } from '@episerver/spa-core';
import { ContainerBlockProps } from 'app/Models/Content/ContainerBlockData';

export const ContainerBlock : FunctionComponent<ContainerBlockProps> = (props) => {
    const ctx = useEpiserver();
    const cssClasses : string[] = ["ContainerBlock"];
    if (props.data.padding?.value) cssClasses.push(props.data.padding?.value);
    if (props.data.margin?.value) cssClasses.push(props.data.margin?.value);

    const styles : React.CSSProperties = {
        backgroundColor: props.data.backgroundColor?.value,
        opacity: props.data.blockOpacity?.value
    }
    
    //Directly output the mainBody
    // return  <Components.Property className={ cssClasses.join(" ") } iContent={props.data} field="mainBody" context={ ctx }/>
    return <div className={ cssClasses.join(' ') } style={ styles }><Components.ContentArea data={props.data.mainContentArea} context={ ctx }/></div>
}
export default ContainerBlock;