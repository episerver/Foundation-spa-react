import React from 'react';
import { useMap } from 'react-leaflet';
import { MapInteraction } from '../../Components/Shared/ClientSideMap';

export const InteractionWrapper : React.FunctionComponent<{
    interaction: MapInteraction
}> = (props) => {
    const map = useMap();
    const Interaction = props.interaction;
    return <Interaction map={map} />
}

export default InteractionWrapper;