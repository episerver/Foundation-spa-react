import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * Video Block
 *
 * Video Block
 *
 * @GUID 03d454f9-3be8-4421-9a5d-cbbe8e38443d
 */
export default interface VideoBlockData extends Taxonomy.IContent {
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
     * Video
     *
     * No description available
     */
    video: ContentDelivery.ContentReferenceProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface VideoBlockProps extends ComponentTypes.AbstractComponentProps<VideoBlockData> {}

export class VideoBlockType extends Taxonomy.AbstractIContent<VideoBlockData> implements VideoBlockData {
    protected _typeName : string = "VideoBlock";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'categories': 'ContentReferenceList',
        'padding': 'LongString',
        'margin': 'LongString',
        'backgroundColor': 'LongString',
        'blockOpacity': 'FloatNumber',
        'video': 'ContentReference',
    }

    /**
     * Categories
     *
     * Categories associated with this content
     */
    public get categories() : VideoBlockData["categories"] { return this.getProperty("categories"); }

    /**
     * Padding
     *
     * No description available
     */
    public get padding() : VideoBlockData["padding"] { return this.getProperty("padding"); }

    /**
     * Margin
     *
     * No description available
     */
    public get margin() : VideoBlockData["margin"] { return this.getProperty("margin"); }

    /**
     * Background color
     *
     * No description available
     */
    public get backgroundColor() : VideoBlockData["backgroundColor"] { return this.getProperty("backgroundColor"); }

    /**
     * Block opacity (0 to 1)
     *
     * No description available
     */
    public get blockOpacity() : VideoBlockData["blockOpacity"] { return this.getProperty("blockOpacity"); }

    /**
     * Video
     *
     * No description available
     */
    public get video() : VideoBlockData["video"] { return this.getProperty("video"); }

}
