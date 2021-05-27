import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * Navigation Block
 *
 * Render normal left/right navigation structures
 *
 * @GUID 7c53f707-c932-4fdd-a654-37ff2a1258eb
 */
export default interface NavigationBlockData extends Taxonomy.IContent {
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
     * Heading
     *
     * No description available
     */
    heading: ContentDelivery.StringProperty

    /**
     * Root page
     *
     * No description available
     */
    rootPage: ContentDelivery.ContentReferenceProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface NavigationBlockProps extends ComponentTypes.AbstractComponentProps<NavigationBlockData> {}

export class NavigationBlockType extends Taxonomy.AbstractIContent<NavigationBlockData> implements NavigationBlockData {
    protected _typeName : string = "NavigationBlock";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'categories': 'ContentReferenceList',
        'padding': 'LongString',
        'margin': 'LongString',
        'backgroundColor': 'LongString',
        'blockOpacity': 'FloatNumber',
        'heading': 'LongString',
        'rootPage': 'PageReference',
    }

    /**
     * Categories
     *
     * Categories associated with this content
     */
    public get categories() : NavigationBlockData["categories"] { return this.getProperty("categories"); }

    /**
     * Padding
     *
     * No description available
     */
    public get padding() : NavigationBlockData["padding"] { return this.getProperty("padding"); }

    /**
     * Margin
     *
     * No description available
     */
    public get margin() : NavigationBlockData["margin"] { return this.getProperty("margin"); }

    /**
     * Background color
     *
     * No description available
     */
    public get backgroundColor() : NavigationBlockData["backgroundColor"] { return this.getProperty("backgroundColor"); }

    /**
     * Block opacity (0 to 1)
     *
     * No description available
     */
    public get blockOpacity() : NavigationBlockData["blockOpacity"] { return this.getProperty("blockOpacity"); }

    /**
     * Heading
     *
     * No description available
     */
    public get heading() : NavigationBlockData["heading"] { return this.getProperty("heading"); }

    /**
     * Root page
     *
     * No description available
     */
    public get rootPage() : NavigationBlockData["rootPage"] { return this.getProperty("rootPage"); }

}
