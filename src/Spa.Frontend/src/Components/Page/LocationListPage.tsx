import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import { Button, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Container, Row, Col } from 'reactstrap';
import { Components, Services, useContentDeliveryAPI } from '@episerver/spa-core';

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
            lat: getProperty(loc, 'latitude')?.value || 0,
            lng: getProperty(loc, 'longitude')?.value || 0,
            popupBody: <div>
                <h6>{ getProperty(loc, "name") }</h6>
                <p>{ getProperty(loc, "mainIntro")?.value }</p>
                <Button color="link" tag="a" href={ Services.ContentLink.createHref(loc) } >Read more</Button>
            </div>
        }})
    }

    return <div className="location-list-page">
        <Helmet>
            <title>{ props.data.metaTitle?.value || props.data.name }</title>
        </Helmet>
        <Container fluid className="px-0 mb-3">
            <Row noGutters>
                <Col>
                    <ClientSideMap { ...mapProps } />
                </Col>
            </Row>
        </Container>
        <Container>
            <Row>
                <Col>
                    <h1><Components.Property iContent={props.data} field="name" /></h1>
                    <div>
                        <Components.Property iContent={props.data} field="mainBody" />
                    </div>
                    <Components.Property iContent={props.data} field="mainContentArea" />
                </Col>
            </Row>
            <Row>
                <Col xs="12" md="3">
                    <Components.Property iContent={props.data} field="filterArea" />
                </Col>
                <Col xs="12" md="9">
                    <LocationList locations={ getProperty(viewModel, 'locations', []) } />
                </Col>
            </Row>
        </Container>
    </div>
}

const LocationList : React.FunctionComponent<{
    locations: LocationItemPageData[]
}> = (props) => {
    return <ListGroup flush tag="div">
        { props.locations.map(loc => <LocationListItem item={loc} key={ Services.ContentLink.createApiId(loc) } /> )}
    </ListGroup>
}

const LocationListItem : React.FunctionComponent<{ item: LocationItemPageData }> = (props) => {
    const cssClasses : string[] = [];
    const img = props.item.promoted?.value === true ? <Components.Property iContent={ props.item } field="image" className="location-image" /> : null;
    const src = Services.ContentLink.createHref(props.item);

    if (props.item.highlight?.value === true) {
        cssClasses.push('bg-secondary');
        cssClasses.push('text-white');
    }

    return <ListGroupItem className={ cssClasses.join(' ') } action tag="div">
        <ListGroupItemHeading>{ props.item.name }</ListGroupItemHeading>
        <ListGroupItemText tag="div">
            { img }
            <p>{ props.item.mainIntro?.value }</p>
            <Button color="info" tag="a" href={ src } >Read more</Button>
        </ListGroupItemText>
    </ListGroupItem>
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