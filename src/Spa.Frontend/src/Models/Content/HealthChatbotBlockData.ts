import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * Health chatbot
 *
 * Used to insert a health chat bot
 *
 * @GUID 18a7b10e-451c-4223-bad0-36bd224e3927
 */
export default interface HealthChatbotBlockData extends Taxonomy.IContent {
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
     * Text above bot
     *
     * Text that appears above the chat bot
     */
    headerText: ContentDelivery.StringProperty

    /**
     * Direct Line Token
     *
     * The token that is used to connect to the bot framework. Get this from > Health Bot Service > Integration > Channels > DirectLine
     */
    directLineToken: ContentDelivery.StringProperty

    /**
     * Height (in pixels)
     *
     * The height of the bot in pixels as shown on screen
     */
    heightInPixels: ContentDelivery.NumberProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface HealthChatbotBlockProps extends ComponentTypes.AbstractComponentProps<HealthChatbotBlockData> {}

export class HealthChatbotBlockType extends Taxonomy.AbstractIContent<HealthChatbotBlockData> implements HealthChatbotBlockData {
    protected _typeName : string = "HealthChatbotBlock";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'categories': 'ContentReferenceList',
        'padding': 'LongString',
        'margin': 'LongString',
        'backgroundColor': 'LongString',
        'blockOpacity': 'FloatNumber',
        'headerText': 'XhtmlString',
        'directLineToken': 'LongString',
        'heightInPixels': 'Number',
    }

    /**
     * Categories
     *
     * Categories associated with this content
     */
    public get categories() : HealthChatbotBlockData["categories"] { return this.getProperty("categories"); }

    /**
     * Padding
     *
     * No description available
     */
    public get padding() : HealthChatbotBlockData["padding"] { return this.getProperty("padding"); }

    /**
     * Margin
     *
     * No description available
     */
    public get margin() : HealthChatbotBlockData["margin"] { return this.getProperty("margin"); }

    /**
     * Background color
     *
     * No description available
     */
    public get backgroundColor() : HealthChatbotBlockData["backgroundColor"] { return this.getProperty("backgroundColor"); }

    /**
     * Block opacity (0 to 1)
     *
     * No description available
     */
    public get blockOpacity() : HealthChatbotBlockData["blockOpacity"] { return this.getProperty("blockOpacity"); }

    /**
     * Text above bot
     *
     * Text that appears above the chat bot
     */
    public get headerText() : HealthChatbotBlockData["headerText"] { return this.getProperty("headerText"); }

    /**
     * Direct Line Token
     *
     * The token that is used to connect to the bot framework. Get this from > Health Bot Service > Integration > Channels > DirectLine
     */
    public get directLineToken() : HealthChatbotBlockData["directLineToken"] { return this.getProperty("directLineToken"); }

    /**
     * Height (in pixels)
     *
     * The height of the bot in pixels as shown on screen
     */
    public get heightInPixels() : HealthChatbotBlockData["heightInPixels"] { return this.getProperty("heightInPixels"); }

}
