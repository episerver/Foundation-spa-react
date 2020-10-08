import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * YouTube Block
 *
 * Display YouTube video
 *
 * @GUID 67429e0d-9365-407c-8a49-69489382bbdc
 */
export default interface YouTubeBlockData extends Taxonomy.IContent {
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
     * YouTube link
     *
     * URL link to YouTube video
     */
    youTubeLink: ContentDelivery.StringProperty

    /**
     * Heading
     *
     * No description available
     */
    heading: ContentDelivery.StringProperty

    /**
     * Main body
     *
     * Descriptive text for the video
     */
    mainBody: ContentDelivery.StringProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface YouTubeBlockProps extends ComponentTypes.AbstractComponentProps<YouTubeBlockData> {}

export class YouTubeBlockType extends Taxonomy.AbstractIContent<YouTubeBlockData> implements YouTubeBlockData {
    protected _typeName : string = "YouTubeBlock";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'categories': 'ContentReferenceList',
        'padding': 'LongString',
        'margin': 'LongString',
        'backgroundColor': 'LongString',
        'blockOpacity': 'FloatNumber',
        'youTubeLink': 'LongString',
        'heading': 'LongString',
        'mainBody': 'XhtmlString',
    }

    /**
     * Categories
     *
     * Categories associated with this content
     */
    public get categories() : YouTubeBlockData["categories"] { return this.getProperty("categories"); }

    /**
     * Padding
     *
     * No description available
     */
    public get padding() : YouTubeBlockData["padding"] { return this.getProperty("padding"); }

    /**
     * Margin
     *
     * No description available
     */
    public get margin() : YouTubeBlockData["margin"] { return this.getProperty("margin"); }

    /**
     * Background color
     *
     * No description available
     */
    public get backgroundColor() : YouTubeBlockData["backgroundColor"] { return this.getProperty("backgroundColor"); }

    /**
     * Block opacity (0 to 1)
     *
     * No description available
     */
    public get blockOpacity() : YouTubeBlockData["blockOpacity"] { return this.getProperty("blockOpacity"); }

    /**
     * YouTube link
     *
     * URL link to YouTube video
     */
    public get youTubeLink() : YouTubeBlockData["youTubeLink"] { return this.getProperty("youTubeLink"); }

    /**
     * Heading
     *
     * No description available
     */
    public get heading() : YouTubeBlockData["heading"] { return this.getProperty("heading"); }

    /**
     * Main body
     *
     * Descriptive text for the video
     */
    public get mainBody() : YouTubeBlockData["mainBody"] { return this.getProperty("mainBody"); }

}
