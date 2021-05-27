import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * Filter Temperatures Block
 *
 * Temperature slider for locations
 *
 * @GUID 28629b4b-9475-4c44-9c15-31961391f166
 */
export default interface FilterTemperaturesBlockData extends Taxonomy.IContent {
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
export interface FilterTemperaturesBlockProps extends ComponentTypes.AbstractComponentProps<FilterTemperaturesBlockData> {}

export class FilterTemperaturesBlockType extends Taxonomy.AbstractIContent<FilterTemperaturesBlockData> implements FilterTemperaturesBlockData {
    protected _typeName : string = "FilterTemperaturesBlock";
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
    public get categories() : FilterTemperaturesBlockData["categories"] { return this.getProperty("categories"); }

    /**
     * Padding
     *
     * No description available
     */
    public get padding() : FilterTemperaturesBlockData["padding"] { return this.getProperty("padding"); }

    /**
     * Margin
     *
     * No description available
     */
    public get margin() : FilterTemperaturesBlockData["margin"] { return this.getProperty("margin"); }

    /**
     * Background color
     *
     * No description available
     */
    public get backgroundColor() : FilterTemperaturesBlockData["backgroundColor"] { return this.getProperty("backgroundColor"); }

    /**
     * Block opacity (0 to 1)
     *
     * No description available
     */
    public get blockOpacity() : FilterTemperaturesBlockData["blockOpacity"] { return this.getProperty("blockOpacity"); }

    /**
     * Filter title
     *
     * No description available
     */
    public get filterTitle() : FilterTemperaturesBlockData["filterTitle"] { return this.getProperty("filterTitle"); }

    /**
     * All condition text
     *
     * No description available
     */
    public get allConditionText() : FilterTemperaturesBlockData["allConditionText"] { return this.getProperty("allConditionText"); }

}
