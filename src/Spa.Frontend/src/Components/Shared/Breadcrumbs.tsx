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
            <BreadcrumbItem currentContent={ props.currentContent } active key={ itemKey } />
        </ol>
    </nav>
}

export const BreadcrumbItem : React.FunctionComponent<BreadcrumbsProps & { active ?: boolean }> = (props) => {
    const name : string = Taxonomy.Property.readPropertyValue(props.currentContent, "name");
    return props.active ?
        <li className="breadcrumb-item active" aria-current="page">{ name }</li> :
        <li className="breadcrumb-item"><Components.Link href={ props.currentContent } >{ name }</Components.Link></li>;
}

export default Breadcrumbs;