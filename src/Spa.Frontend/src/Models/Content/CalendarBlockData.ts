import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'Episerver/Property'
import IContent, { BaseIContent } from 'Episerver/Models/IContent'
import ContentLink from 'Episerver/Models/ContentLink'
import { ComponentProps } from 'Episerver/EpiComponent'

/**
 * Calendar Block
 *
 * A block that lists a bunch of calendar events
 *
 * @GUID d5148c01-dfb0-4e57-8399-6ceebf48f38e
 */
export default interface CalendarBlockData extends IContent {
    /**
     * Categories
     *
     * Categories associated with this content
     */
    categories: Property<Array<ContentLink>>

    /**
     * Padding
     *
     * No description available
     */
    padding: StringProperty

    /**
     * Margin
     *
     * No description available
     */
    margin: StringProperty

    /**
     * Background color
     *
     * No description available
     */
    backgroundColor: StringProperty

    /**
     * Block opacity (0 to 1)
     *
     * No description available
     */
    blockOpacity: NumberProperty

    /**
     * View as
     *
     * No description available
     */
    viewMode: StringProperty

    /**
     * Events root
     *
     * No description available
     */
    eventsRoot: ContentReferenceProperty

    /**
     * Number of events
     *
     * No description available
     */
    count: NumberProperty

    /**
     * Filter by category
     *
     * No description available
     */
    categoryFilter: Property<any> // Original type: Category

    /**
     * Include all levels
     *
     * No description available
     */
    recursive: BooleanProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface CalendarBlockProps extends ComponentProps<CalendarBlockData> {}

export class CalendarBlockType extends BaseIContent<CalendarBlockData> implements CalendarBlockData {
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
    public categories: Property<Array<ContentLink>>;

    /**
     * Padding
     *
     * No description available
     */
    public padding: StringProperty;

    /**
     * Margin
     *
     * No description available
     */
    public margin: StringProperty;

    /**
     * Background color
     *
     * No description available
     */
    public backgroundColor: StringProperty;

    /**
     * Block opacity (0 to 1)
     *
     * No description available
     */
    public blockOpacity: NumberProperty;

    /**
     * View as
     *
     * No description available
     */
    public viewMode: StringProperty;

    /**
     * Events root
     *
     * No description available
     */
    public eventsRoot: ContentReferenceProperty;

    /**
     * Number of events
     *
     * No description available
     */
    public count: NumberProperty;

    /**
     * Filter by category
     *
     * No description available
     */
    public categoryFilter: Property<any> // Original type: Category;

    /**
     * Include all levels
     *
     * No description available
     */
    public recursive: BooleanProperty;

}
