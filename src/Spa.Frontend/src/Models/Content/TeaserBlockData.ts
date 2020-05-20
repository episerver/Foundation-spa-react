import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'episerver/Property'
import IContent, { BaseIContent } from 'episerver/Models/IContent'
import ContentLink from 'episerver/Models/ContentLink'
import { ComponentProps } from 'episerver/EpiComponent'

/**
 * Teaser Block
 *
 * Image block with overlay for text
 *
 * @GUID eb67a99a-e239-41b8-9c59-20eaa5936047
 */
export default interface TeaserBlockData extends IContent {
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
     * Heading
     *
     * No description available
     */
    heading: StringProperty

    /**
     * Heading size
     *
     * No description available
     */
    headingSize: NumberProperty

    /**
     * Heading style
     *
     * No description available
     */
    headingStyle: StringProperty

    /**
     * Description
     *
     * No description available
     */
    description: StringProperty

    /**
     * Text
     *
     * No description available
     */
    text: StringProperty

    /**
     * Image
     *
     * No description available
     */
    image: ContentReferenceProperty

    /**
     * SecondImage
     *
     * No description available
     */
    secondImage: ContentReferenceProperty

    /**
     * Image size (%)
     *
     * No description available
     */
    imageSize: NumberProperty

    /**
     * Second Image size (%)
     *
     * No description available
     */
    secondImageSize: NumberProperty

    /**
     * Text color
     *
     * No description available
     */
    textColor: StringProperty

    /**
     * Heading color
     *
     * No description available
     */
    headingColor: StringProperty

    /**
     * Elements order
     *
     * No description available
     */
    elementsOrder: StringProperty

    /**
     * Elements alignment (except Text)
     *
     * No description available
     */
    elementsAlignment: StringProperty

    /**
     * Link
     *
     * No description available
     */
    link: ContentReferenceProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface TeaserBlockProps extends ComponentProps<TeaserBlockData> {}

export class TeaserBlockType extends BaseIContent<TeaserBlockData> implements TeaserBlockData {
    protected _typeName : string = "TeaserBlock";
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
        'headingSize': 'Number',
        'headingStyle': 'LongString',
        'description': 'LongString',
        'text': 'XhtmlString',
        'image': 'ContentReference',
        'secondImage': 'ContentReference',
        'imageSize': 'Number',
        'secondImageSize': 'Number',
        'textColor': 'LongString',
        'headingColor': 'LongString',
        'elementsOrder': 'LongString',
        'elementsAlignment': 'LongString',
        'link': 'PageReference',
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
     * Heading
     *
     * No description available
     */
    public heading: StringProperty;

    /**
     * Heading size
     *
     * No description available
     */
    public headingSize: NumberProperty;

    /**
     * Heading style
     *
     * No description available
     */
    public headingStyle: StringProperty;

    /**
     * Description
     *
     * No description available
     */
    public description: StringProperty;

    /**
     * Text
     *
     * No description available
     */
    public text: StringProperty;

    /**
     * Image
     *
     * No description available
     */
    public image: ContentReferenceProperty;

    /**
     * SecondImage
     *
     * No description available
     */
    public secondImage: ContentReferenceProperty;

    /**
     * Image size (%)
     *
     * No description available
     */
    public imageSize: NumberProperty;

    /**
     * Second Image size (%)
     *
     * No description available
     */
    public secondImageSize: NumberProperty;

    /**
     * Text color
     *
     * No description available
     */
    public textColor: StringProperty;

    /**
     * Heading color
     *
     * No description available
     */
    public headingColor: StringProperty;

    /**
     * Elements order
     *
     * No description available
     */
    public elementsOrder: StringProperty;

    /**
     * Elements alignment (except Text)
     *
     * No description available
     */
    public elementsAlignment: StringProperty;

    /**
     * Link
     *
     * No description available
     */
    public link: ContentReferenceProperty;

}
