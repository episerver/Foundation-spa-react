import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * Container Block
 *
 * Allow to style individual blocks, as well as groups of blocks
 *
 * @GUID 8bdfac81-1dbd-43b9-a012-522bd67ee8b3
 */
export default interface ContainerBlockData extends Taxonomy.IContent {
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
     * Main content area
     *
     * No description available
     */
    mainContentArea: ContentDelivery.ContentAreaProperty

    /**
     * CSS class
     *
     * No description available
     */
    cssClass: ContentDelivery.StringProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface ContainerBlockProps extends ComponentTypes.AbstractComponentProps<ContainerBlockData> {}

export class ContainerBlockType extends Taxonomy.AbstractIContent<ContainerBlockData> implements ContainerBlockData {
    protected _typeName : string = "ContainerBlock";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'categories': 'ContentReferenceList',
        'padding': 'LongString',
        'margin': 'LongString',
        'backgroundColor': 'LongString',
        'blockOpacity': 'FloatNumber',
        'mainContentArea': 'ContentArea',
        'cssClass': 'LongString',
    }

    /**
     * Categories
     *
     * Categories associated with this content
     */
    public get categories() : ContainerBlockData["categories"] { return this.getProperty("categories"); }

    /**
     * Padding
     *
     * No description available
     */
    public get padding() : ContainerBlockData["padding"] { return this.getProperty("padding"); }

    /**
     * Margin
     *
     * No description available
     */
    public get margin() : ContainerBlockData["margin"] { return this.getProperty("margin"); }

    /**
     * Background color
     *
     * No description available
     */
    public get backgroundColor() : ContainerBlockData["backgroundColor"] { return this.getProperty("backgroundColor"); }

    /**
     * Block opacity (0 to 1)
     *
     * No description available
     */
    public get blockOpacity() : ContainerBlockData["blockOpacity"] { return this.getProperty("blockOpacity"); }

    /**
     * Main content area
     *
     * No description available
     */
    public get mainContentArea() : ContainerBlockData["mainContentArea"] { return this.getProperty("mainContentArea"); }

    /**
     * CSS class
     *
     * No description available
     */
    public get cssClass() : ContainerBlockData["cssClass"] { return this.getProperty("cssClass"); }

}
