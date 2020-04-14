import React, { ReactNode, ReactNodeArray } from 'react';
import EpiComponent from 'Episerver/EpiComponent';
import BreadcrumbBlockData, { BreadcrumbBlockProps } from 'app/Models/Content/BreadcrumbBlockData';
import IContent from 'Episerver/Models/IContent';
import ContentLink, { ContentReference, ContentLinkService } from 'Episerver/Models/ContentLink';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import Link from 'Episerver/Components/Link';

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

    protected refreshData()
    {
        let destinationLink = this.getDestinationLink();
        this.setState({isLoading: true, destination: destinationLink, ancestors: []});
        //@ToDo - get this to go through store so it can be done off-line as well
        this.getContext().contentDeliveryApi().getContentAncestors(destinationLink).then((list) => {
            list = list.reverse();
            list = list.filter((i) => {
                return i.contentLink.url != null;
            })
            if (!this._unmounted) this.setState({
                isLoading: false,
                ancestors: list
            })
        });
    }

    protected getDestinationLink()
    {
        return this.props.data.destinationPage.value || this.getContext().getRoutedContent()?.contentLink;
    }
}
