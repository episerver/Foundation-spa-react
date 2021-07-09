import React, { FunctionComponent } from 'react';
import { LandingPageProps } from 'app/Models/Content/LandingPageData';
import Teaser from 'app/Components/Shared/Teaser';

export const LandingPageBlock : FunctionComponent<LandingPageProps> = (props) => <Teaser content={ props.data } />
export default LandingPageBlock;