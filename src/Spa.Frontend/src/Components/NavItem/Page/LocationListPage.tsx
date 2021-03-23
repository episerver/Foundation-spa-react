import React from 'react';

import NavItem from '../NavItem';
import { LocationListPageProps } from '../../../Models/Content/LocationListPageData'; 

export const LocationListPageNavItem : React.FunctionComponent<LocationListPageProps> = (props) => <NavItem item={ props.data } />
export default LocationListPageNavItem;