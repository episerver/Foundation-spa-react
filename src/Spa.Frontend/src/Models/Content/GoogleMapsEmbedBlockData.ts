import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'Episerver/Property'
import IContent from 'Episerver/Models/IContent'
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
