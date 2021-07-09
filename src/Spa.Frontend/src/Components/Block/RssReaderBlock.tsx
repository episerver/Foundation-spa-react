import React, { FunctionComponent, ReactNode, useEffect, useState } from 'react';
import { Components, useEpiserver, useContentDeliveryAPI, Taxonomy } from '@episerver/spa-core';
import RssReaderBlockData, { RssReaderBlockProps } from 'app/Models/Content/RssReaderBlockData';

interface RssItem {
    title: string
    url: string
    publishDate: string
}

interface RssReaderBlockViewModel {
    currentBlock: RssReaderBlockData
    descriptiveText: string
    hasHeadingText: boolean
    heading: string
    rssList: Array<RssItem>
}

export const RssReaderBlock : FunctionComponent<RssReaderBlockProps> = (props) => {
    const ctx = useEpiserver();
    const api = useContentDeliveryAPI();

    const [viewModel, setViewModel] = useState<RssReaderBlockViewModel>(undefined);
    const rssUrl = Taxonomy.Property.readPropertyValue(props.data, "rssUrl");

    useEffect(() => {
        if(rssUrl){
            api.invoke<RssReaderBlockViewModel>(props.contentLink, "Index").then(f => {
                setViewModel(f.data as RssReaderBlockViewModel || undefined);
            });
        }
    }, [rssUrl, props.contentLink]);

    const cssClasses : string[] = ["RssReaderBlock row"];
    const padding = Taxonomy.Property.readPropertyValue(props.data, "padding");
    const margin = Taxonomy.Property.readPropertyValue(props.data, "margin");
    if (padding) cssClasses.push(padding);
    if (margin) cssClasses.push(margin);

    function RenderPubDate (item: RssItem) : ReactNode {
        if(viewModel.currentBlock.includePublishDate){
            return <div className="sub-title">
                <p>
                    {item.publishDate}
                </p>
            </div>
        }
        return null;
    }

    function RenderHeading (viewModel : RssReaderBlockViewModel) : ReactNode {
        if(viewModel && viewModel.hasHeadingText){
            return <div className="col-12">
                <h2>{ Taxonomy.Property.readPropertyValue(viewModel.currentBlock, "heading") }</h2>
            </div>;
        }
    }

    function RenderList(viewModel : RssReaderBlockViewModel) : ReactNode {
        if(viewModel && viewModel.rssList){
            return viewModel.rssList.map((item, index) => {
                return <a key={`rss-item-${index}`} href={item.url} className="list-group--header__item" style= {{display: 'flex'}}>
                    <div className="col-12 content__item">
                        <b className="title">{item.title}</b>
                        {RenderPubDate(item)}
                    </div>
                </a>
            });
        }
        return null;
    }

    //Directly output the mainBody
    return  <div className={cssClasses.join(' ')}>
        {RenderHeading(viewModel)}
            <div className="col-12">
                <div className="list-group--header content-search-results">
                    {RenderList(viewModel)}
                </div>
            </div>
        </div>
}
export default RssReaderBlock;