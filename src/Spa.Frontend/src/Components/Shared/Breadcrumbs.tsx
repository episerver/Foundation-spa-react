import React, { Component, ReactNode, ReactNodeArray } from 'react';
import EpiContext from '@episerver/spa-core/Spa';
import IContent, { namePropertyIsString } from '@episerver/spa-core/Models/IContent';
import { ContentLinkService } from '@episerver/spa-core/Models/ContentLink';
import Link from '@episerver/spa-core/Components/Link';
import { StringProperty } from '@episerver/spa-core/Property';

interface BreadcrumbsProps {
    currentContent: IContent
}

export default class Breadcrumbs extends Component<BreadcrumbsProps> {

    protected ancestors : Array<IContent> = [];
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
            EpiContext.contentDeliveryApi().getContentAncestors(this.props.currentContent).then(a => {
                me.ancestors = a.reverse();
                me.forceUpdate(() => {
                    me.loading = false;
                });
            });
        } else {
            if (EpiContext.isDebugActive()) {
                console.log("Blocked breadcrumb update, as it's already loading");
            }
        }
    }

    public render() : ReactNode | ReactNodeArray | null
    {
        let items : ReactNodeArray = [];
        this.ancestors.forEach(iContent => {
            if (iContent.parentLink) { //Do not show root-nodes
                let key : string = `BreadCrumb-Link-${ ContentLinkService.createApiId(iContent) }`;
                let name : string = namePropertyIsString(iContent.name) ? iContent.name : (iContent.name as StringProperty).value;
                items.push(<li key={ key } className="breadcrumb-item"><Link href={ iContent } >{ name }</Link></li>);
            }
        });
        let myKey : string = `BreadCrumb-Link-${ ContentLinkService.createApiId(this.props.currentContent) }`;
        let myName : string = namePropertyIsString(this.props.currentContent.name) ? this.props.currentContent.name : (this.props.currentContent.name as StringProperty).value;

        return <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                { items }
                <li key={ myKey } className="breadcrumb-item active" aria-current="page">{ myName }</li>
            </ol>
        </nav>;
    }
}