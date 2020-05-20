import React, { PureComponent, ReactNode } from "react";
import IContentWithTeaser, { isIContentWithTeaser } from 'app/Models/IContentWithTeaser';
import CmsComponent from "episerver/Components/CmsComponent";
import ContentLink, { ContentLinkService } from "episerver/Models/ContentLink";
import { IEpiserverSpaContext } from "episerver/Spa";
import IContent from "episerver/Models/IContent";

import './Teaser.scss';

interface TeaserProps {
    content: IContentWithTeaser
    context: IEpiserverSpaContext
    className?: string
}

export default class Teaser extends PureComponent<TeaserProps>
{
    public constructor(props: TeaserProps)
    {
        super(props);
        if (!isIContentWithTeaser(props.content)) {
            throw "Invalid content received";
        }
    }

    public render() : ReactNode
    {
        //Determine classes
        let myClassName = `teaser ${ this.props.className }`;
        let ratioClass : string = this.props.content.teaserRatio?.value ? `r-${ this.props.content.teaserRatio.value }` : ''; 
        let contentClasses : Array<string> = ['teaser-content','p-3','d-flex','flex-column'];
        let contentTextClasses : Array<string> = [];

        //Get teaser background
        let teaserBackground : ContentLink;
        let teaserBackgroundExpanded : IContent;
        if (this.props.content.teaserVideo?.value) {
            teaserBackground = this.props.content.teaserVideo.value;
            teaserBackgroundExpanded = this.props.content.teaserVideo.expandedValue;
        } else {
            teaserBackground = this.props.content.pageImage.value;
            teaserBackgroundExpanded = this.props.content.pageImage.expandedValue;
        }

        if (this.props.content.teaserColorTheme?.value) contentClasses.push(`tc-${ this.props.content.teaserColorTheme.value.toLowerCase() }`)

        //Get teaser name
        let title : string = typeof(this.props.content.name) == "string" ? this.props.content.name : this.props.content.name.value;

        switch (this.props.content.teaserTextAlignment.value.toLowerCase()) {
            case 'right':
                contentClasses.push('align-items-end');
                contentTextClasses.push('text-right');
                break;
            case 'center':
                contentClasses.push('align-items-center');
                contentTextClasses.push('text-center');
                break;
            case 'left':
            default:
                contentClasses.push('align-items-start');
                contentTextClasses.push('text-left');
                break;
        }

        //Build teaser
        let button : ReactNode = this.renderButton(this.props.content);
        let body : ReactNode = this.props.content.teaserText?.value ? <p className={ contentTextClasses.join(' ') }>{ this.props.content.teaserText.value }</p> : null;
        let container = <div className={ ratioClass} >
            <CmsComponent contentLink={ teaserBackground } context={ this.props.context } expandedValue={ teaserBackgroundExpanded } className="d-cover" />
            <div className={ contentClasses.join(' ') }>
                <div className={`teaser-header ${ contentTextClasses.join(' ') }`}>{ title }</div>
                { body }
                { button }
            </div>
        </div>;

        if (button) {
            return <div className={ myClassName } >
                {container}
            </div>
        } else {
            return <a className={ myClassName } href={ ContentLinkService.createHref(this.props.content.contentLink) }>
                { container }
            </a> 
        }
    }

    protected renderButton(teaser: IContentWithTeaser) : ReactNode | null
    {
        if (!teaser.teaserButtonText?.value) {
            return null;
        }
        let btnClasses : Array<string> = ['btn'];
        switch (teaser.teaserButtonStyle?.value) {
            case 'button-white':
                btnClasses.push('btn-light');
                break;
            case 'button-black':
                btnClasses.push('btn-dark');
                break;
            case 'button-transparent-black':
                btnClasses.push('btn-outline-dark');
                break;
            case 'button-transparent-white':
                btnClasses.push('btn-outline-light');
                break;
            case 'button-yellow-black':
                btnClasses.push('btn-warning');
                break;
            case 'button-yellow-white':
                btnClasses.push('btn-outline-warning');
                break;
            default:
                btnClasses.push('btn-primary');
                break;
        }
        return <a className={ btnClasses.join(' ') } href={ ContentLinkService.createHref(teaser.contentLink) }>{teaser.teaserButtonText.value}</a>
    }
}