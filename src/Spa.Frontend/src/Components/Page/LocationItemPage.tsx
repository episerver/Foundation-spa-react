import React from 'react';
import Helmet from 'react-helmet';
import { Components, Services, Taxonomy } from '@episerver/spa-core';
import Breadcrumbs from 'app/Components/Shared/Breadcrumbs';
import ClientSideMap from 'app/Components/Shared/ClientSideMap';
import HeaderImage from 'app/Components/Shared/HeaderImage';
import { LocationItemPageProps } from 'app/Models/Content/LocationItemPageData';

import './LocationItemPage.scss';

export const LocationItemPage : React.FunctionComponent<LocationItemPageProps> = (props) => {

    const loc : [number, number] = [Taxonomy.Property.readPropertyValue(props.data, "latitude") || 0, Taxonomy.Property.readPropertyValue(props.data, "longitude") || 0]
    const myId = Services.ContentLink.createLanguageId(props.data, '##', true);
    const metaTitle = Taxonomy.Property.readPropertyValue(props.data, "metaTitle") || Taxonomy.Property.readPropertyValue(props.data, "name");

    return <div className="location-item-page container">
        <Helmet>
            <title>{ metaTitle }</title>
        </Helmet>
        <div className="row">
            <HeaderImage content={ props.data } background="image" title="name" className="col-12" />
            <div className="col-12">
                <p>
                    <small className="text-muted"><Components.Property iContent={props.data} field="continent" /> &gt; <Components.Property iContent={props.data} field="country" /></small>
                </p>
                <Breadcrumbs currentContent={ props.data } />
            </div>
            <div className="col-12 col-md-8 col-xl-9">
                <Components.Property iContent={ props.data } field="mainBody" />
                <Components.Property iContent={ props.data } field="mainContentArea" />
            </div>
            <div className="col-12 col-md-4 col-xl-3">
                <ClientSideMap zoom={ 9 } center={ loc } markers={ [ { id: myId, lat: loc[0], lng: loc[1] } ] } />
            </div>
        </div>
    </div>
}

export default LocationItemPage;