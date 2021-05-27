import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * Vimeo Video
 *
 * Display Vimeo video
 *
 * @GUID a8172c33-e087-4e68-980e-a79b0e093675
 */
export default interface VimeoBlockData extends Taxonomy.IContent {
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
     * Vimeo link
     *
     * URL link to Vimeo video
     */
    vimeoVideoLink: ContentDelivery.StringProperty

    /**
     * Cover image
     *
     * No description available
     */
    coverImage: ContentDelivery.ContentReferenceProperty

    /**
     * Heading
     *
     * No description available
     */
    heading: ContentDelivery.StringProperty

    /**
     * MainBody
     *
     * Descriptive text for the video
     */
    mainBody: ContentDelivery.StringProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface VimeoBlockProps extends ComponentTypes.AbstractComponentProps<VimeoBlockData> {}

export class VimeoBlockType extends Taxonomy.AbstractIContent<VimeoBlockData> implements VimeoBlockData {
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
    public get categories() : VimeoBlockData["categories"] { return this.getProperty("categories"); }

    /**
     * Padding
     *
     * No description available
     */
    public get padding() : VimeoBlockData["padding"] { return this.getProperty("padding"); }

    /**
     * Margin
     *
     * No description available
     */
    public get margin() : VimeoBlockData["margin"] { return this.getProperty("margin"); }

    /**
     * Background color
     *
     * No description available
     */
    public get backgroundColor() : VimeoBlockData["backgroundColor"] { return this.getProperty("backgroundColor"); }

    /**
     * Block opacity (0 to 1)
     *
     * No description available
     */
    public get blockOpacity() : VimeoBlockData["blockOpacity"] { return this.getProperty("blockOpacity"); }

    /**
     * Vimeo link
     *
     * URL link to Vimeo video
     */
    public get vimeoVideoLink() : VimeoBlockData["vimeoVideoLink"] { return this.getProperty("vimeoVideoLink"); }

    /**
     * Cover image
     *
     * No description available
     */
    public get coverImage() : VimeoBlockData["coverImage"] { return this.getProperty("coverImage"); }

    /**
     * Heading
     *
     * No description available
     */
    public get heading() : VimeoBlockData["heading"] { return this.getProperty("heading"); }

    /**
     * MainBody
     *
     * Descriptive text for the video
     */
    public get mainBody() : VimeoBlockData["mainBody"] { return this.getProperty("mainBody"); }

}
