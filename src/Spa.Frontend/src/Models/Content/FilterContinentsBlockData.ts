import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * Filter Continents Block
 *
 * Continent facets for locations
 *
 * @GUID 9103a763-4c9c-431e-bc11-f2794c3b4b80
 */
export default interface FilterContinentsBlockData extends Taxonomy.IContent {
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
export interface FilterContinentsBlockProps extends ComponentTypes.AbstractComponentProps<FilterContinentsBlockData> {}

export class FilterContinentsBlockType extends Taxonomy.AbstractIContent<FilterContinentsBlockData> implements FilterContinentsBlockData {
    protected _typeName : string = "FilterContinentsBlock";
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
    public get categories() : FilterContinentsBlockData["categories"] { return this.getProperty("categories"); }

    /**
     * Padding
     *
     * No description available
     */
    public get padding() : FilterContinentsBlockData["padding"] { return this.getProperty("padding"); }

    /**
     * Margin
     *
     * No description available
     */
    public get margin() : FilterContinentsBlockData["margin"] { return this.getProperty("margin"); }

    /**
     * Background color
     *
     * No description available
     */
    public get backgroundColor() : FilterContinentsBlockData["backgroundColor"] { return this.getProperty("backgroundColor"); }

    /**
     * Block opacity (0 to 1)
     *
     * No description available
     */
    public get blockOpacity() : FilterContinentsBlockData["blockOpacity"] { return this.getProperty("blockOpacity"); }

    /**
     * Filter title
     *
     * No description available
     */
    public get filterTitle() : FilterContinentsBlockData["filterTitle"] { return this.getProperty("filterTitle"); }

    /**
     * All condition text
     *
     * No description available
     */
    public get allConditionText() : FilterContinentsBlockData["allConditionText"] { return this.getProperty("allConditionText"); }

}
