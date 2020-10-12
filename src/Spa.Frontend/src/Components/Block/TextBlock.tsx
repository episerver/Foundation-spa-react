import React, { FunctionComponent } from 'react';
import { Components, useEpiserver } from '@episerver/spa-core';
import { TextBlockProps } from 'app/Models/Content/TextBlockData';

export const TextBlock : FunctionComponent<TextBlockProps> = (props) => {
    const ctx = useEpiserver();
    const cssClasses : string[] = ["TextBlock"];
    if (props.data.padding?.value) cssClasses.push(props.data.padding?.value);
    if (props.data.margin?.value) cssClasses.push(props.data.margin?.value);
    
    //Directly output the mainBody
    return  <Components.Property className={ cssClasses.join(" ") } iContent={props.data} field="mainBody" context={ ctx }/>
}
export default TextBlock;