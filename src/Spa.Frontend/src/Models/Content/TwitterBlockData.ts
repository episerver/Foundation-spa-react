import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * Twitter Feed Block
 *
 * Display content from a Twitter feed
 *
 * @GUID 8ed98895-c4a5-4d4d-8abf-43853bd46bc8
 */
export default interface TwitterBlockData extends Taxonomy.IContent {
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
     * Account name
     *
     * No description available
     */
    accountName: ContentDelivery.StringProperty

    /**
     * Number of items
     *
     * No description available
     */
    numberOfItems: ContentDelivery.NumberProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface TwitterBlockProps extends ComponentTypes.AbstractComponentProps<TwitterBlockData> {}

export class TwitterBlockType extends Taxonomy.AbstractIContent<TwitterBlockData> implements TwitterBlockData {
    protected _typeName : string = "TwitterBlock";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'categories': 'ContentReferenceList',
        'padding': 'LongString',
        'margin': 'LongString',
        'backgroundColor': 'LongString',
        'blockOpacity': 'FloatNumber',
        'accountName': 'LongString',
        'numberOfItems': 'Number',
    }

    /**
     * Categories
     *
     * Categories associated with this content
     */
    public get categories() : TwitterBlockData["categories"] { return this.getProperty("categories"); }

    /**
     * Padding
     *
     * No description available
     */
    public get padding() : TwitterBlockData["padding"] { return this.getProperty("padding"); }

    /**
     * Margin
     *
     * No description available
     */
    public get margin() : TwitterBlockData["margin"] { return this.getProperty("margin"); }

    /**
     * Background color
     *
     * No description available
     */
    public get backgroundColor() : TwitterBlockData["backgroundColor"] { return this.getProperty("backgroundColor"); }

    /**
     * Block opacity (0 to 1)
     *
     * No description available
     */
    public get blockOpacity() : TwitterBlockData["blockOpacity"] { return this.getProperty("blockOpacity"); }

    /**
     * Account name
     *
     * No description available
     */
    public get accountName() : TwitterBlockData["accountName"] { return this.getProperty("accountName"); }

    /**
     * Number of items
     *
     * No description available
     */
    public get numberOfItems() : TwitterBlockData["numberOfItems"] { return this.getProperty("numberOfItems"); }

}
