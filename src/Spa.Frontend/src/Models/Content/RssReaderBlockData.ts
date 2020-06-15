import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from '@episerver/spa-core/Property'
import IContent, { BaseIContent } from '@episerver/spa-core/Models/IContent'
import ContentLink from '@episerver/spa-core/Models/ContentLink'
import { ComponentProps } from '@episerver/spa-core/EpiComponent'

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

export class RssReaderBlockType extends BaseIContent<RssReaderBlockData> implements RssReaderBlockData {
    protected _typeName : string = "RssReaderBlock";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'categories': 'ContentReferenceList',
        'padding': 'LongString',
        'margin': 'LongString',
        'backgroundColor': 'LongString',
        'blockOpacity': 'FloatNumber',
        'rssUrl': 'Url',
        'maxCount': 'Number',
        'includePublishDate': 'Boolean',
        'heading': 'LongString',
        'mainBody': 'XhtmlString',
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
     * RSS feed URL
     *
     * URL for RSS feed
     */
    public rssUrl: StringProperty;

    /**
     * Number of results
     *
     * Maximum number of items to display
     */
    public maxCount: NumberProperty;

    /**
     * Include publish date
     *
     * Include publish date for each item in list
     */
    public includePublishDate: BooleanProperty;

    /**
     * Heading
     *
     * No description available
     */
    public heading: StringProperty;

    /**
     * Main body
     *
     * Descriptive text for the RSS feed
     */
    public mainBody: StringProperty;

}
