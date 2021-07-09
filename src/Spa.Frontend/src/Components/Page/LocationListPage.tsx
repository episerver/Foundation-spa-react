import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import { Components, Services, Taxonomy, useContentDeliveryAPI } from '@episerver/spa-core';

import ClientSideMap, { ClientSideMapProps } from '../Shared/ClientSideMap';
import { LocationListPageProps } from '../../Models/Content/LocationListPageData';
import LocationItemPageData from '../../Models/Content/LocationItemPageData';


// Page specific SCSS
import "./LocationListPage.scss"

type LocationListPageViewModel = {
    mapCenter?: {
        horizontalAccuracy: number, 
        latitude: number, 
        longitude: number
    },
    userLocation?: {
        location: {
            horizontalAccuracy: number, 
            latitude: number, 
            longitude: number
        }
    }
    locations?: LocationItemPageData[]
}
function isLocationListPageViewModel(toTest: any) : toTest is LocationListPageViewModel
{
    return typeof(toTest) === 'object';
}

export const LocationListPage : React.FunctionComponent<LocationListPageProps> = (props) => 
{
    const api = useContentDeliveryAPI();
    const pageId = Services.ContentLink.createApiId(props.data);
    const [ viewModel, setViewModel ] = useState<LocationListPageViewModel>(undefined);
    
    useEffect(() => {
        let isCancelled : boolean = false;
        api.invoke<LocationListPageViewModel>(props.data, props.actionName || 'index').then(resp => {
            if (!isCancelled && isLocationListPageViewModel(resp.data))
                setViewModel(resp.data);
        });
        return () => { isCancelled = true; }
    }, [ pageId, props.actionName ]);

    const viewModelMapCenter = getProperty(viewModel, "mapCenter", { horizontalAccuracy: 0, latitude: 0, longitude: 0});
    const viewModelUserLocation = getProperty(viewModel, "userLocation", { location: { horizontalAccuracy: 0, latitude: 0, longitude: 0}});
    const mapProps : ClientSideMapProps = {
        center: [viewModelMapCenter.latitude, viewModelMapCenter.longitude],
        zoom: 1,
        interactions: {
            updateCenter: (props) => {
                props.map.setView([viewModelUserLocation.location.latitude, viewModelUserLocation.location.longitude], 6)
                return null;
            }
        },
        markers: getProperty(viewModel, 'locations', []).map(loc => { return {
            id: Services.ContentLink.createLanguageId(loc),
            lat: Taxonomy.Property.readPropertyValue(loc, 'latitude') || 0,
            lng: Taxonomy.Property.readPropertyValue(loc, 'longitude') || 0,
            popupBody: <div>
                <h6>{ Taxonomy.Property.readPropertyValue(loc, "name") }</h6>
                <p>{ Taxonomy.Property.readPropertyValue(loc, "mainIntro") }</p>
                <a className="btn btn-link" href={ Services.ContentLink.createHref(loc) } >Read more</a>
            </div>
        }})
    }

    const metaTitle = Taxonomy.Property.readPropertyValue(props.data, "metaTitle") || Taxonomy.Property.readPropertyValue(props.data, "name");

    return <div className="location-list-page">
        <Helmet>
            <title>{ metaTitle }</title>
        </Helmet>
        <div className="container-fluid">
            <div className="row">
                <div className="col px-0 mb-3">
                    <ClientSideMap { ...mapProps } />
                </div>
            </div>
        </div>
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1><Components.Property iContent={props.data} field="name" /></h1>
                    <div>
                        <Components.Property iContent={props.data} field="mainBody" />
                    </div>
                    <Components.Property iContent={props.data} field="mainContentArea" />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-lg-3">
                    <Components.Property iContent={props.data} field="filterArea" />
                </div>
                <div className="col-12 col-lg-9">
                    <LocationList locations={ getProperty(viewModel, 'locations', []) } />
                </div>
            </div>
        </div>
    </div>
}

const LocationList : React.FunctionComponent<{
    locations: LocationItemPageData[]
}> = (props) => {
    return <div className="location-list list-group list-group-flush">
        { props.locations.map(loc => <LocationListItem item={loc} key={ Services.ContentLink.createApiId(loc) } /> )}
    </div>
}

const LocationListItem : React.FunctionComponent<{ item: LocationItemPageData }> = (props) => {
    const cssClasses : string[] = [
        "location-list-item",
        "list-group-item",
        "list-group-item-action",
    ];
    const isPromoted = Taxonomy.Property.readPropertyValue(props.item, "promoted");
    const isHighlighted = Taxonomy.Property.readPropertyValue(props.item, "highlight");
    const isNew = Taxonomy.Property.readPropertyValue(props.item, "new");
    const name = Taxonomy.Property.readPropertyValue(props.item, "name");
    const mainIntro = Taxonomy.Property.readPropertyValue(props.item, "mainIntro");
    const img = isPromoted === true ? <div className="mt-2 me-md-3 col-md-4 col-xl-3"><Components.Property iContent={ props.item } field="image" className="location-image" /></div> : null;
    let badge = isNew === true ? <span className="badge bg-primary rounded-pill">New</span> : null;
    const src = Services.ContentLink.createHref(props.item);

    //console.log("LocationListItem", props.item, highlight);
    if (isPromoted === true) {
        cssClasses.push('list-group-item-secondary');
        badge = <span className="badge bg-primary rounded-pill">Promoted</span>;
    }

    return <div className={ cssClasses.join(' ') }>
        <div className="d-flex justify-content-between">
            <div className="fw-bold">{ name }</div>
            { badge }
        </div>
        <div className="d-flex flex-column flex-md-row align-items-md-center">
            { img }
            <div className="mt-2 flex-md-grow-1">
                <p>{ mainIntro }</p>
                <a className="btn btn-primary float-end" href={ src }>Discover { name }</a>
            </div>
        </div>
    </div>
}


/**
 * A type-checked method that reads a value from an object, eliminating the "undefined" value option when
 * a default value has been provided for an optional configuration key.
 * 
 * @param config        The configuration object, created by merging the global and instance configuration
 * @param key           The configuration key to read
 * @param defaultValue  The default value
 * @returns             The configured or default value
 */
function getProperty<T extends object, K extends keyof T, D extends Required<T>[K] | undefined>(config: T | undefined, key: K, defaultValue?: D) : D extends undefined ? T[K] : Required<T>[K] 
{
    return (config ? config[key] || defaultValue : defaultValue) as D extends undefined ? T[K] : Required<T>[K];
}

export default LocationListPage;