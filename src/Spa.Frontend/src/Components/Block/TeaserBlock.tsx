import React, { ReactNode, ReactNodeArray } from "react";
import EpiComponent from "Episerver/EpiComponent";
import TeaserBlockData from 'app/Models/Content/TeaserBlockData';

export default class TeaserBlock extends EpiComponent<TeaserBlockData>
{
    public render() : null | ReactNode | ReactNodeArray
    {
        return <div>TeaserBlock</div>;
    }
}