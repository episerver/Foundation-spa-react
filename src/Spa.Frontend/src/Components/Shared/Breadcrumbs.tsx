import React, { Component, ReactNode, ReactNodeArray } from 'react';
import { Core, Taxonomy, ContentDelivery, Services, Components } from '@episerver/spa-core';

interface BreadcrumbsProps {
    currentContent: Taxonomy.IContent
}

export default class Breadcrumbs extends Component<BreadcrumbsProps> {

    protected ancestors : Array<Taxonomy.IContent> = [];
    protected loading : boolean = false;

    public componentDidMount() : void
    {
        this.refreshAncestors();
    }

    public componentDidUpdate() : void
    {
        this.refreshAncestors();
    }

    public refreshAncestors() : void
    {
        if (!this.loading) {
            this.loading = true;
            let me = this;
            Core.DefaultContext.contentDeliveryApi().getContentAncestors(this.props.currentContent).then(a => {
                me.ancestors = a.reverse();
                me.forceUpdate(() => {
                    me.loading = false;
                });
            });
        } else {
            if (Core.DefaultContext.isDebugActive()) {
                console.log("Blocked breadcrumb update, as it's already loading");
            }
        }
    }

    public render() : ReactNode | ReactNodeArray | null
    {
        let items : ReactNodeArray = [];
        this.ancestors.forEach(iContent => {
            if (iContent.parentLink) { //Do not show root-nodes
                let key : string = `BreadCrumb-Link-${ Services.ContentLink.createApiId(iContent) }`;
                let name : string = ContentDelivery.namePropertyIsString(iContent.name) ? iContent.name : (iContent.name as ContentDelivery.StringProperty).value;
                items.push(<li key={ key } className="breadcrumb-item"><Components.Link href={ iContent } >{ name }</Components.Link></li>);
            }
        });
        let myKey : string = `BreadCrumb-Link-${ Services.ContentLink.createApiId(this.props.currentContent) }`;
        let myName : string = ContentDelivery.namePropertyIsString(this.props.currentContent.name) ? this.props.currentContent.name : (this.props.currentContent.name as ContentDelivery.StringProperty).value;

        return <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                { items }
                <li key={ myKey } className="breadcrumb-item active" aria-current="page">{ myName }</li>
            </ol>
        </nav>;
    }
}