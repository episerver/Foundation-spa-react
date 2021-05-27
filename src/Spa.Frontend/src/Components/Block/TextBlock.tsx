import React, { FunctionComponent } from 'react';
import { Components, useEpiserver } from '@episerver/spa-core';
import { TextBlockProps } from 'app/Models/Content/TextBlockData';

export const TextBlock : FunctionComponent<TextBlockProps> = (props) => {
    const cssClasses : string[] = ["TextBlock"];
    if (props.data.padding?.value) cssClasses.push(props.data.padding?.value);
    if (props.data.margin?.value) cssClasses.push(props.data.margin?.value);

    const styles : React.CSSProperties = {
        backgroundColor: props.data.backgroundColor?.value,
        opacity: props.data.blockOpacity?.value,   
    }

    //Directly output the mainBody
    return  <div style={ styles }  className={ cssClasses.join(" ") }><Components.Property iContent={props.data} field="mainBody" /></div>
}
export default TextBlock;