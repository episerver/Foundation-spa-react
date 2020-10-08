import HeroBlockCalloutData from './HeroBlockCalloutData'
import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * Hero Block
 *
 * Image block with overlay for text
 *
 * @GUID 8bdfac81-3dbd-43b9-a092-522bd67ee8b3
 */
export default interface HeroBlockData extends Taxonomy.IContent {
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
     * Block ratio (width-height)
     *
     * No description available
     */
    blockRatio: ContentDelivery.StringProperty

    /**
     * Image
     *
     * No description available
     */
    backgroundImage: ContentDelivery.ContentReferenceProperty

    /**
     * Video
     *
     * No description available
     */
    mainBackgroundVideo: ContentDelivery.ContentReferenceProperty

    /**
     * Link
     *
     * No description available
     */
    link: ContentDelivery.StringProperty

    /**
     * Callout
     *
     * No description available
     */
    callout: HeroBlockCalloutData

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface HeroBlockProps extends ComponentTypes.AbstractComponentProps<HeroBlockData> {}

export class HeroBlockType extends Taxonomy.AbstractIContent<HeroBlockData> implements HeroBlockData {
    protected _typeName : string = "HeroBlock";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'categories': 'ContentReferenceList',
        'padding': 'LongString',
        'margin': 'LongString',
        'backgroundColor': 'LongString',
        'blockOpacity': 'FloatNumber',
        'blockRatio': 'LongString',
        'backgroundImage': 'ContentReference',
        'mainBackgroundVideo': 'ContentReference',
        'link': 'Url',
        'callout': 'HeroBlockCallout',
    }

    /**
     * Categories
     *
     * Categories associated with this content
     */
    public get categories() : HeroBlockData["categories"] { return this.getProperty("categories"); }

    /**
     * Padding
     *
     * No description available
     */
    public get padding() : HeroBlockData["padding"] { return this.getProperty("padding"); }

    /**
     * Margin
     *
     * No description available
     */
    public get margin() : HeroBlockData["margin"] { return this.getProperty("margin"); }

    /**
     * Background color
     *
     * No description available
     */
    public get backgroundColor() : HeroBlockData["backgroundColor"] { return this.getProperty("backgroundColor"); }

    /**
     * Block opacity (0 to 1)
     *
     * No description available
     */
    public get blockOpacity() : HeroBlockData["blockOpacity"] { return this.getProperty("blockOpacity"); }

    /**
     * Block ratio (width-height)
     *
     * No description available
     */
    public get blockRatio() : HeroBlockData["blockRatio"] { return this.getProperty("blockRatio"); }

    /**
     * Image
     *
     * No description available
     */
    public get backgroundImage() : HeroBlockData["backgroundImage"] { return this.getProperty("backgroundImage"); }

    /**
     * Video
     *
     * No description available
     */
    public get mainBackgroundVideo() : HeroBlockData["mainBackgroundVideo"] { return this.getProperty("mainBackgroundVideo"); }

    /**
     * Link
     *
     * No description available
     */
    public get link() : HeroBlockData["link"] { return this.getProperty("link"); }

    /**
     * Callout
     *
     * No description available
     */
    public get callout() : HeroBlockData["callout"] { return this.getProperty("callout"); }

}
