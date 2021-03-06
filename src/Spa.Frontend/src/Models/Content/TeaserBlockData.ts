import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * Teaser Block
 *
 * Image block with overlay for text
 *
 * @GUID eb67a99a-e239-41b8-9c59-20eaa5936047
 */
export default interface TeaserBlockData extends Taxonomy.IContent {
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
     * Heading text
     *
     * No description available
     */
    heading: ContentDelivery.StringProperty

    /**
     * Heading size
     *
     * No description available
     */
    headingSize: ContentDelivery.NumberProperty

    /**
     * Heading style
     *
     * No description available
     */
    headingStyle: ContentDelivery.StringProperty

    /**
     * Heading color
     *
     * No description available
     */
    headingColor: ContentDelivery.StringProperty

    /**
     * Description
     *
     * No description available
     */
    description: ContentDelivery.StringProperty

    /**
     * Link
     *
     * No description available
     */
    link: ContentDelivery.ContentReferenceProperty

    /**
     * Text
     *
     * No description available
     */
    text: ContentDelivery.StringProperty

    /**
     * Image
     *
     * No description available
     */
    image: ContentDelivery.ContentReferenceProperty

    /**
     * Image size (%)
     *
     * No description available
     */
    imageSize: ContentDelivery.NumberProperty

    /**
     * Second Image
     *
     * No description available
     */
    secondImage: ContentDelivery.ContentReferenceProperty

    /**
     * Image size (%)
     *
     * No description available
     */
    secondImageSize: ContentDelivery.NumberProperty

    /**
     * Text color
     *
     * No description available
     */
    textColor: ContentDelivery.StringProperty

    /**
     * Height
     *
     * No description available
     */
    height: ContentDelivery.StringProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface TeaserBlockProps extends ComponentTypes.AbstractComponentProps<TeaserBlockData> {}

export class TeaserBlockType extends Taxonomy.AbstractIContent<TeaserBlockData> implements TeaserBlockData {
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
        'headingColor': 'LongString',
        'description': 'LongString',
        'link': 'PageReference',
        'text': 'XhtmlString',
        'image': 'ContentReference',
        'imageSize': 'Number',
        'secondImage': 'ContentReference',
        'secondImageSize': 'Number',
        'textColor': 'LongString',
        'height': 'LongString',
    }

    /**
     * Categories
     *
     * Categories associated with this content
     */
    public get categories() : TeaserBlockData["categories"] { return this.getProperty("categories"); }

    /**
     * Padding
     *
     * No description available
     */
    public get padding() : TeaserBlockData["padding"] { return this.getProperty("padding"); }

    /**
     * Margin
     *
     * No description available
     */
    public get margin() : TeaserBlockData["margin"] { return this.getProperty("margin"); }

    /**
     * Background color
     *
     * No description available
     */
    public get backgroundColor() : TeaserBlockData["backgroundColor"] { return this.getProperty("backgroundColor"); }

    /**
     * Block opacity (0 to 1)
     *
     * No description available
     */
    public get blockOpacity() : TeaserBlockData["blockOpacity"] { return this.getProperty("blockOpacity"); }

    /**
     * Heading text
     *
     * No description available
     */
    public get heading() : TeaserBlockData["heading"] { return this.getProperty("heading"); }

    /**
     * Heading size
     *
     * No description available
     */
    public get headingSize() : TeaserBlockData["headingSize"] { return this.getProperty("headingSize"); }

    /**
     * Heading style
     *
     * No description available
     */
    public get headingStyle() : TeaserBlockData["headingStyle"] { return this.getProperty("headingStyle"); }

    /**
     * Heading color
     *
     * No description available
     */
    public get headingColor() : TeaserBlockData["headingColor"] { return this.getProperty("headingColor"); }

    /**
     * Description
     *
     * No description available
     */
    public get description() : TeaserBlockData["description"] { return this.getProperty("description"); }

    /**
     * Link
     *
     * No description available
     */
    public get link() : TeaserBlockData["link"] { return this.getProperty("link"); }

    /**
     * Text
     *
     * No description available
     */
    public get text() : TeaserBlockData["text"] { return this.getProperty("text"); }

    /**
     * Image
     *
     * No description available
     */
    public get image() : TeaserBlockData["image"] { return this.getProperty("image"); }

    /**
     * Image size (%)
     *
     * No description available
     */
    public get imageSize() : TeaserBlockData["imageSize"] { return this.getProperty("imageSize"); }

    /**
     * Second Image
     *
     * No description available
     */
    public get secondImage() : TeaserBlockData["secondImage"] { return this.getProperty("secondImage"); }

    /**
     * Image size (%)
     *
     * No description available
     */
    public get secondImageSize() : TeaserBlockData["secondImageSize"] { return this.getProperty("secondImageSize"); }

    /**
     * Text color
     *
     * No description available
     */
    public get textColor() : TeaserBlockData["textColor"] { return this.getProperty("textColor"); }

    /**
     * Height
     *
     * No description available
     */
    public get height() : TeaserBlockData["height"] { return this.getProperty("height"); }

}
