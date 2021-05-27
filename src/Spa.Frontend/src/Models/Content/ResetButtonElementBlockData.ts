import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * ResetButtonElementBlock
 *
 * No Description available.
 *
 * @GUID 0bca37fd-ff33-4b6c-9fb3-2ab64b1d0bc2
 */
export default interface ResetButtonElementBlockData extends Taxonomy.IContent {
    /**
     * Label
     *
     * No description available
     */
    label: ContentDelivery.StringProperty

    /**
     * Description
     *
     * No description available
     */
    description: ContentDelivery.StringProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface ResetButtonElementBlockProps extends ComponentTypes.AbstractComponentProps<ResetButtonElementBlockData> {}

export class ResetButtonElementBlockType extends Taxonomy.AbstractIContent<ResetButtonElementBlockData> implements ResetButtonElementBlockData {
    protected _typeName : string = "ResetButtonElementBlock";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'label': 'LongString',
        'description': 'LongString',
    }

    /**
     * Label
     *
     * No description available
     */
    public get label() : ResetButtonElementBlockData["label"] { return this.getProperty("label"); }

    /**
     * Description
     *
     * No description available
     */
    public get description() : ResetButtonElementBlockData["description"] { return this.getProperty("description"); }

}
