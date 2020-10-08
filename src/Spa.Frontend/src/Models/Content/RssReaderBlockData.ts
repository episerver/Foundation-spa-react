import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * RSS Reader Block
 *
 * Display content from a RSS feed
 *
 * @GUID 8fc5a3bb-727c-4871-8b2e-5ff337e30e82
 */
export default interface RssReaderBlockData extends Taxonomy.IContent {
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
     * RSS feed URL
     *
     * URL for RSS feed
     */
    rssUrl: ContentDelivery.StringProperty

    /**
     * Number of results
     *
     * Maximum number of items to display
     */
    maxCount: ContentDelivery.NumberProperty

    /**
     * Include publish date
     *
     * Include publish date for each item in list
     */
    includePublishDate: ContentDelivery.BooleanProperty

    /**
     * Heading
     *
     * No description available
     */
    heading: ContentDelivery.StringProperty

    /**
     * Main body
     *
     * Descriptive text for the RSS feed
     */
    mainBody: ContentDelivery.StringProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface RssReaderBlockProps extends ComponentTypes.AbstractComponentProps<RssReaderBlockData> {}

export class RssReaderBlockType extends Taxonomy.AbstractIContent<RssReaderBlockData> implements RssReaderBlockData {
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
    public get categories() : RssReaderBlockData["categories"] { return this.getProperty("categories"); }

    /**
     * Padding
     *
     * No description available
     */
    public get padding() : RssReaderBlockData["padding"] { return this.getProperty("padding"); }

    /**
     * Margin
     *
     * No description available
     */
    public get margin() : RssReaderBlockData["margin"] { return this.getProperty("margin"); }

    /**
     * Background color
     *
     * No description available
     */
    public get backgroundColor() : RssReaderBlockData["backgroundColor"] { return this.getProperty("backgroundColor"); }

    /**
     * Block opacity (0 to 1)
     *
     * No description available
     */
    public get blockOpacity() : RssReaderBlockData["blockOpacity"] { return this.getProperty("blockOpacity"); }

    /**
     * RSS feed URL
     *
     * URL for RSS feed
     */
    public get rssUrl() : RssReaderBlockData["rssUrl"] { return this.getProperty("rssUrl"); }

    /**
     * Number of results
     *
     * Maximum number of items to display
     */
    public get maxCount() : RssReaderBlockData["maxCount"] { return this.getProperty("maxCount"); }

    /**
     * Include publish date
     *
     * Include publish date for each item in list
     */
    public get includePublishDate() : RssReaderBlockData["includePublishDate"] { return this.getProperty("includePublishDate"); }

    /**
     * Heading
     *
     * No description available
     */
    public get heading() : RssReaderBlockData["heading"] { return this.getProperty("heading"); }

    /**
     * Main body
     *
     * Descriptive text for the RSS feed
     */
    public get mainBody() : RssReaderBlockData["mainBody"] { return this.getProperty("mainBody"); }

}
