import React, {ReactNode, ReactNodeArray} from 'react';
import EpiComponent from 'episerver/EpiComponent';
import Property from 'episerver/Components/Property';
import TextBlockData from 'app/Models/Content/TextBlockData';

export default class TextBlock extends EpiComponent<TextBlockData>
{
    public render() : ReactNode | ReactNodeArray | null
    {
        let cssClasses : Array<string> = ["TextBlock"];
        if (this.props.data.padding?.value) cssClasses.push(this.props.data.padding?.value);
        if (this.props.data.margin?.value) cssClasses.push(this.props.data.margin?.value);

        return  <Property className={ cssClasses.join(" ") } iContent={this.props.data} propName="mainBody" context={ this.getContext() }/>
    }
}