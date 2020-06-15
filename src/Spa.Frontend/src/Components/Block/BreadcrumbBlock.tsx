import React, { ReactNode, ReactNodeArray } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

import EpiComponent from '@episerver/spa-core/EpiComponent';
import IContent from '@episerver/spa-core/Models/IContent';
import ContentLink, { ContentReference, ContentLinkService } from '@episerver/spa-core/Models/ContentLink';
import Link from '@episerver/spa-core/Components/Link';

import BreadcrumbBlockData, { BreadcrumbBlockProps } from 'app/Models/Content/BreadcrumbBlockData';

interface BreadcrumbBlockState {
    isLoading: boolean
    destination: ContentLink
    ancestors: Array<IContent>
}

export default class BreadcrumbBlock extends EpiComponent<BreadcrumbBlockData, BreadcrumbBlockState>
{
    private _unmounted : boolean = false;

    protected getInitialState() : BreadcrumbBlockState
    {
        return {
            isLoading: false,
            destination: this.getDestinationLink(),
            ancestors: []
        }
    }

    public componentDidMount()
    {
        this.refreshData();
    }

    public componentDidUpdate(prevProps: BreadcrumbBlockProps)
    {
        if (this.props.data.destinationPage.value?.id != prevProps.data.destinationPage.value?.id)
        {
            this.refreshData();
        }
    }

    public componentWillUnmount()
    {
        this._unmounted = true;
    }

    public render() : null | ReactNode | ReactNodeArray
    {
        let cssClasses : Array<string> = [];
        if (this.props.data.padding.value) cssClasses.push(this.props.data.padding.value);
        if (this.props.data.margin.value) cssClasses.push(this.props.data.margin.value);
        if (this.props.data.alignment.value) cssClasses.push(this.props.data.alignment.value);
        if (this.state.isLoading) cssClasses.push("loading-data");
        let styles : React.CSSProperties = {};
        if (this.props.data.blockOpacity.value != null) styles.opacity = this.props.data.blockOpacity.value;
        let items : ReactNodeArray = [];
        this.state.ancestors.forEach((i) => {
            items.push(
                <BreadcrumbItem key={ `breadcrumb-${ContentLinkService.createApiId(i)}` }><Link href={i}>{i.name}</Link></BreadcrumbItem>
            );
        });
        let currentPage : IContent = this.state.destination ? this.getContext().getContentByContentRef(this.state.destination) : this.getContext().getRoutedContent();
        return <Breadcrumb className={cssClasses.join(" ")} style={styles}>
            {items}
            <BreadcrumbItem key={ `breadcrumb-${ContentLinkService.createApiId(this.state.destination)}` } active>{ currentPage?.name || "" }</BreadcrumbItem>
        </Breadcrumb>;
    }

    /**
     * Refresh the ancestors, as shown by the breadcrumb block
     */
    protected refreshData()
    {
        let destinationLink = this.getDestinationLink();
        this.setState({isLoading: true, destination: destinationLink, ancestors: []});

        //@ToDo - get this to go through store so it can be done off-line as well
        let startPage : ContentLink = this.getContext().getContentByRef("startPage")?.contentLink;
        let startPageId : string = startPage ? ContentLinkService.createApiId(startPage) : '';
        this.getContext().contentDeliveryApi().getContentAncestors(destinationLink).then((list) => {
            list = list.reverse();
            let startPageIdx = list.findIndex(i => ContentLinkService.createApiId(i.contentLink) == startPageId);
            if (startPageIdx > 0) list = list.slice(startPageIdx);
            if (!this._unmounted) this.setState({
                isLoading: false,
                ancestors: list
            })
        });
    }

    /**
     * Retrieve the destination of the Breadcrumb block, if none set, it'll
     * take the path to the current page.
     */
    protected getDestinationLink() : ContentLink
    {
        return this.props.data.destinationPage.value || this.getContext().getRoutedContent()?.contentLink;
    }
}
