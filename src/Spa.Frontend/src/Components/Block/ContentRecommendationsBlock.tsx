import React, { ReactNode, ReactNodeArray } from "react";
import EpiComponent from "Episerver/EpiComponent";
import ContentRecommendationsBlockData from 'app/Models/Content/ContentRecommendationsBlockData';

export default class ContentRecommendationsBlock extends EpiComponent<ContentRecommendationsBlockData>
{
    public render() : null | ReactNode | ReactNodeArray
    {
        return <div>ContentRecommendationsBlock</div>;
    }
}