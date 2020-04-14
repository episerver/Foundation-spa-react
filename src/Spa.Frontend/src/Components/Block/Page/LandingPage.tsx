import React, { ReactNode, ReactNodeArray } from 'react';
import EpiComponent from 'Episerver/EpiComponent';
import Link from 'Episerver/Components/Link';
import LandingPageData from 'app/Models/Content/LandingPageData';
import CmsComponent from 'Episerver/Components/CmsComponent';
import { Button } from 'reactstrap';

import "./LandingPage.scss";

export default class LandingPageBlock extends EpiComponent<LandingPageData>
{
    public render() : ReactNode | ReactNodeArray | null
    {
        let button : ReactNode = null;
        if (this.props.data.teaserButtonText.value) {
            button = <div>
                <Button>{ this.props.data.teaserButtonText.value }</Button>
            </div>;
        }
        return <Link href={this.props.data} className="LandingPageBlock">
            <CmsComponent contentLink={ this.props.data.pageImage.value } expandedValue={ this.props.data.pageImage.expandedValue } context={ this.getContext() }/>
            <div className="Teaser d-flex align-items-stretch">
                <div className="col">
                    <div className="h2 m-3">{ this.props.data.name }</div>
                    <div className="m-3" dangerouslySetInnerHTML={ {__html: this.props.data.teaserText.value} } />
                    { button }
                </div>
            </div>
        </Link>
    }
}