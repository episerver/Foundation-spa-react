import ButtonBlockData from './ButtonBlockData'
import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * Call To Action Block
 *
 * Provides a CTA anchor or link
 *
 * @GUID f82da800-c923-48f6-b701-fd093078c5d9
 */
export default interface CallToActionBlockData extends Taxonomy.IContent {
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
     * Title
     *
     * Title displayed
     */
    title: ContentDelivery.StringProperty

    /**
     * Subtext
     *
     * No description available
     */
    subtext: ContentDelivery.StringProperty

    /**
     * Text color
     *
     * No description available
     */
    textColor: ContentDelivery.StringProperty

    /**
     * Background image
     *
     * No description available
     */
    backgroundImage: ContentDelivery.ContentReferenceProperty

    /**
     * Choose image style to fit the block
     *
     * No description available
     */
    backgroundImageSetting: ContentDelivery.StringProperty

    /**
     * Button
     *
     * No description available
     */
    button: ButtonBlockData

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface CallToActionBlockProps extends ComponentTypes.AbstractComponentProps<CallToActionBlockData> {}

export class CallToActionBlockType extends Taxonomy.AbstractIContent<CallToActionBlockData> implements CallToActionBlockData {
    protected _typeName : string = "CallToActionBlock";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'categories': 'ContentReferenceList',
        'padding': 'LongString',
        'margin': 'LongString',
        'backgroundColor': 'LongString',
        'blockOpacity': 'FloatNumber',
        'title': 'LongString',
        'subtext': 'XhtmlString',
        'textColor': 'LongString',
        'backgroundImage': 'ContentReference',
        'backgroundImageSetting': 'LongString',
        'button': 'ButtonBlock',
    }

    /**
     * Categories
     *
     * Categories associated with this content
     */
    public get categories() : CallToActionBlockData["categories"] { return this.getProperty("categories"); }

    /**
     * Padding
     *
     * No description available
     */
    public get padding() : CallToActionBlockData["padding"] { return this.getProperty("padding"); }

    /**
     * Margin
     *
     * No description available
     */
    public get margin() : CallToActionBlockData["margin"] { return this.getProperty("margin"); }

    /**
     * Background color
     *
     * No description available
     */
    public get backgroundColor() : CallToActionBlockData["backgroundColor"] { return this.getProperty("backgroundColor"); }

    /**
     * Block opacity (0 to 1)
     *
     * No description available
     */
    public get blockOpacity() : CallToActionBlockData["blockOpacity"] { return this.getProperty("blockOpacity"); }

    /**
     * Title
     *
     * Title displayed
     */
    public get title() : CallToActionBlockData["title"] { return this.getProperty("title"); }

    /**
     * Subtext
     *
     * No description available
     */
    public get subtext() : CallToActionBlockData["subtext"] { return this.getProperty("subtext"); }

    /**
     * Text color
     *
     * No description available
     */
    public get textColor() : CallToActionBlockData["textColor"] { return this.getProperty("textColor"); }

    /**
     * Background image
     *
     * No description available
     */
    public get backgroundImage() : CallToActionBlockData["backgroundImage"] { return this.getProperty("backgroundImage"); }

    /**
     * Choose image style to fit the block
     *
     * No description available
     */
    public get backgroundImageSetting() : CallToActionBlockData["backgroundImageSetting"] { return this.getProperty("backgroundImageSetting"); }

    /**
     * Button
     *
     * No description available
     */
    public get button() : CallToActionBlockData["button"] { return this.getProperty("button"); }

}
