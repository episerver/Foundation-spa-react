import React from 'react';
import Helmet from 'react-helmet';
import { Col, Row, Container } from 'reactstrap';
import { Components, Services } from '@episerver/spa-core';
import Breadcrumbs from '../Shared/Breadcrumbs';
import ClientSideMap from '../Shared/ClientSideMap';
import { LocationItemPageProps } from '../../Models/Content/LocationItemPageData';

import './LocationItemPage.scss';

export const LocationItemPage : React.FunctionComponent<LocationItemPageProps> = (props) => {

    const loc : [number, number] = [props.data.latitude?.value || 0, props.data.longitude?.value || 0]
    const myId = Services.ContentLink.createLanguageId(props.data, '##', true);

    return <Container className="location-item-page container">
        <Helmet>
            <title>{ props.data.metaTitle?.value || props.data.name }</title>
        </Helmet>
        <Row>
            <Col xs="12" className="header-image">
                <Components.Property iContent={props.data} field="image" />
                <h1><Components.Property iContent={ props.data } field="name" /></h1>
            </Col>
            <Col xs="12">
                <p>
                    <small><Components.Property iContent={props.data} field="continent" /> &gt; <Components.Property iContent={props.data} field="country" /></small>
                </p>
                <Breadcrumbs currentContent={ props.data } />
            </Col>
            <Col xs="12" md="8" xl="9">
                <Components.Property iContent={ props.data } field="mainBody" />
                <Components.Property iContent={ props.data } field="mainContentArea" />
            </Col>
            <Col xs="12" md="4" xl="3">
                <ClientSideMap zoom={ 9 } center={ loc } markers={ [ { id: myId, lat: loc[0], lng: loc[1] } ] } />
            </Col>
        </Row>
    </Container>
}

export default LocationItemPage;