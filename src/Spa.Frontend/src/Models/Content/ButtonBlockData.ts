import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * Button Block
 *
 * Used to insert a link which is styled as a button
 *
 * @GUID 426cf12f-1f01-4ea0-922f-0778314ddaf0
 */
export default interface ButtonBlockData extends Taxonomy.IContent {
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
     * Label
     *
     * No description available
     */
    buttonText: ContentDelivery.StringProperty

    /**
     * Link
     *
     * No description available
     */
    buttonLink: ContentDelivery.StringProperty

    /**
     * Style
     *
     * No description available
     */
    buttonStyle: ContentDelivery.StringProperty

    /**
     * Reassuring caption
     *
     * No description available
     */
    buttonCaption: ContentDelivery.StringProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface ButtonBlockProps extends ComponentTypes.AbstractComponentProps<ButtonBlockData> {}

export class ButtonBlockType extends Taxonomy.AbstractIContent<ButtonBlockData> implements ButtonBlockData {
    protected _typeName : string = "ButtonBlock";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'categories': 'ContentReferenceList',
        'padding': 'LongString',
        'margin': 'LongString',
        'backgroundColor': 'LongString',
        'blockOpacity': 'FloatNumber',
        'buttonText': 'LongString',
        'buttonLink': 'Url',
        'buttonStyle': 'LongString',
        'buttonCaption': 'LongString',
    }

    /**
     * Categories
     *
     * Categories associated with this content
     */
    public get categories() : ButtonBlockData["categories"] { return this.getProperty("categories"); }

    /**
     * Padding
     *
     * No description available
     */
    public get padding() : ButtonBlockData["padding"] { return this.getProperty("padding"); }

    /**
     * Margin
     *
     * No description available
     */
    public get margin() : ButtonBlockData["margin"] { return this.getProperty("margin"); }

    /**
     * Background color
     *
     * No description available
     */
    public get backgroundColor() : ButtonBlockData["backgroundColor"] { return this.getProperty("backgroundColor"); }

    /**
     * Block opacity (0 to 1)
     *
     * No description available
     */
    public get blockOpacity() : ButtonBlockData["blockOpacity"] { return this.getProperty("blockOpacity"); }

    /**
     * Label
     *
     * No description available
     */
    public get buttonText() : ButtonBlockData["buttonText"] { return this.getProperty("buttonText"); }

    /**
     * Link
     *
     * No description available
     */
    public get buttonLink() : ButtonBlockData["buttonLink"] { return this.getProperty("buttonLink"); }

    /**
     * Style
     *
     * No description available
     */
    public get buttonStyle() : ButtonBlockData["buttonStyle"] { return this.getProperty("buttonStyle"); }

    /**
     * Reassuring caption
     *
     * No description available
     */
    public get buttonCaption() : ButtonBlockData["buttonCaption"] { return this.getProperty("buttonCaption"); }

}
