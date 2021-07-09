import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { useLocation } from 'react-router';
import { Components, useContentDeliveryAPI, usePropertyReader, Services, Taxonomy } from '@episerver/spa-core';

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
                    <ul className="blog-nav-list d-flex justify-content-center">
                        { (viewModel?.subNavigation || []).map(x => {
                            const targetHref = Services.ContentLink.createHref(x.value) || x.value;
                            const isActive = loc.pathname.replace(/\/$/, '') === targetHref.replace(/\/$/, '');
                            return <li key={ `${ pageId }-blog-nav-${x.value}`} className="mx-3">
                                <a href={ targetHref } className={ "btn btn-outline-primary fs-5" + (isActive ? ' active' : '') }>{ x.key }</a>
                            </li>
                        })}
                    </ul>
                </div>
            </div>
            <div className="row">
                { (viewModel?.blogs || []).map(x => <BlogListPageItem key={ `${ pageId }-${ Services.ContentLink.createApiId(x.currentContent) }` } intro={ x.previewText } content={ x.currentContent } showIntroduction={ Taxonomy.Property.readPropertyValue(props.data, "includeTeaserText") } showPublishDate={ Taxonomy.Property.readPropertyValue(props.data, "includePublishDate") } tags={ x.tags } />) }
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
    const readProperty = usePropertyReader();
    const blogItem = props.content;
    const blogId = Services.ContentLink.createApiId(props.content);
    const title = readProperty(blogItem, "name");
    if (!isIContentType<BlogItemPageData>(blogItem, 'Page/BlogItemPage'))
        if (isIContentWithTeaser(blogItem)) 
            return <Teaser content={blogItem} className="blog-list-page-item col-12 col-lg-6" />
        else
            return <div className="blog-list-page-item col-12 col-lg-6">{ title }</div>
    else {
        const teaserText = Taxonomy.Property.readPropertyValue(blogItem, "teaserText");
        const teaserRatio = Taxonomy.Property.readPropertyValue(blogItem, "teaserRatio");
        return <a className="blog-list-page-item col-12 col-lg-6" href={ Services.ContentLink.createHref(blogItem) } title={ title }>
            <div className={ `r-${ teaserRatio || "10-10" }` }>
                <div className="image-container">
                    <Components.Property iContent={ blogItem } field="pageImage" className="" />
                </div>
                <div className="overlay">
                    <p className="tags">{ (props.tags || []).map(x => <span className="badge bg-primary me-2" key={ `${ blogId }-tag-${ x.url }` }>#{ x.title }</span>) }</p>
                    <p className="title h3">{ title }</p>
                    { props.showPublishDate ? <p className="date">{ (new Date(blogItem.startPublish)).toLocaleDateString() }</p> : null }
                    { props.showIntroduction ? <p className="intro" dangerouslySetInnerHTML={ { __html: props.intro || teaserText } } /> : null }
                </div>
            </div>
        </a>
    }
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