import React, { ReactNode, ReactNodeArray } from "react";
import EpiComponent from "Episerver/EpiComponent";
import ContentRecommendationsBlockData from 'app/Models/Content/ContentRecommendationsBlockData';

export default class ContentRecommendationsBlock extends EpiComponent<ContentRecommendationsBlockData>
{
    public render() : null | ReactNode | ReactNodeArray
    {
        return <div className="alert alert-warning">Content recommendations are not yet available.</div>

        let tpl = this.props.data.recommendationsTemplate?.value;
        let count = this.props.data.numberOfRecommendations?.value;
        let key = this.props.data.deliveryAPIKey?.value;
        return <script className="idio-recommendations" type="text/x-mustache" data-api-key={ key } data-rpp={ count } dangerouslySetInnerHTML={ {__html: tpl } } />;
    }
}