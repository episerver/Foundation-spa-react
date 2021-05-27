import React, { useState, useEffect } from 'react';
import { Taxonomy, ContentDelivery, Services, Components, useContentDeliveryAPI } from '@episerver/spa-core';

type BreadcrumbsProps = {
    currentContent: Taxonomy.IContent
}

export const Breadcrumbs : React.FunctionComponent<BreadcrumbsProps> = (props) =>
{
    const api = useContentDeliveryAPI();
    const contentId = Services.ContentLink.createApiId(props.currentContent);
    const [ ancestors, setAncestors ] = useState<Taxonomy.IContent[]>([]);
    
    useEffect(() => {
        let isCancelled : boolean = false;

        api.getAncestors(props.currentContent).then(x => {
            if (isCancelled) return;
            setAncestors(x.reverse());
        });
        
        return () => { isCancelled = true };
    }, [ contentId ])

    const itemKey = `BreadCrumb-Link-${ contentId }-${ contentId }`;

    return <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            { ancestors.map(i => {
                if (!i.parentLink) return null;
                const key : string = `BreadCrumb-Link-${ contentId }-${ Services.ContentLink.createApiId(i) }`;
                return <BreadcrumbItem currentContent={i} key={key} />
            })}
            <BreadcrumbItem currentContent={ props.currentContent } key={ itemKey } />
        </ol>
    </nav>
}

export const BreadcrumbItem : React.FunctionComponent<BreadcrumbsProps> = (props) => {
    const name : string = ContentDelivery.namePropertyIsString(props.currentContent.name) ? props.currentContent.name : (props.currentContent.name as ContentDelivery.StringProperty).value;
    return <li className="breadcrumb-item"><Components.Link href={ props.currentContent } >{ name }</Components.Link></li>;
}

export default Breadcrumbs;