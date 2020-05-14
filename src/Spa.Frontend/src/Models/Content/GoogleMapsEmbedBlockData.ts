import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'Episerver/Property'
import IContent, { BaseIContent } from 'Episerver/Models/IContent'
import ContentLink from 'Episerver/Models/ContentLink'
import { ComponentProps } from 'Episerver/EpiComponent'

/**
 * Google Maps Embed Block
 *
 * Display Google Maps Embed
 *
 * @GUID 8fc31051-6d22-4445-b92d-7c394267fa49
 */
export default interface GoogleMapsEmbedBlockData extends IContent {
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
     * API Key
     *
     * No description available
     */
    apiKey: StringProperty

    /**
     * Search term
     *
     * No description available
     */
    searchTerm: StringProperty

    /**
     * Height
     *
     * No description available
     */
    height: NumberProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface GoogleMapsEmbedBlockProps extends ComponentProps<GoogleMapsEmbedBlockData> {}

export class GoogleMapsEmbedBlockType extends BaseIContent<GoogleMapsEmbedBlockData> implements GoogleMapsEmbedBlockData {
    protected _typeName : string = "GoogleMapsEmbedBlock";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'categories': 'ContentReferenceList',
        'padding': 'LongString',
        'margin': 'LongString',
        'backgroundColor': 'LongString',
        'blockOpacity': 'FloatNumber',
        'apiKey': 'LongString',
        'searchTerm': 'LongString',
        'height': 'FloatNumber',
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
     * API Key
     *
     * No description available
     */
    public apiKey: StringProperty;

    /**
     * Search term
     *
     * No description available
     */
    public searchTerm: StringProperty;

    /**
     * Height
     *
     * No description available
     */
    public height: NumberProperty;

}
