import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * Filter Distances Block
 *
 * Distance facets for locations
 *
 * @GUID eab40a8c-9006-4766-a87e-1dec153e735f
 */
export default interface FilterDistancesBlockData extends Taxonomy.IContent {
    /**
     * Categories
     *
     * Categories associated with this content
     */
    categories: ContentDelivery.ContentReferenceListProperty

    /**
     * Padding
     *
     * No description available
     */
    padding: ContentDelivery.StringProperty

    /**
     * Margin
     *
     * No description available
     */
    margin: ContentDelivery.StringProperty

    /**
     * Background color
     *
     * No description available
     */
    backgroundColor: ContentDelivery.StringProperty

    /**
     * Block opacity (0 to 1)
     *
     * No description available
     */
    blockOpacity: ContentDelivery.NumberProperty

    /**
     * Filter title
     *
     * No description available
     */
    filterTitle: ContentDelivery.StringProperty

    /**
     * All condition text
     *
     * No description available
     */
    allConditionText: ContentDelivery.StringProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface FilterDistancesBlockProps extends ComponentTypes.AbstractComponentProps<FilterDistancesBlockData> {}

export class FilterDistancesBlockType extends Taxonomy.AbstractIContent<FilterDistancesBlockData> implements FilterDistancesBlockData {
    protected _typeName : string = "FilterDistancesBlock";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'categories': 'ContentReferenceList',
        'padding': 'LongString',
        'margin': 'LongString',
        'backgroundColor': 'LongString',
        'blockOpacity': 'FloatNumber',
        'filterTitle': 'LongString',
        'allConditionText': 'LongString',
    }

    /**
     * Categories
     *
     * Categories associated with this content
     */
    public get categories() : FilterDistancesBlockData["categories"] { return this.getProperty("categories"); }

    /**
     * Padding
     *
     * No description available
     */
    public get padding() : FilterDistancesBlockData["padding"] { return this.getProperty("padding"); }

    /**
     * Margin
     *
     * No description available
     */
    public get margin() : FilterDistancesBlockData["margin"] { return this.getProperty("margin"); }

    /**
     * Background color
     *
     * No description available
     */
    public get backgroundColor() : FilterDistancesBlockData["backgroundColor"] { return this.getProperty("backgroundColor"); }

    /**
     * Block opacity (0 to 1)
     *
     * No description available
     */
    public get blockOpacity() : FilterDistancesBlockData["blockOpacity"] { return this.getProperty("blockOpacity"); }

    /**
     * Filter title
     *
     * No description available
     */
    public get filterTitle() : FilterDistancesBlockData["filterTitle"] { return this.getProperty("filterTitle"); }

    /**
     * All condition text
     *
     * No description available
     */
    public get allConditionText() : FilterDistancesBlockData["allConditionText"] { return this.getProperty("allConditionText"); }

}
