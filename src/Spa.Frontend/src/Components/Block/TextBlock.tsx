import React, { FunctionComponent } from 'react';
import { Components } from '@episerver/spa-core';
import { TextBlockProps } from 'app/Models/Content/TextBlockData';
import { readContainerStyles } from 'app/Models/IContentWithBaseStyles';

export const TextBlock : FunctionComponent<TextBlockProps> = (props) => {
    const [ cssClasses, cssStyles ] = readContainerStyles(props.data);
    cssClasses.unshift("TextBlock");

    //Directly output the mainBody
    return  <div style={ cssStyles }  className={ cssClasses.join(" ") }>
        <Components.Property iContent={ props.data } field="mainBody" />
    </div>
}
export default TextBlock;