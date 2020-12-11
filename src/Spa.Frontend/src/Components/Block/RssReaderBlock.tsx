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

    useEffect(() => {
        console.log("Props data", props.data);
        if(props.data.rssUrl.value){
            api.invoke<RssReaderBlockViewModel>(props.data.contentLink, "Index").then(f => {
                console.log("F", f);
                setViewModel(f.data as RssReaderBlockViewModel || undefined);
            });
        }
    }, [props.data]);

    const cssClasses : string[] = ["RssReaderBlock row"];
    if (props.data.padding?.value) cssClasses.push(props.data.padding?.value);
    if (props.data.margin?.value) cssClasses.push(props.data.margin?.value);

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
                <h2>{viewModel.currentBlock.heading.value}</h2>
            </div>;
        }
    }

    function RenderList(viewModel : RssReaderBlockViewModel) : ReactNode {
        if(viewModel && viewModel.rssList){
            console.log("list", viewModel.rssList);
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