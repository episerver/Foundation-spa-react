import React from 'react';

// Application resources
import Teaser from '../../Shared/Teaser';
import { LocationListPageProps } from '../../../Models/Content/LocationListPageData';

export const LocationListPageWidget : React.FunctionComponent<LocationListPageProps> = (props) => {
    return <Teaser content={ props.data } />
}
export default LocationListPageWidget;