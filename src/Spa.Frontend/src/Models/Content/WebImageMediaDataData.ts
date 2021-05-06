import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * Webp Image File
 *
 * Used for webp image file type
 *
 * @GUID 46652356-ef68-4ef2-b57e-293aa4f87be8
 */
export default interface WebImageMediaDataData extends Taxonomy.IContent {
    /**
     * Large thumbnail
     *
     * No description available
     */
    largeThumbnail: ContentDelivery.Property<any> // Original type: Blob

    /**
     * Image alignment
     *
     * No description available
     */
    imageAlignment: ContentDelivery.StringProperty

    /**
     * File size
     *
     * No description available
     */
    fileSize: ContentDelivery.StringProperty

    /**
     * Padding top
     *
     * No description available
     */
    paddingTop: ContentDelivery.NumberProperty

    /**
     * Padding right
     *
     * No description available
     */
    paddingRight: ContentDelivery.NumberProperty

    /**
     * Padding bottom
     *
     * No description available
     */
    paddingBottom: ContentDelivery.NumberProperty

    /**
     * Padding left
     *
     * No description available
     */
    paddingLeft: ContentDelivery.NumberProperty

    /**
     * Accent color
     *
     * No description available
     */
    accentColor: ContentDelivery.StringProperty

    /**
     * Caption
     *
     * No description available
     */
    caption: ContentDelivery.StringProperty

    /**
     * Clip art type
     *
     * No description available
     */
    clipArtType: ContentDelivery.StringProperty

    /**
     * Dominant color background
     *
     * No description available
     */
    dominantColorBackground: ContentDelivery.StringProperty

    /**
     * Dominant color foreground
     *
     * No description available
     */
    dominantColorForeground: ContentDelivery.StringProperty

    /**
     * Dominant colors
     *
     * No description available
     */
    dominantColors: ContentDelivery.Property<any> // Original type: StringList

    /**
     * Image categories
     *
     * No description available
     */
    imageCategories: ContentDelivery.Property<any> // Original type: StringList

    /**
     * Is adult content
     *
     * No description available
     */
    isAdultContent: ContentDelivery.BooleanProperty

    /**
     * Is black & white image
     *
     * No description available
     */
    isBwImg: ContentDelivery.BooleanProperty

    /**
     * Is racy content
     *
     * No description available
     */
    isRacyContent: ContentDelivery.BooleanProperty

    /**
     * Line drawing type
     *
     * No description available
     */
    lineDrawingType: ContentDelivery.StringProperty

    /**
     * Tags
     *
     * No description available
     */
    tags: ContentDelivery.Property<any> // Original type: StringList

    /**
     * Title
     *
     * No description available
     */
    title: ContentDelivery.StringProperty

    /**
     * Description
     *
     * Description of the image
     */
    description: ContentDelivery.StringProperty

    /**
     * Alternate text
     *
     * No description available
     */
    altText: ContentDelivery.StringProperty

    /**
     * Credits text
     *
     * No description available
     */
    creditsText: ContentDelivery.StringProperty

    /**
     * Credits link
     *
     * No description available
     */
    creditsLink: ContentDelivery.StringProperty

    /**
     * Link
     *
     * Link to content
     */
    link: ContentDelivery.ContentReferenceProperty

    /**
     * Copyright
     *
     * No description available
     */
    copyright: ContentDelivery.StringProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface WebImageMediaDataProps extends ComponentTypes.AbstractComponentProps<WebImageMediaDataData> {}

export class WebImageMediaDataType extends Taxonomy.AbstractIContent<WebImageMediaDataData> implements WebImageMediaDataData {
    protected _typeName : string = "WebImageMediaData";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'largeThumbnail': 'Blob',
        'imageAlignment': 'LongString',
        'fileSize': 'LongString',
        'paddingTop': 'Number',
        'paddingRight': 'Number',
        'paddingBottom': 'Number',
        'paddingLeft': 'Number',
        'accentColor': 'LongString',
        'caption': 'LongString',
        'clipArtType': 'LongString',
        'dominantColorBackground': 'LongString',
        'dominantColorForeground': 'LongString',
        'dominantColors': 'StringList',
        'imageCategories': 'StringList',
        'isAdultContent': 'Boolean',
        'isBwImg': 'Boolean',
        'isRacyContent': 'Boolean',
        'lineDrawingType': 'LongString',
        'tags': 'StringList',
        'title': 'LongString',
        'description': 'LongString',
        'altText': 'LongString',
        'creditsText': 'LongString',
        'creditsLink': 'Url',
        'link': 'ContentReference',
        'copyright': 'LongString',
    }

    /**
     * Large thumbnail
     *
     * No description available
     */
    public get largeThumbnail() : WebImageMediaDataData["largeThumbnail"] { return this.getProperty("largeThumbnail"); }

    /**
     * Image alignment
     *
     * No description available
     */
    public get imageAlignment() : WebImageMediaDataData["imageAlignment"] { return this.getProperty("imageAlignment"); }

    /**
     * File size
     *
     * No description available
     */
    public get fileSize() : WebImageMediaDataData["fileSize"] { return this.getProperty("fileSize"); }

    /**
     * Padding top
     *
     * No description available
     */
    public get paddingTop() : WebImageMediaDataData["paddingTop"] { return this.getProperty("paddingTop"); }

    /**
     * Padding right
     *
     * No description available
     */
    public get paddingRight() : WebImageMediaDataData["paddingRight"] { return this.getProperty("paddingRight"); }

    /**
     * Padding bottom
     *
     * No description available
     */
    public get paddingBottom() : WebImageMediaDataData["paddingBottom"] { return this.getProperty("paddingBottom"); }

    /**
     * Padding left
     *
     * No description available
     */
    public get paddingLeft() : WebImageMediaDataData["paddingLeft"] { return this.getProperty("paddingLeft"); }

    /**
     * Accent color
     *
     * No description available
     */
    public get accentColor() : WebImageMediaDataData["accentColor"] { return this.getProperty("accentColor"); }

    /**
     * Caption
     *
     * No description available
     */
    public get caption() : WebImageMediaDataData["caption"] { return this.getProperty("caption"); }

    /**
     * Clip art type
     *
     * No description available
     */
    public get clipArtType() : WebImageMediaDataData["clipArtType"] { return this.getProperty("clipArtType"); }

    /**
     * Dominant color background
     *
     * No description available
     */
    public get dominantColorBackground() : WebImageMediaDataData["dominantColorBackground"] { return this.getProperty("dominantColorBackground"); }

    /**
     * Dominant color foreground
     *
     * No description available
     */
    public get dominantColorForeground() : WebImageMediaDataData["dominantColorForeground"] { return this.getProperty("dominantColorForeground"); }

    /**
     * Dominant colors
     *
     * No description available
     */
    public get dominantColors() : WebImageMediaDataData["dominantColors"] { return this.getProperty("dominantColors"); }

    /**
     * Image categories
     *
     * No description available
     */
    public get imageCategories() : WebImageMediaDataData["imageCategories"] { return this.getProperty("imageCategories"); }

    /**
     * Is adult content
     *
     * No description available
     */
    public get isAdultContent() : WebImageMediaDataData["isAdultContent"] { return this.getProperty("isAdultContent"); }

    /**
     * Is black & white image
     *
     * No description available
     */
    public get isBwImg() : WebImageMediaDataData["isBwImg"] { return this.getProperty("isBwImg"); }

    /**
     * Is racy content
     *
     * No description available
     */
    public get isRacyContent() : WebImageMediaDataData["isRacyContent"] { return this.getProperty("isRacyContent"); }

    /**
     * Line drawing type
     *
     * No description available
     */
    public get lineDrawingType() : WebImageMediaDataData["lineDrawingType"] { return this.getProperty("lineDrawingType"); }

    /**
     * Tags
     *
     * No description available
     */
    public get tags() : WebImageMediaDataData["tags"] { return this.getProperty("tags"); }

    /**
     * Title
     *
     * No description available
     */
    public get title() : WebImageMediaDataData["title"] { return this.getProperty("title"); }

    /**
     * Description
     *
     * Description of the image
     */
    public get description() : WebImageMediaDataData["description"] { return this.getProperty("description"); }

    /**
     * Alternate text
     *
     * No description available
     */
    public get altText() : WebImageMediaDataData["altText"] { return this.getProperty("altText"); }

    /**
     * Credits text
     *
     * No description available
     */
    public get creditsText() : WebImageMediaDataData["creditsText"] { return this.getProperty("creditsText"); }

    /**
     * Credits link
     *
     * No description available
     */
    public get creditsLink() : WebImageMediaDataData["creditsLink"] { return this.getProperty("creditsLink"); }

    /**
     * Link
     *
     * Link to content
     */
    public get link() : WebImageMediaDataData["link"] { return this.getProperty("link"); }

    /**
     * Copyright
     *
     * No description available
     */
    public get copyright() : WebImageMediaDataData["copyright"] { return this.getProperty("copyright"); }

}
