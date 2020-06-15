import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from '@episerver/spa-core/Property'
import IContent, { BaseIContent } from '@episerver/spa-core/Models/IContent'
import ContentLink from '@episerver/spa-core/Models/ContentLink'
import { ComponentProps } from '@episerver/spa-core/EpiComponent'

/**
 * Vimeo Video
 *
 * Display Vimeo video
 *
 * @GUID a8172c33-e087-4e68-980e-a79b0e093675
 */
export default interface VimeoBlockData extends IContent {
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
     * Vimeo link
     *
     * URL link to Vimeo video
     */
    vimeoVideoLink: StringProperty

    /**
     * Cover image
     *
     * No description available
     */
    coverImage: ContentReferenceProperty

    /**
     * Heading
     *
     * No description available
     */
    heading: StringProperty

    /**
     * MainBody
     *
     * Descriptive text for the video
     */
    mainBody: StringProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface VimeoBlockProps extends ComponentProps<VimeoBlockData> {}

export class VimeoBlockType extends BaseIContent<VimeoBlockData> implements VimeoBlockData {
    protected _typeName : string = "VimeoBlock";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'categories': 'ContentReferenceList',
        'padding': 'LongString',
        'margin': 'LongString',
        'backgroundColor': 'LongString',
        'blockOpacity': 'FloatNumber',
        'vimeoVideoLink': 'LongString',
        'coverImage': 'ContentReference',
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
     * Vimeo link
     *
     * URL link to Vimeo video
     */
    public vimeoVideoLink: StringProperty;

    /**
     * Cover image
     *
     * No description available
     */
    public coverImage: ContentReferenceProperty;

    /**
     * Heading
     *
     * No description available
     */
    public heading: StringProperty;

    /**
     * MainBody
     *
     * Descriptive text for the video
     */
    public mainBody: StringProperty;

}
