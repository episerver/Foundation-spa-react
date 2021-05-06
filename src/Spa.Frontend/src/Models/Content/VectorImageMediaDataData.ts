import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * Vector Image File
 *
 * Used for svg image file type
 *
 * @GUID 3bedeaa0-67ba-4f6a-a420-dabf6ad6890b
 */
export default interface VectorImageMediaDataData extends Taxonomy.IContent {
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
export interface VectorImageMediaDataProps extends ComponentTypes.AbstractComponentProps<VectorImageMediaDataData> {}

export class VectorImageMediaDataType extends Taxonomy.AbstractIContent<VectorImageMediaDataData> implements VectorImageMediaDataData {
    protected _typeName : string = "VectorImageMediaData";
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
    public get largeThumbnail() : VectorImageMediaDataData["largeThumbnail"] { return this.getProperty("largeThumbnail"); }

    /**
     * Image alignment
     *
     * No description available
     */
    public get imageAlignment() : VectorImageMediaDataData["imageAlignment"] { return this.getProperty("imageAlignment"); }

    /**
     * File size
     *
     * No description available
     */
    public get fileSize() : VectorImageMediaDataData["fileSize"] { return this.getProperty("fileSize"); }

    /**
     * Padding top
     *
     * No description available
     */
    public get paddingTop() : VectorImageMediaDataData["paddingTop"] { return this.getProperty("paddingTop"); }

    /**
     * Padding right
     *
     * No description available
     */
    public get paddingRight() : VectorImageMediaDataData["paddingRight"] { return this.getProperty("paddingRight"); }

    /**
     * Padding bottom
     *
     * No description available
     */
    public get paddingBottom() : VectorImageMediaDataData["paddingBottom"] { return this.getProperty("paddingBottom"); }

    /**
     * Padding left
     *
     * No description available
     */
    public get paddingLeft() : VectorImageMediaDataData["paddingLeft"] { return this.getProperty("paddingLeft"); }

    /**
     * Accent color
     *
     * No description available
     */
    public get accentColor() : VectorImageMediaDataData["accentColor"] { return this.getProperty("accentColor"); }

    /**
     * Caption
     *
     * No description available
     */
    public get caption() : VectorImageMediaDataData["caption"] { return this.getProperty("caption"); }

    /**
     * Clip art type
     *
     * No description available
     */
    public get clipArtType() : VectorImageMediaDataData["clipArtType"] { return this.getProperty("clipArtType"); }

    /**
     * Dominant color background
     *
     * No description available
     */
    public get dominantColorBackground() : VectorImageMediaDataData["dominantColorBackground"] { return this.getProperty("dominantColorBackground"); }

    /**
     * Dominant color foreground
     *
     * No description available
     */
    public get dominantColorForeground() : VectorImageMediaDataData["dominantColorForeground"] { return this.getProperty("dominantColorForeground"); }

    /**
     * Dominant colors
     *
     * No description available
     */
    public get dominantColors() : VectorImageMediaDataData["dominantColors"] { return this.getProperty("dominantColors"); }

    /**
     * Image categories
     *
     * No description available
     */
    public get imageCategories() : VectorImageMediaDataData["imageCategories"] { return this.getProperty("imageCategories"); }

    /**
     * Is adult content
     *
     * No description available
     */
    public get isAdultContent() : VectorImageMediaDataData["isAdultContent"] { return this.getProperty("isAdultContent"); }

    /**
     * Is black & white image
     *
     * No description available
     */
    public get isBwImg() : VectorImageMediaDataData["isBwImg"] { return this.getProperty("isBwImg"); }

    /**
     * Is racy content
     *
     * No description available
     */
    public get isRacyContent() : VectorImageMediaDataData["isRacyContent"] { return this.getProperty("isRacyContent"); }

    /**
     * Line drawing type
     *
     * No description available
     */
    public get lineDrawingType() : VectorImageMediaDataData["lineDrawingType"] { return this.getProperty("lineDrawingType"); }

    /**
     * Tags
     *
     * No description available
     */
    public get tags() : VectorImageMediaDataData["tags"] { return this.getProperty("tags"); }

    /**
     * Title
     *
     * No description available
     */
    public get title() : VectorImageMediaDataData["title"] { return this.getProperty("title"); }

    /**
     * Description
     *
     * Description of the image
     */
    public get description() : VectorImageMediaDataData["description"] { return this.getProperty("description"); }

    /**
     * Alternate text
     *
     * No description available
     */
    public get altText() : VectorImageMediaDataData["altText"] { return this.getProperty("altText"); }

    /**
     * Credits text
     *
     * No description available
     */
    public get creditsText() : VectorImageMediaDataData["creditsText"] { return this.getProperty("creditsText"); }

    /**
     * Credits link
     *
     * No description available
     */
    public get creditsLink() : VectorImageMediaDataData["creditsLink"] { return this.getProperty("creditsLink"); }

    /**
     * Link
     *
     * Link to content
     */
    public get link() : VectorImageMediaDataData["link"] { return this.getProperty("link"); }

    /**
     * Copyright
     *
     * No description available
     */
    public get copyright() : VectorImageMediaDataData["copyright"] { return this.getProperty("copyright"); }

}
