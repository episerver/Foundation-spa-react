import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'Episerver/Property'
import IContent from 'Episerver/Models/IContent'
import ContentLink from 'Episerver/Models/ContentLink'
import { ComponentProps } from 'Episerver/EpiComponent'

/**
 * RSS Reader Block
 *
 * Display content from a RSS feed
 *
 * @GUID 8fc5a3bb-727c-4871-8b2e-5ff337e30e82
 */
export default interface RssReaderBlockData extends IContent {
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
     * RSS feed URL
     *
     * URL for RSS feed
     */
    rssUrl: StringProperty

    /**
     * Number of results
     *
     * Maximum number of items to display
     */
    maxCount: NumberProperty

    /**
     * Include publish date
     *
     * Include publish date for each item in list
     */
    includePublishDate: BooleanProperty

    /**
     * Heading
     *
     * No description available
     */
    heading: StringProperty

    /**
     * Main body
     *
     * Descriptive text for the RSS feed
     */
    mainBody: StringProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface RssReaderBlockProps extends ComponentProps<RssReaderBlockData> {}
