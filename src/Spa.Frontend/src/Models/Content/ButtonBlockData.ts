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
     * Use Custom Text Color
     *
     * This will determine whether or not to overdride text color
     */
    textColorOverdrive: ContentDelivery.BooleanProperty

    /**
     * Use Custom Background Color
     *
     * This will determine whether or not to overdride background color
     */
    backgroundColorOverdrive: ContentDelivery.BooleanProperty

    /**
     * Use Custom Border
     *
     * This will determine whether or not to overdride border style
     */
    borderStyleOverdrive: ContentDelivery.BooleanProperty

    /**
     * Label
     *
     * No description available
     */
    buttonText: ContentDelivery.StringProperty

    /**
     * Use transparent background
     *
     * This will determine whether or not to use transparent background
     */
    showTransparentBackground: ContentDelivery.BooleanProperty

    /**
     * Border Styles
     *
     * This will determine whether or not to show border
     */
    borderStyle: ContentDelivery.StringProperty

    /**
     * Link
     *
     * No description available
     */
    buttonLink: ContentDelivery.StringProperty

    /**
     * Button background color
     *
     * No description available
     */
    buttonBackgroundColor: ContentDelivery.StringProperty

    /**
     * Border width (px)
     *
     * No description available
     */
    borderWidth: ContentDelivery.NumberProperty

    /**
     * Style
     *
     * No description available
     */
    buttonStyle: ContentDelivery.StringProperty

    /**
     * Button Border color
     *
     * No description available
     */
    buttonBorderColor: ContentDelivery.StringProperty

    /**
     * Reassuring caption
     *
     * No description available
     */
    buttonCaption: ContentDelivery.StringProperty

    /**
     * Button Text color
     *
     * No description available
     */
    buttonTextColor: ContentDelivery.StringProperty

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
        'textColorOverdrive': 'Boolean',
        'backgroundColorOverdrive': 'Boolean',
        'borderStyleOverdrive': 'Boolean',
        'buttonText': 'LongString',
        'showTransparentBackground': 'Boolean',
        'borderStyle': 'LongString',
        'buttonLink': 'Url',
        'buttonBackgroundColor': 'LongString',
        'borderWidth': 'Number',
        'buttonStyle': 'LongString',
        'buttonBorderColor': 'LongString',
        'buttonCaption': 'LongString',
        'buttonTextColor': 'LongString',
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
     * Use Custom Text Color
     *
     * This will determine whether or not to overdride text color
     */
    public get textColorOverdrive() : ButtonBlockData["textColorOverdrive"] { return this.getProperty("textColorOverdrive"); }

    /**
     * Use Custom Background Color
     *
     * This will determine whether or not to overdride background color
     */
    public get backgroundColorOverdrive() : ButtonBlockData["backgroundColorOverdrive"] { return this.getProperty("backgroundColorOverdrive"); }

    /**
     * Use Custom Border
     *
     * This will determine whether or not to overdride border style
     */
    public get borderStyleOverdrive() : ButtonBlockData["borderStyleOverdrive"] { return this.getProperty("borderStyleOverdrive"); }

    /**
     * Label
     *
     * No description available
     */
    public get buttonText() : ButtonBlockData["buttonText"] { return this.getProperty("buttonText"); }

    /**
     * Use transparent background
     *
     * This will determine whether or not to use transparent background
     */
    public get showTransparentBackground() : ButtonBlockData["showTransparentBackground"] { return this.getProperty("showTransparentBackground"); }

    /**
     * Border Styles
     *
     * This will determine whether or not to show border
     */
    public get borderStyle() : ButtonBlockData["borderStyle"] { return this.getProperty("borderStyle"); }

    /**
     * Link
     *
     * No description available
     */
    public get buttonLink() : ButtonBlockData["buttonLink"] { return this.getProperty("buttonLink"); }

    /**
     * Button background color
     *
     * No description available
     */
    public get buttonBackgroundColor() : ButtonBlockData["buttonBackgroundColor"] { return this.getProperty("buttonBackgroundColor"); }

    /**
     * Border width (px)
     *
     * No description available
     */
    public get borderWidth() : ButtonBlockData["borderWidth"] { return this.getProperty("borderWidth"); }

    /**
     * Style
     *
     * No description available
     */
    public get buttonStyle() : ButtonBlockData["buttonStyle"] { return this.getProperty("buttonStyle"); }

    /**
     * Button Border color
     *
     * No description available
     */
    public get buttonBorderColor() : ButtonBlockData["buttonBorderColor"] { return this.getProperty("buttonBorderColor"); }

    /**
     * Reassuring caption
     *
     * No description available
     */
    public get buttonCaption() : ButtonBlockData["buttonCaption"] { return this.getProperty("buttonCaption"); }

    /**
     * Button Text color
     *
     * No description available
     */
    public get buttonTextColor() : ButtonBlockData["buttonTextColor"] { return this.getProperty("buttonTextColor"); }

}
