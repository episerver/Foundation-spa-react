import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * Breadcrumb Block
 *
 * Render normal navigation structures as a breadcrumb
 *
 * @GUID de43eb04-0d26-442a-91fc-e36e14a352b6
 */
export default interface BreadcrumbBlockData extends Taxonomy.IContent {
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
     * Destination page
     *
     * No description available
     */
    destinationPage: ContentDelivery.ContentReferenceProperty

    /**
     * Breadcrumb separator
     *
     * No description available
     */
    separator: ContentDelivery.StringProperty

    /**
     * Alignment option
     *
     * No description available
     */
    alignment: ContentDelivery.StringProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface BreadcrumbBlockProps extends ComponentTypes.AbstractComponentProps<BreadcrumbBlockData> {}

export class BreadcrumbBlockType extends Taxonomy.AbstractIContent<BreadcrumbBlockData> implements BreadcrumbBlockData {
    protected _typeName : string = "BreadcrumbBlock";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'categories': 'ContentReferenceList',
        'padding': 'LongString',
        'margin': 'LongString',
        'backgroundColor': 'LongString',
        'blockOpacity': 'FloatNumber',
        'destinationPage': 'PageReference',
        'separator': 'LongString',
        'alignment': 'LongString',
    }

    /**
     * Categories
     *
     * Categories associated with this content
     */
    public get categories() : BreadcrumbBlockData["categories"] { return this.getProperty("categories"); }

    /**
     * Padding
     *
     * No description available
     */
    public get padding() : BreadcrumbBlockData["padding"] { return this.getProperty("padding"); }

    /**
     * Margin
     *
     * No description available
     */
    public get margin() : BreadcrumbBlockData["margin"] { return this.getProperty("margin"); }

    /**
     * Background color
     *
     * No description available
     */
    public get backgroundColor() : BreadcrumbBlockData["backgroundColor"] { return this.getProperty("backgroundColor"); }

    /**
     * Block opacity (0 to 1)
     *
     * No description available
     */
    public get blockOpacity() : BreadcrumbBlockData["blockOpacity"] { return this.getProperty("blockOpacity"); }

    /**
     * Destination page
     *
     * No description available
     */
    public get destinationPage() : BreadcrumbBlockData["destinationPage"] { return this.getProperty("destinationPage"); }

    /**
     * Breadcrumb separator
     *
     * No description available
     */
    public get separator() : BreadcrumbBlockData["separator"] { return this.getProperty("separator"); }

    /**
     * Alignment option
     *
     * No description available
     */
    public get alignment() : BreadcrumbBlockData["alignment"] { return this.getProperty("alignment"); }

}
