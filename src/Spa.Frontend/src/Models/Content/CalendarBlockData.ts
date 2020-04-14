import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'Episerver/Property'
import IContent from 'Episerver/Models/IContent'
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
