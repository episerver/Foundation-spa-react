import React, { FunctionComponent, CSSProperties, useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Components, Taxonomy, Services, useIContentRepository, useContentDeliveryAPI, usePropertyReader } from '@episerver/spa-core';
import { BreadcrumbBlockProps } from 'app/Models/Content/BreadcrumbBlockData';

export const BreadcrumbBlock : FunctionComponent<BreadcrumbBlockProps> = (props) =>
{
    // Get Context
    const repo = useIContentRepository();
    const api = useContentDeliveryAPI(); // Needed as the Repository doesn't support children & parents calls yet
    const location = useLocation();
    const read = usePropertyReader();

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

    const destinationLink = read(props.data, "destinationPage");
    const pathname = location.pathname;

    // Apply effects
    useEffect(() => {
        if (destinationLink) {
            repo.load(destinationLink).then(iContent => setDestination(iContent));
        } else {
            repo.getByRoute(pathname).then(iContent => setDestination(iContent));
        }
    }, [ destinationLink, pathname ]);
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
    return <nav className={ cssClasses.join(' ') } style={ styles } aria-role="breadcrumb" aria-label="breadcrumb">
        <ol className="breadcrumb">
        { crumbs.map(crumb => <li className="breadcrumb-item" key={`breadcrumb-${ Services.ContentLink.createApiId(crumb) }`}>
            <Components.Link href={ crumb }>{ crumb.name }</Components.Link>
        </li>)}
        </ol>
    </nav>
}

const buildBlockStyles : (props : BreadcrumbBlockProps, isLoading: boolean) => [ string[], CSSProperties ] = (props, isLoading) => {
    const cssClasses : string[] = ["breadcrumb-block"];
    const read = Taxonomy.Property.readPropertyValue;
    cssClasses.push(read(props.data, "padding"));
    cssClasses.push(read(props.data, "margin"));
    cssClasses.push(read(props.data, "alignment"));
    if (isLoading) cssClasses.push("loading-data");

    const styles : React.CSSProperties = {
        opacity: read(props.data, "blockOpacity") || 1
    }
    return [ cssClasses.filter(x => x), styles ];
}

export default BreadcrumbBlock;