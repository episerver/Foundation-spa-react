import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * Filter Activities Block
 *
 * Activity facets for locations
 *
 * @GUID 918c590e-b2cd-4b87-9116-899b1db19117
 */
export default interface FilterActivitiesBlockData extends Taxonomy.IContent {
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
export interface FilterActivitiesBlockProps extends ComponentTypes.AbstractComponentProps<FilterActivitiesBlockData> {}

export class FilterActivitiesBlockType extends Taxonomy.AbstractIContent<FilterActivitiesBlockData> implements FilterActivitiesBlockData {
    protected _typeName : string = "FilterActivitiesBlock";
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
    public get categories() : FilterActivitiesBlockData["categories"] { return this.getProperty("categories"); }

    /**
     * Padding
     *
     * No description available
     */
    public get padding() : FilterActivitiesBlockData["padding"] { return this.getProperty("padding"); }

    /**
     * Margin
     *
     * No description available
     */
    public get margin() : FilterActivitiesBlockData["margin"] { return this.getProperty("margin"); }

    /**
     * Background color
     *
     * No description available
     */
    public get backgroundColor() : FilterActivitiesBlockData["backgroundColor"] { return this.getProperty("backgroundColor"); }

    /**
     * Block opacity (0 to 1)
     *
     * No description available
     */
    public get blockOpacity() : FilterActivitiesBlockData["blockOpacity"] { return this.getProperty("blockOpacity"); }

    /**
     * Filter title
     *
     * No description available
     */
    public get filterTitle() : FilterActivitiesBlockData["filterTitle"] { return this.getProperty("filterTitle"); }

    /**
     * All condition text
     *
     * No description available
     */
    public get allConditionText() : FilterActivitiesBlockData["allConditionText"] { return this.getProperty("allConditionText"); }

}
