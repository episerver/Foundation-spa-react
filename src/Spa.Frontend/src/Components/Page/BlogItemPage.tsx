import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { Components, Taxonomy, useContentDeliveryAPI, Services } from '@episerver/spa-core';

import { BlogItemPageProps } from '../../Models/Content/BlogItemPageData';
import Breadcrumbs from '../Shared/Breadcrumbs';

import './Blog.scss';

export type BlogItemPageViewModel = {
    tags: BlogListItemTag[]
    currentContent: Taxonomy.IContent
    previewText: string
}
export type BlogListItemTag = {
    title: string
    url: string
    weight: number
    count: number
    displayName: string
}
export function isBlogItemPageViewModel(toTest: any) : toTest is BlogItemPageViewModel
{
    return typeof(toTest) === 'object' && (toTest as BlogItemPageViewModel).tags !== undefined; 
}

export const BlogItemPage : React.FunctionComponent<BlogItemPageProps> = (props) => {
    const api = useContentDeliveryAPI();
    const pubDate = new Date(props.data.startPublish);
    const blogId = Services.ContentLink.createApiId(props.data);
    const [viewModel, setViewModel] = useState<BlogItemPageViewModel>(undefined);

    useEffect(() => {
        let isCancelled : boolean = false;

        api.invoke<BlogItemPageViewModel>(props.data, 'index').then(x => {
            if (isCancelled) return;
            if (isBlogItemPageViewModel(x?.data)) setViewModel(x.data)
        });

        return () => { isCancelled = true }
    }, [ blogId ]);



    return <div className="blog-item-page container">
        <Helmet>
            <title>{ props.data.metaTitle?.value || props.data.name || "Blog item" }</title>
            <style>{ props.data.css?.value }</style>
        </Helmet>
        <div className="row">
            <div className="header-image col-12">
                <Components.Property iContent={props.data} field="pageImage" />
                <h1><Components.Property iContent={ props.data } field="name" /></h1>
            </div>
            <div className="col-12">
                <p className="pubDate">{ pubDate.toLocaleString() }</p>
                <Breadcrumbs currentContent={ props.data } />
            </div>
        </div>
        <div className="row">
            <Components.Property iContent={props.data} field="mainBody" className="col" />
        </div>
        <div className="row">
            <div className="col">
                <p className="tags">{ (viewModel?.tags || []).map(x => <span className="tag" key={ `${ blogId }-tag-${ x.url }` }>#{ x.title }</span>) }</p>
            </div>
        </div>
    </div>
}

export default BlogItemPage;