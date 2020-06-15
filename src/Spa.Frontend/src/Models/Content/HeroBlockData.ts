import HeroBlockCalloutData from './HeroBlockCalloutData'
import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from '@episerver/spa-core/Property'
import IContent, { BaseIContent } from '@episerver/spa-core/Models/IContent'
import ContentLink from '@episerver/spa-core/Models/ContentLink'
import { ComponentProps } from '@episerver/spa-core/EpiComponent'

/**
 * Hero Block
 *
 * Image block with overlay for text
 *
 * @GUID 8bdfac81-3dbd-43b9-a092-522bd67ee8b3
 */
export default interface HeroBlockData extends IContent {
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
     * Block ratio (width-height)
     *
     * No description available
     */
    blockRatio: StringProperty

    /**
     * Image
     *
     * No description available
     */
    backgroundImage: ContentReferenceProperty

    /**
     * Video
     *
     * No description available
     */
    mainBackgroundVideo: ContentReferenceProperty

    /**
     * Link
     *
     * No description available
     */
    link: StringProperty

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
export interface HeroBlockProps extends ComponentProps<HeroBlockData> {}

export class HeroBlockType extends BaseIContent<HeroBlockData> implements HeroBlockData {
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
     * Block ratio (width-height)
     *
     * No description available
     */
    public blockRatio: StringProperty;

    /**
     * Image
     *
     * No description available
     */
    public backgroundImage: ContentReferenceProperty;

    /**
     * Video
     *
     * No description available
     */
    public mainBackgroundVideo: ContentReferenceProperty;

    /**
     * Link
     *
     * No description available
     */
    public link: StringProperty;

    /**
     * Callout
     *
     * No description available
     */
    public callout: HeroBlockCalloutData;

}
