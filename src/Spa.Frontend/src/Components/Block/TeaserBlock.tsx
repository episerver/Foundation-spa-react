import React, { ReactNode, ReactNodeArray, CSSProperties } from "react";
import EpiComponent from "Episerver/EpiComponent";
import Property from "Episerver/Components/Property";
import TeaserBlockData from 'app/Models/Content/TeaserBlockData';

export default class TeaserBlock extends EpiComponent<TeaserBlockData>
{
    public render() : null | ReactNode | ReactNodeArray
    {
        //console.log(this.props.data);
        return <div style={ this.getBlockStyles() } className={ this.getClasses().join(' ') }>
            <div className="card h-100">
                <Property context={this.getContext() } iContent={ this.props.data } property="image" className="card-img-top" />
                <div className="card-body">
                    <h5 className="card-title"><Property context={this.getContext() } iContent={ this.props.data } property="heading" /></h5>
                    <div className="card-text"><Property context={this.getContext() } iContent={ this.props.data } property="text" /></div>
                </div>
            </div>
        </div>;
    }

    /**
     * Get the CSS Classes to be applied to the main div, based upon the
     * block configuration.
     * 
     * @returns {Array<string>} The list of CSS Classes
     */
    protected getClasses() : Array<string>
    {
        let classes : Array<string> = [
            'teaserblock',
            'h-100'
        ];
        if (this.props.data.margin?.value) classes.push(this.props.data.margin.value);
        if (this.props.data.padding?.value) classes.push(this.props.data.padding.value);
        return classes;
    }

    /**
     * Create the CSS Rules to be applied to the div, based upon the block
     * configuration.
     * 
     * @returns {CSSProperties} The CSS Rules
     */
    protected getBlockStyles() : CSSProperties
    {
        return {
            "backgroundColor": this.props.data.backgroundColor?.value || "transparent",
            "opacity": this.props.data.blockOpacity?.value || 1
        }
    }
}