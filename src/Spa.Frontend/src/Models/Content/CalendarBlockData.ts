import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * Calendar Block
 *
 * A block that lists a bunch of calendar events
 *
 * @GUID d5148c01-dfb0-4e57-8399-6ceebf48f38e
 */
export default interface CalendarBlockData extends Taxonomy.IContent {
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
     * View as
     *
     * No description available
     */
    viewMode: ContentDelivery.StringProperty

    /**
     * Events root
     *
     * No description available
     */
    eventsRoot: ContentDelivery.ContentReferenceProperty

    /**
     * Number of events
     *
     * No description available
     */
    count: ContentDelivery.NumberProperty

    /**
     * Filter by category
     *
     * No description available
     */
    categoryFilter: ContentDelivery.Property<any> // Original type: Category

    /**
     * Include all levels
     *
     * No description available
     */
    recursive: ContentDelivery.BooleanProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface CalendarBlockProps extends ComponentTypes.AbstractComponentProps<CalendarBlockData> {}

export class CalendarBlockType extends Taxonomy.AbstractIContent<CalendarBlockData> implements CalendarBlockData {
    protected _typeName : string = "CalendarBlock";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'categories': 'ContentReferenceList',
        'padding': 'LongString',
        'margin': 'LongString',
        'backgroundColor': 'LongString',
        'blockOpacity': 'FloatNumber',
        'viewMode': 'LongString',
        'eventsRoot': 'PageReference',
        'count': 'Number',
        'categoryFilter': 'Category',
        'recursive': 'Boolean',
    }

    /**
     * Categories
     *
     * Categories associated with this content
     */
    public get categories() : CalendarBlockData["categories"] { return this.getProperty("categories"); }

    /**
     * Padding
     *
     * No description available
     */
    public get padding() : CalendarBlockData["padding"] { return this.getProperty("padding"); }

    /**
     * Margin
     *
     * No description available
     */
    public get margin() : CalendarBlockData["margin"] { return this.getProperty("margin"); }

    /**
     * Background color
     *
     * No description available
     */
    public get backgroundColor() : CalendarBlockData["backgroundColor"] { return this.getProperty("backgroundColor"); }

    /**
     * Block opacity (0 to 1)
     *
     * No description available
     */
    public get blockOpacity() : CalendarBlockData["blockOpacity"] { return this.getProperty("blockOpacity"); }

    /**
     * View as
     *
     * No description available
     */
    public get viewMode() : CalendarBlockData["viewMode"] { return this.getProperty("viewMode"); }

    /**
     * Events root
     *
     * No description available
     */
    public get eventsRoot() : CalendarBlockData["eventsRoot"] { return this.getProperty("eventsRoot"); }

    /**
     * Number of events
     *
     * No description available
     */
    public get count() : CalendarBlockData["count"] { return this.getProperty("count"); }

    /**
     * Filter by category
     *
     * No description available
     */
    public get categoryFilter() : CalendarBlockData["categoryFilter"] { return this.getProperty("categoryFilter"); }

    /**
     * Include all levels
     *
     * No description available
     */
    public get recursive() : CalendarBlockData["recursive"] { return this.getProperty("recursive"); }

}
