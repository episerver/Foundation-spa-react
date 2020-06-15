import React, { ReactNode } from 'react';
import CmsComponent from '@episerver/spa-core/Components/CmsComponent'
import EpiComponent from '@episerver/spa-core/EpiComponent'
import StandardPageData from 'app/Models/Content/StandardPageData'

import './StandardPage.scss';

export default class StandardPage extends EpiComponent<StandardPageData>
{
    onClick(event: any)
    {
        event.preventDefault();
        this.navigateTo(this.props.data.contentLink);
    }

    render() : ReactNode {
        let cardBodyContainerClass : string = "card-img-overlay text-"+this.props.data.teaserTextAlignment.value.toLowerCase()+" d-flex align-items-center";
        return <div className="card text-white standard-page">
            <CmsComponent context={ this.props.context } contentLink={ this.props.data.pageImage.value } className="card-img" expandedValue={ this.props.data.pageImage.expandedValue } />
            <div className={ cardBodyContainerClass }>
                <div>
                    <h5 className="card-title">{ this.props.data.name }</h5>
                    <p className="card-text">{ this.props.data.teaserText.value }</p>
                    <a href={ this.props.data.url } className="btn btn-primary" onClick={ this.onClick.bind(this) }>{ this.props.data.teaserButtonText.value }</a>
                </div>
            </div>
        </div>
    }
}