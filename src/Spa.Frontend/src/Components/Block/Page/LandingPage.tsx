import React, { ReactNode } from 'react';
import EpiComponent from '@episerver/spa-core/EpiComponent';
import LandingPageData from 'app/Models/Content/LandingPageData';
import Teaser from 'app/Components/Shared/Teaser';
import IContentWithTeaser from 'app/Models/IContentWithTeaser';

export default class LandingPageBlock extends EpiComponent<LandingPageData>
{
    public render() : ReactNode
    {
        return <Teaser content={this.props.data as IContentWithTeaser} context={ this.getContext() } />
    }
}