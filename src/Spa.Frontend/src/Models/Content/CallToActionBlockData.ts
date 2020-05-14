import ButtonBlockData from './ButtonBlockData'
import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'Episerver/Property'
import IContent, { BaseIContent } from 'Episerver/Models/IContent'
import ContentLink from 'Episerver/Models/ContentLink'
import { ComponentProps } from 'Episerver/EpiComponent'

/**
 * Call To Action Block
 *
 * Provides a CTA anchor or link
 *
 * @GUID f82da800-c923-48f6-b701-fd093078c5d9
 */
export default interface CallToActionBlockData extends IContent {
    /**
     * Categories
     *
     * Categories associated with this content
     */
    categories: Property<Array<ContentLink>>

    /**
     * Padding
     *
     * No description available
     */
    padding: StringProperty

    /**
     * Margin
     *
     * No description available
     */
    margin: StringProperty

    /**
     * Background color
     *
     * No description available
     */
    backgroundColor: StringProperty

    /**
     * Block opacity (0 to 1)
     *
     * No description available
     */
    blockOpacity: NumberProperty

    /**
     * Title
     *
     * Title displayed
     */
    title: StringProperty

    /**
     * Subtext
     *
     * No description available
     */
    subtext: StringProperty

    /**
     * Text color
     *
     * No description available
     */
    textColor: StringProperty

    /**
     * Background image
     *
     * No description available
     */
    backgroundImage: ContentReferenceProperty

    /**
     * Choose image style to fit the block
     *
     * No description available
     */
    backgroundImageSetting: StringProperty

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
export interface CallToActionBlockProps extends ComponentProps<CallToActionBlockData> {}

export class CallToActionBlockType extends BaseIContent<CallToActionBlockData> implements CallToActionBlockData {
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
    public categories: Property<Array<ContentLink>>;

    /**
     * Padding
     *
     * No description available
     */
    public padding: StringProperty;

    /**
     * Margin
     *
     * No description available
     */
    public margin: StringProperty;

    /**
     * Background color
     *
     * No description available
     */
    public backgroundColor: StringProperty;

    /**
     * Block opacity (0 to 1)
     *
     * No description available
     */
    public blockOpacity: NumberProperty;

    /**
     * Title
     *
     * Title displayed
     */
    public title: StringProperty;

    /**
     * Subtext
     *
     * No description available
     */
    public subtext: StringProperty;

    /**
     * Text color
     *
     * No description available
     */
    public textColor: StringProperty;

    /**
     * Background image
     *
     * No description available
     */
    public backgroundImage: ContentReferenceProperty;

    /**
     * Choose image style to fit the block
     *
     * No description available
     */
    public backgroundImageSetting: StringProperty;

    /**
     * Button
     *
     * No description available
     */
    public button: ButtonBlockData;

}
