import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * Google Maps Embed Block
 *
 * Display Google Maps Embed
 *
 * @GUID 8fc31051-6d22-4445-b92d-7c394267fa49
 */
export default interface GoogleMapsEmbedBlockData extends Taxonomy.IContent {
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
     * API Key
     *
     * No description available
     */
    apiKey: ContentDelivery.StringProperty

    /**
     * Search term
     *
     * No description available
     */
    searchTerm: ContentDelivery.StringProperty

    /**
     * Height
     *
     * No description available
     */
    height: ContentDelivery.NumberProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface GoogleMapsEmbedBlockProps extends ComponentTypes.AbstractComponentProps<GoogleMapsEmbedBlockData> {}

export class GoogleMapsEmbedBlockType extends Taxonomy.AbstractIContent<GoogleMapsEmbedBlockData> implements GoogleMapsEmbedBlockData {
    protected _typeName : string = "GoogleMapsEmbedBlock";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'categories': 'ContentReferenceList',
        'padding': 'LongString',
        'margin': 'LongString',
        'backgroundColor': 'LongString',
        'blockOpacity': 'FloatNumber',
        'apiKey': 'LongString',
        'searchTerm': 'LongString',
        'height': 'FloatNumber',
    }

    /**
     * Categories
     *
     * Categories associated with this content
     */
    public get categories() : GoogleMapsEmbedBlockData["categories"] { return this.getProperty("categories"); }

    /**
     * Padding
     *
     * No description available
     */
    public get padding() : GoogleMapsEmbedBlockData["padding"] { return this.getProperty("padding"); }

    /**
     * Margin
     *
     * No description available
     */
    public get margin() : GoogleMapsEmbedBlockData["margin"] { return this.getProperty("margin"); }

    /**
     * Background color
     *
     * No description available
     */
    public get backgroundColor() : GoogleMapsEmbedBlockData["backgroundColor"] { return this.getProperty("backgroundColor"); }

    /**
     * Block opacity (0 to 1)
     *
     * No description available
     */
    public get blockOpacity() : GoogleMapsEmbedBlockData["blockOpacity"] { return this.getProperty("blockOpacity"); }

    /**
     * API Key
     *
     * No description available
     */
    public get apiKey() : GoogleMapsEmbedBlockData["apiKey"] { return this.getProperty("apiKey"); }

    /**
     * Search term
     *
     * No description available
     */
    public get searchTerm() : GoogleMapsEmbedBlockData["searchTerm"] { return this.getProperty("searchTerm"); }

    /**
     * Height
     *
     * No description available
     */
    public get height() : GoogleMapsEmbedBlockData["height"] { return this.getProperty("height"); }

}
