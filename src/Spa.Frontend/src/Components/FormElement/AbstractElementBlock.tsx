import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core';

export interface ElementBlockData extends Taxonomy.IContent
{
    /**
     * A list of validators to apply to the entered value
     */
    validators: ContentDelivery.StringProperty

    /**
     * The information for the property
     */
    description: ContentDelivery.StringProperty
}

export function isElementBlockData(data: Taxonomy.IContent) : data is ElementBlockData
{
    return (data as ElementBlockData)?.validators && typeof((data as ElementBlockData)?.validators) == "object";
}


export default class AbstractElementBlock<T extends Taxonomy.IContent> extends ComponentTypes.AbstractComponent<T>
{

}