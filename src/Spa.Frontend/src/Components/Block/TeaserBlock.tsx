import React, { ReactNode, ReactNodeArray, CSSProperties } from "react";
import { Components, ComponentTypes } from '@episerver/spa-core';
import TeaserBlockData from 'app/Models/Content/TeaserBlockData';

export default class TeaserBlock extends ComponentTypes.AbstractComponent<TeaserBlockData>
{
    public render() : null | ReactNode | ReactNodeArray
    {
        //console.log(this.props.data);
        return <div style={ this.getBlockStyles() } className={ this.getClasses().join(' ') }>
            <div className="card h-100">
                <Components.Property context={this.getContext() } iContent={ this.props.data } field="image" className="card-img-top" />
                <div className="card-body">
                    <h5 className="card-title"><Components.Property context={this.getContext() } iContent={ this.props.data } field="heading" /></h5>
                    <div className="card-text"><Components.Property context={this.getContext() } iContent={ this.props.data } field="text" /></div>
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