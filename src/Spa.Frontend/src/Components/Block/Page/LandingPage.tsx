import React, { FunctionComponent } from 'react';
import { LandingPageProps } from 'app/Models/Content/LandingPageData';
import Teaser from 'app/Components/Shared/Teaser';
import IContentWithTeaser from 'app/Models/IContentWithTeaser';

export const LandingPageBlock : FunctionComponent<LandingPageProps> = (props) => <Teaser content={ props.data as IContentWithTeaser } />
export default LandingPageBlock;