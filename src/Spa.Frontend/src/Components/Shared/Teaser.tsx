import React, { ReactNode, FunctionComponent } from "react";
import { Core, Components, Services, Taxonomy, useEpiserver } from "@episerver/spa-core";
import IContentWithTeaser, { isIContentWithTeaser } from 'app/Models/IContentWithTeaser';

import './Teaser.scss';

export interface TeaserProps {
    content: IContentWithTeaser
    context?: Core.IEpiserverContext
    className?: string
}

export const Teaser : FunctionComponent<TeaserProps> = (props) =>
{
    const ctx = props.context || useEpiserver();
    if (!isIContentWithTeaser(props.content)) {
        throw "Invalid content received";
    }

    // Determine classes
    const myClassName = `teaser ${ props.className }`;
    const ratioClass : string = props.content.teaserRatio?.value ? `r-${ props.content.teaserRatio.value }` : ''; 
    const contentClasses : Array<string> = ['teaser-content','p-3','d-flex','flex-column'];
    const contentTextClasses : Array<string> = [];

    // Get teaser background
    let teaserBackground : Taxonomy.ContentLink;
    let teaserBackgroundExpanded : Taxonomy.IContent;
    if (props.content.teaserVideo?.value) {
        teaserBackground = props.content.teaserVideo.value;
        teaserBackgroundExpanded = props.content.teaserVideo.expandedValue;
    } else {
        teaserBackground = props.content.pageImage.value;
        teaserBackgroundExpanded = props.content.pageImage.expandedValue;
    }
    if (props.content.teaserColorTheme?.value) contentClasses.push(`tc-${ props.content.teaserColorTheme.value.toLowerCase() }`);

    // Get teaser name
    const title : string = typeof(props.content.name) == "string" ? props.content.name : props.content.name.value;

    // Teaser alignment
    switch (props.content.teaserTextAlignment.value.toLowerCase()) {
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

    // Build teaser
    const button : ReactNode = renderButton(props.content);
    const body : ReactNode = props.content.teaserText?.value ? <p className={ contentTextClasses.join(' ') }>{ props.content.teaserText.value }</p> : null;
    const container = <div className={ ratioClass} >
        <Components.EpiserverContent contentLink={ teaserBackground } context={ ctx } expandedValue={ teaserBackgroundExpanded } className="d-cover" />
        <div className={ contentClasses.join(' ') }>
            <div className={`teaser-header ${ contentTextClasses.join(' ') }`}>{ title }</div>
            { body }
            { button }
        </div>
    </div>;

    if (button) {
        return <div className={ myClassName } >
            { container }
        </div>
    }
    return <a className={ myClassName } href={ Services.ContentLink.createHref(props.content.contentLink) }>
        { container }
    </a>
}
export default Teaser;

const renderButton : (teaser: IContentWithTeaser) => ReactNode | null = (teaser) =>
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
    return <a className={ btnClasses.join(' ') } href={ Services.ContentLink.createHref(teaser.contentLink) }>{teaser.teaserButtonText.value}</a>
}