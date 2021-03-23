import React from 'react';

import NavItem from '../NavItem';
import { LandingPageProps } from '../../../Models/Content/LandingPageData'; 

export const LandingPageNavItem : React.FunctionComponent<LandingPageProps> = (props) => <NavItem item={ props.data } />
export default LandingPageNavItem;