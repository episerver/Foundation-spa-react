import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * Carousel Block
 *
 * Allows users to create a slider using a collection of Images or Hero blocks
 *
 * @GUID 980ead74-1d13-45d6-9c5c-16f900269ee6
 */
export default interface CarouselBlockData extends Taxonomy.IContent {
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
     * Carousel items
     *
     * List of carousel items
     */
    carouselItems: ContentDelivery.ContentAreaProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface CarouselBlockProps extends ComponentTypes.AbstractComponentProps<CarouselBlockData> {}

export class CarouselBlockType extends Taxonomy.AbstractIContent<CarouselBlockData> implements CarouselBlockData {
    protected _typeName : string = "CarouselBlock";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'categories': 'ContentReferenceList',
        'padding': 'LongString',
        'margin': 'LongString',
        'backgroundColor': 'LongString',
        'blockOpacity': 'FloatNumber',
        'carouselItems': 'ContentArea',
    }

    /**
     * Categories
     *
     * Categories associated with this content
     */
    public get categories() : CarouselBlockData["categories"] { return this.getProperty("categories"); }

    /**
     * Padding
     *
     * No description available
     */
    public get padding() : CarouselBlockData["padding"] { return this.getProperty("padding"); }

    /**
     * Margin
     *
     * No description available
     */
    public get margin() : CarouselBlockData["margin"] { return this.getProperty("margin"); }

    /**
     * Background color
     *
     * No description available
     */
    public get backgroundColor() : CarouselBlockData["backgroundColor"] { return this.getProperty("backgroundColor"); }

    /**
     * Block opacity (0 to 1)
     *
     * No description available
     */
    public get blockOpacity() : CarouselBlockData["blockOpacity"] { return this.getProperty("blockOpacity"); }

    /**
     * Carousel items
     *
     * List of carousel items
     */
    public get carouselItems() : CarouselBlockData["carouselItems"] { return this.getProperty("carouselItems"); }

}
