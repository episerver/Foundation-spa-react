import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'episerver/Property'
import IContent, { BaseIContent } from 'episerver/Models/IContent'
import ContentLink from 'episerver/Models/ContentLink'
import { ComponentProps } from 'episerver/EpiComponent'

/**
 * YouTube Block
 *
 * Display YouTube video
 *
 * @GUID 67429e0d-9365-407c-8a49-69489382bbdc
 */
export default interface YouTubeBlockData extends IContent {
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
     * YouTube link
     *
     * URL link to YouTube video
     */
    youTubeLink: StringProperty

    /**
     * Heading
     *
     * No description available
     */
    heading: StringProperty

    /**
     * Main body
     *
     * Descriptive text for the video
     */
    mainBody: StringProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface YouTubeBlockProps extends ComponentProps<YouTubeBlockData> {}

export class YouTubeBlockType extends BaseIContent<YouTubeBlockData> implements YouTubeBlockData {
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
     * YouTube link
     *
     * URL link to YouTube video
     */
    public youTubeLink: StringProperty;

    /**
     * Heading
     *
     * No description available
     */
    public heading: StringProperty;

    /**
     * Main body
     *
     * Descriptive text for the video
     */
    public mainBody: StringProperty;

}
