import React, { useEffect, useState } from 'react';
import List from 'reactstrap/es/List';
import ListInlineItem from 'reactstrap/es/ListInlineItem';
import Helmet from 'react-helmet';
import { useLocation } from 'react-router';
import { Components, useContentDeliveryAPI, useEpiserver, Services, Taxonomy } from '@episerver/spa-core';

// Blog list
import BlogListPageData, { BlogListPageProps } from '../../Models/Content/BlogListPageData';

// Teasers
import Teaser, { isIContentWithTeaser } from '../Shared/Teaser';

// Blog Item
import BlogItemPageData from '../../Models/Content/BlogItemPageData';
import { BlogItemPageViewModel, BlogListItemTag } from './BlogItemPage';

import './Blog.scss';


type BlogListIndexResponse = {
    blogs: BlogItemPageViewModel[],
    showIntroduction: boolean
    showPublishDate: boolean
    subNavigation: {
        key: string
        value: string
    }[]
    currentContent: BlogListPageData
}



function isBlogListIndexResponse (data: any) : data is BlogListIndexResponse 
{
    if (typeof(data) !== 'object') return false;
    return (data as BlogListIndexResponse).blogs || (data as BlogListIndexResponse).subNavigation ? true : false;
}

export const BlogListPage : React.FunctionComponent<BlogListPageProps> = (props) => 
{
    const api = useContentDeliveryAPI();
    const ctx = useEpiserver();
    const loc = useLocation();
    const [ viewModel, setViewModel ] = useState<BlogListIndexResponse>(undefined);

    // Get the viewModel based upon the current page
    const pageId = Services.ContentLink.createApiId(props.data);
    useEffect(() => {
        let isCancelled : boolean = false;
        api.invoke<BlogListIndexResponse>(props.data, 'index').then(x => {if (!isCancelled) setViewModel(isBlogListIndexResponse(x.data) ? x.data : undefined)});
        return () => {isCancelled = true};
    }, [ pageId ]);

    return <div className="blog-list-page">
        <Helmet>
            <title>{ props.data.name }</title>
        </Helmet>
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1><Components.Property iContent={ props.data } field="heading" /></h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <List type="inline" className="blog-nav-list">
                        { (viewModel?.subNavigation || []).map(x => <ListInlineItem key={ `${ pageId }-blog-nav-${x.value}`} className="mx-3"><a href={ ctx.getSpaRoute(x.value) } className={ loc.pathname.replace(/\/$/, '') === ctx.getSpaRoute(x.value)?.replace(/\/$/, '') ? 'active' : undefined }>{ x.key }</a></ListInlineItem>)}
                    </List>
                </div>
            </div>
            <div className="row">
                { (viewModel?.blogs || []).map(x => <BlogListPageItem key={ `${ pageId }-${ Services.ContentLink.createApiId(x.currentContent) }` } intro={ x.previewText } content={ x.currentContent } showIntroduction={ props.data.includeTeaserText?.value } showPublishDate={ props.data.includePublishDate?.value } tags={ x.tags } />) }
            </div>
        </div>
    </div>
}

const BlogListPageItem : React.FunctionComponent<{
    showIntroduction?: boolean
    showPublishDate?: boolean
    content: Taxonomy.IContent
    idx?: number
    intro?: string
    tags?: BlogListItemTag[]
}> = (props) => {
    const idx = props.idx || 0;
    const blogItem = props.content;
    const blogId = Services.ContentLink.createApiId(props.content);
    const ctx = useEpiserver();
    if (!isIContentType<BlogItemPageData>(blogItem, 'Page/BlogItemPage'))
        if (isIContentWithTeaser(blogItem)) 
            return <Teaser content={blogItem} className="blog-list-page-item col-12 col-md-6" />
        else
            return <div className="blog-list-page-item col-12 col-md-6">{ blogItem.name }</div>
    else 
        return <a className="blog-list-page-item col-12 col-md-6" href={ Services.ContentLink.createHref(blogItem) }>
            <div className={ `r-${ blogItem.teaserRatio?.value || "10-10" }` }>
                <div className="image-container">
                    <Components.Property iContent={ blogItem } field="pageImage" className="" />
                </div>
                <div className="overlay">
                    <p className="tags">{ (props.tags || []).map(x => <span className="tag" key={ `${ blogId }-tag-${ x.url }` }>#{ x.title }</span>) }</p>
                    <p className="title h3">{ blogItem.name }</p>
                    { props.showPublishDate ? <p className="date">{ (new Date(blogItem.startPublish)).toLocaleDateString() }</p> : null }
                    { props.showIntroduction ? <p className="intro" dangerouslySetInnerHTML={ { __html: props.intro || blogItem.teaserText?.value } } /> : null }
                </div>
            </div>
        </a>
}

function isIContentType<T extends Taxonomy.IContent = Taxonomy.IContent>(toTest : Taxonomy.IContent, type : string) : toTest is T
{
    if (typeof(toTest) !== 'object')
        return false;
    
    if (!(toTest as Taxonomy.IContent)?.contentLink?.guidValue)
        return false;

    if (typeof((toTest as Taxonomy.IContent)?.contentType[0]) !== 'string')
        return false;

    return (toTest as Taxonomy.IContent).contentType.join('/') === type;
}

export default BlogListPage;