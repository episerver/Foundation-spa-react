import React, { ReactNode, ReactNodeArray } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Components, ComponentTypes, Taxonomy, Services } from '@episerver/spa-core';
import BreadcrumbBlockData from 'app/Models/Content/BreadcrumbBlockData';

interface BreadcrumbBlockState {
    isLoading: boolean
    destination: Taxonomy.ContentLink
    ancestors: Taxonomy.IContent[]
}

export default class BreadcrumbBlock extends ComponentTypes.AbstractComponent<BreadcrumbBlockData, BreadcrumbBlockState>
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
                <BreadcrumbItem key={ `breadcrumb-${Services.ContentLink.createApiId(i)}` }><Components.Link href={i}>{i.name}</Components.Link></BreadcrumbItem>
            );
        });
        let currentPage : Taxonomy.IContent = this.state.destination ? this.getContext().getContentByContentRef(this.state.destination) : this.getContext().getRoutedContent();
        return <Breadcrumb className={cssClasses.join(" ")} style={styles}>
            {items}
            <BreadcrumbItem key={ `breadcrumb-${Services.ContentLink.createApiId(this.state.destination)}` } active>{ currentPage?.name || "" }</BreadcrumbItem>
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
        let startPage : Taxonomy.ContentLink = this.getContext().getContentByRef("startPage")?.contentLink;
        let startPageId : string = startPage ? Services.ContentLink.createApiId(startPage) : '';
        this.getContext().contentDeliveryApi().getContentAncestors(destinationLink).then((list) => {
            list = list.reverse();
            let startPageIdx = list.findIndex(i => Services.ContentLink.createApiId(i.contentLink) == startPageId);
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
    protected getDestinationLink() : Taxonomy.ContentLink
    {
        return this.props.data.destinationPage.value || this.getContext().getRoutedContent()?.contentLink;
    }
}
