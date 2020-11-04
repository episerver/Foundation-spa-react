import React, { ReactNode, ReactNodeArray, FunctionComponent, CSSProperties, useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Components, ComponentTypes, Taxonomy, Services, useIContentRepository, useEpiserver, useContentDeliveryAPI } from '@episerver/spa-core';
import BreadcrumbBlockData, { BreadcrumbBlockProps } from 'app/Models/Content/BreadcrumbBlockData';

export const BreadcrumbBlock : FunctionComponent<BreadcrumbBlockProps> = (props) =>
{
    // Get Context
    const repo = useIContentRepository();
    const api = useContentDeliveryAPI(); // Needed as the Repository doesn't support children & parents calls yet
    const location = useLocation();

    // Build state
    const [destination, setDestination] = useState<Taxonomy.IContent | undefined>();
    const [path, setPath] = useState<Taxonomy.IContent[]>([]);
    
    // Effects filters
    let destinationId = '';
    try {
        destinationId = Services.ContentLink.createApiId(props.data);
    } catch (e) {
        //Ignore
    }

    // Apply effects
    useEffect(() => {
        console.log( destinationId, props.data, props.contentLink );
        if (props.data.destinationPage.value) {
            repo.load(props.data.destinationPage.value).then(iContent => setDestination(iContent));
        } else {
            repo.getByRoute(location.pathname).then(iContent => setDestination(iContent));
        }
    }, [ destinationId, props.data, props.contentLink ]);
    useEffect(() => {
        if (destination) {
            api.getAncestors(destination).then(ancestors => setPath(ancestors));
        } else {
            setPath([]);
        }
    }, [ destination ]);

    // Prepare render
    const [ cssClasses, styles ] = buildBlockStyles(props, false);
    const crumbs : Taxonomy.IContent[] = ([].concat([ destination ], path)).filter(x => x ? true : false).reverse().slice(1);

    // Render
    return <Breadcrumb className={ cssClasses.join(' ') } style={ styles }>
        { crumbs.map(crumb => <BreadcrumbItem key={`breadcrumb-${ Services.ContentLink.createApiId(crumb) }`}>
            <Components.Link href={ crumb }>{ crumb.name }</Components.Link>
        </BreadcrumbItem>)}
    </Breadcrumb>
}

const buildBlockStyles : (props : BreadcrumbBlockProps, isLoading: boolean) => [ string[], CSSProperties ] = (props, isLoading) => {
    const cssClasses : string[] = [];
    if (props.data.padding.value) cssClasses.push(props.data.padding.value);
    if (props.data.margin.value) cssClasses.push(props.data.margin.value);
    if (props.data.alignment.value) cssClasses.push(props.data.alignment.value);
    if (isLoading) cssClasses.push("loading-data");

    const styles : React.CSSProperties = {};
    if (props.data.blockOpacity.value != null) styles.opacity = props.data.blockOpacity.value;
    return [ cssClasses, styles ];
}

export default BreadcrumbBlock;
/*
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

    protected getDestinationLink() : Taxonomy.ContentLink
    {
        return this.props.data.destinationPage.value || this.getContext().getRoutedContent()?.contentLink;
    }
}
*/