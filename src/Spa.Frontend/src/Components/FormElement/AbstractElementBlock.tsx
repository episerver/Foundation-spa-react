import EpiComponent from "Episerver/EpiComponent";
import IContent from 'Episerver/Models/IContent';
import { StringProperty } from "Episerver/Property";

export interface ElementBlockData extends IContent
{
    /**
     * A list of validators to apply to the entered value
     */
    validators: StringProperty

    /**
     * The information for the property
     */
    description: StringProperty
}

export function isElementBlockData(data: IContent) : data is ElementBlockData
{
    return (data as ElementBlockData)?.validators && typeof((data as ElementBlockData)?.validators) == "object";
}


export default class AbstractElementBlock<T extends IContent> extends EpiComponent<T>
{

}