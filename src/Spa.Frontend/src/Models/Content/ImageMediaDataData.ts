import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * ImageMediaData
 *
 * No Description available.
 *
 * @GUID 20644be7-3ca1-4f84-b893-ee021b73ce6c
 */
export default interface ImageMediaDataData extends Taxonomy.IContent {
    /**
     * Large thumbnail
     *
     * No description available
     */
    largeThumbnail: ContentDelivery.Property<any> // Original type: Blob

    /**
     * File size
     *
     * No description available
     */
    fileSize: ContentDelivery.StringProperty

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
export interface ImageMediaDataProps extends ComponentTypes.AbstractComponentProps<ImageMediaDataData> {}

export class ImageMediaDataType extends Taxonomy.AbstractIContent<ImageMediaDataData> implements ImageMediaDataData {
    protected _typeName : string = "ImageMediaData";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'largeThumbnail': 'Blob',
        'fileSize': 'LongString',
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
    public get largeThumbnail() : ImageMediaDataData["largeThumbnail"] { return this.getProperty("largeThumbnail"); }

    /**
     * File size
     *
     * No description available
     */
    public get fileSize() : ImageMediaDataData["fileSize"] { return this.getProperty("fileSize"); }

    /**
     * Accent color
     *
     * No description available
     */
    public get accentColor() : ImageMediaDataData["accentColor"] { return this.getProperty("accentColor"); }

    /**
     * Caption
     *
     * No description available
     */
    public get caption() : ImageMediaDataData["caption"] { return this.getProperty("caption"); }

    /**
     * Clip art type
     *
     * No description available
     */
    public get clipArtType() : ImageMediaDataData["clipArtType"] { return this.getProperty("clipArtType"); }

    /**
     * Dominant color background
     *
     * No description available
     */
    public get dominantColorBackground() : ImageMediaDataData["dominantColorBackground"] { return this.getProperty("dominantColorBackground"); }

    /**
     * Dominant color foreground
     *
     * No description available
     */
    public get dominantColorForeground() : ImageMediaDataData["dominantColorForeground"] { return this.getProperty("dominantColorForeground"); }

    /**
     * Dominant colors
     *
     * No description available
     */
    public get dominantColors() : ImageMediaDataData["dominantColors"] { return this.getProperty("dominantColors"); }

    /**
     * Image categories
     *
     * No description available
     */
    public get imageCategories() : ImageMediaDataData["imageCategories"] { return this.getProperty("imageCategories"); }

    /**
     * Is adult content
     *
     * No description available
     */
    public get isAdultContent() : ImageMediaDataData["isAdultContent"] { return this.getProperty("isAdultContent"); }

    /**
     * Is black & white image
     *
     * No description available
     */
    public get isBwImg() : ImageMediaDataData["isBwImg"] { return this.getProperty("isBwImg"); }

    /**
     * Is racy content
     *
     * No description available
     */
    public get isRacyContent() : ImageMediaDataData["isRacyContent"] { return this.getProperty("isRacyContent"); }

    /**
     * Line drawing type
     *
     * No description available
     */
    public get lineDrawingType() : ImageMediaDataData["lineDrawingType"] { return this.getProperty("lineDrawingType"); }

    /**
     * Tags
     *
     * No description available
     */
    public get tags() : ImageMediaDataData["tags"] { return this.getProperty("tags"); }

    /**
     * Title
     *
     * No description available
     */
    public get title() : ImageMediaDataData["title"] { return this.getProperty("title"); }

    /**
     * Description
     *
     * Description of the image
     */
    public get description() : ImageMediaDataData["description"] { return this.getProperty("description"); }

    /**
     * Alternate text
     *
     * No description available
     */
    public get altText() : ImageMediaDataData["altText"] { return this.getProperty("altText"); }

    /**
     * Credits text
     *
     * No description available
     */
    public get creditsText() : ImageMediaDataData["creditsText"] { return this.getProperty("creditsText"); }

    /**
     * Credits link
     *
     * No description available
     */
    public get creditsLink() : ImageMediaDataData["creditsLink"] { return this.getProperty("creditsLink"); }

    /**
     * Link
     *
     * Link to content
     */
    public get link() : ImageMediaDataData["link"] { return this.getProperty("link"); }

    /**
     * Copyright
     *
     * No description available
     */
    public get copyright() : ImageMediaDataData["copyright"] { return this.getProperty("copyright"); }

}
