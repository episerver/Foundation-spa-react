import React, { FunctionComponent, useState, useEffect } from "react";
import { Core, Components, Services, Taxonomy, useIContentRepository } from "@episerver/spa-core";
import * as IContentWithTeaserNS from 'app/Models/IContentWithTeaser';
import { ResponsiveContentImage } from './ResponsiveImage';

import './Teaser.scss';

export import isIContentWithTeaser = IContentWithTeaserNS.isIContentWithTeaser;

export type TeaserProps = {
    content: IContentWithTeaserNS.default
    /**
     * @deprecated
     */
    context?: Core.IEpiserverContext
    className?: string
}

type TeaserBackground = [ string, Taxonomy.ContentLink, Taxonomy.IContent ]
function getTeaserBackground(teaser: IContentWithTeaserNS.default) : TeaserBackground
{
    const teaserId : string = Services.ContentLink.createApiId(teaser, false, true);
    if (teaser.teaserVideo?.value)
        return [ teaserId, teaser.teaserVideo.value, teaser.teaserVideo.expandedValue ]
    return [ teaserId, teaser.pageImage?.value, teaser.pageImage?.expandedValue ]
}

function getTeaserClasses(teaser: IContentWithTeaserNS.default, className?:string): [ string, string, string[], string[] ]
{
    const myClassName = `teaser ${ className }`.trim();
    const ratioClass : string = teaser.teaserRatio?.value ? `r-${ teaser.teaserRatio.value.replace(":","-") }` : ''; 
    const contentClasses : Array<string> = ['teaser-content','p-3','d-flex','flex-column'];
    if (teaser.teaserColorTheme?.value) contentClasses.push(`tc-${ teaser.teaserColorTheme.value.toLowerCase() }`);
    const contentTextClasses : Array<string> = [];

    switch (teaser.teaserTextAlignment.value.toLowerCase()) {
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

    return [ myClassName, ratioClass, contentClasses, contentTextClasses];
}

export const Teaser : FunctionComponent<TeaserProps> = (props) =>
{
    if (!isIContentWithTeaser(props.content))
        throw "Invalid content received";

    const repo = useIContentRepository();
    const teaserId = Services.ContentLink.createApiId(props.content, false, true);
    const [ background, setBackground ] = useState<TeaserBackground>(getTeaserBackground(props.content));
    const [ backgroundContent, setBackgroundContent ] = useState<Taxonomy.IContent>(background[2]);
    
    useEffect(() => {
        if (teaserId !== background[0]) setBackground(getTeaserBackground(props.content));
        if (backgroundContent?.contentLink.guidValue !== background[1]?.guidValue) setBackgroundContent(background[2]);
        let isCancelled : boolean = false;
        if (background[1] && !background[2]) 
            repo.load(background[1], false).then(x => {
                if (!isCancelled) setBackgroundContent(x);
            });
        return () => { isCancelled = true; }
    }, [ teaserId ]);

    // Get teaser name
    const title : string = typeof(props.content.name) == "string" ? props.content.name : props.content.name.value;
    const [ myClassName, ratioClass, contentClasses, contentTextClasses ] = getTeaserClasses(props.content, props.className);

    // Build teaser
    const hasButton = props.content?.teaserButtonText?.value ? true : false;
    const container = <div className={ ratioClass } >
        <ResponsiveContentImage content={ backgroundContent } className="img-fluid d-cover" breakpoints={ [{
            code: 'img',
            imgWidth: 335,
            format: 'webp',
            order: 100
        },{
            code: 'xxs',
            cssMedia: '(min-width: 1px)',
            imgWidth: 335,
            order: 101
        },{
            code: 'xl-webp',
            cssMedia: '(min-width: 1440px)',
            imgWidth: 950,
            format: 'webp',
            order: 1
        },{
            code: 'xl',
            cssMedia: '(min-width: 1440px)',
            imgWidth: 950,
            order: 2
        }] } aspectRatio={ props.content?.teaserRatio?.value?.replace(":","/") || '4/3'  } quality={ 75 } />
        <div className={ contentClasses.join(' ') }>
            <div className={`teaser-header ${ contentTextClasses.join(' ') }`}>{ title }</div>
            <TeaserText teaser={props.content} cssClasses={ contentTextClasses }/>
            <TeaserButton teaser={ props.content }/>
        </div>
    </div>;

    if (hasButton)
        return <div className={ myClassName } >{ container }</div>
    
    return <a className={ myClassName } href={ Services.ContentLink.createHref(props.content.contentLink) }>{ container }</a>
}

/**
 * Small private component to render the text on a teaser
 * 
 * @param props The props
 * @returns The teaser button
 */
const TeaserText : React.FunctionComponent<{ teaser: IContentWithTeaserNS.default, cssClasses: string[] }> = (props) => {
    return props.teaser.teaserText?.value ? <p className={ props.cssClasses.join(' ') }>{ props.teaser.teaserText.value }</p> : null;
}

/**
 * Small private component to render the button on a teaser
 * 
 * @param props The props
 * @returns The teaser button
 */
const TeaserButton : React.FunctionComponent<{ teaser: IContentWithTeaserNS.default }> = (props) =>
{
    const teaser = props.teaser;
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

export default Teaser;