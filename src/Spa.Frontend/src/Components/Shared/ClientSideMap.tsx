import React, { useState, useEffect } from 'react';
import { useEpiserver } from '@episerver/spa-core';

// Leaflet CSS File & Assets
import "leaflet/dist/leaflet.css"

export type GeoLocation = [ number, number ];

/**
 * Wrapper for Leaflets' Map, without the requirement of loading the 
 * leaflet library, which breaks server side rendering due to the 
 * dependency on the document.
 */
export type LeafletMap = {
    setView: (latlng: [number, number], zoom: number) => void
}

export type ClientSideMapProps = {
    center: GeoLocation,
    scrollWheelZoom?: boolean,
    zoom: number,
    markers?: {
        id: string,
        lat: number,
        lng: number,
        popupBody?: React.ReactNode
    }[],
    interactions?: { [id: string] : MapInteraction }
}

export type MapInteractionProps = {
    map: LeafletMap
}
export type MapInteraction<P extends MapInteractionProps = MapInteractionProps> = React.ComponentType<P>

/**
 * Wrapper for the React-Leaflet Map, ensuring that the map will only be loaded on client
 * side and not client side.
 * 
 * @param props The map properties
 */
export const ClientSideMap : React.FunctionComponent<ClientSideMapProps> = (props) => {
    const [ RL, setReactLeaflet ] = useState<any>(undefined);
    const [ IWM, setInteractionWrapperModule ] = useState<any>(undefined);
    const ctx = useEpiserver();

    // Load React Leaflet only in the browser
    useEffect(() => {
        if (ctx.isServerSideRendering()) return;
        let isCancelled : boolean = false;
        import(
            /* webpackPreload: true */
            /* webpackMode: "lazy" */
            'react-leaflet'
        ).then((x) => { if (!isCancelled) setReactLeaflet(x)});
        return () => { isCancelled = true }
    }, []);

    // Load React Leaflet only in the browser
    useEffect(() => {
        if (ctx.isServerSideRendering()) return;
        let isCancelled : boolean = false;
        import(
            /* webpackPreload: true */
            /* webpackMode: "lazy" */
            '../../AsyncComponents/ClientSideMap/InteractionWrapper'
        ).then((x) => { if (!isCancelled) setInteractionWrapperModule(x)});
        return () => { isCancelled = true }
    }, []);

    // Pre-render placeholder, if React Leaflet is not available (yet)
    if (!RL || !IWM) return <div className="leaflet-container"></div>;

    // Prepare interactions
    const interactionComponents = [];
    const interactionsList = props.interactions || {};
    for (let id in interactionsList) if (interactionsList.hasOwnProperty(id)) {
        interactionComponents.push(<IWM.default interaction={ interactionsList[id] } key={`InteractionWrapper-${ id }`}/>)
    }

    return <RL.MapContainer center={ props.center } zoom={ props.zoom } scrollWheelZoom={ props.scrollWheelZoom }>
        <RL.TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        { interactionComponents }
        { (props.markers || []).map(marker => {
            return <RL.Marker position={ [ marker.lat, marker.lng] } key={ marker.id } >{ marker.popupBody ?
                <RL.Popup>{ marker.popupBody }</RL.Popup> : null }
            </RL.Marker>
        }) }
    </RL.MapContainer>
}

export default ClientSideMap;