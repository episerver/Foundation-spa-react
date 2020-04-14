import HeroBlockCalloutData from './HeroBlockCalloutData'
import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'Episerver/Property'
import IContent from 'Episerver/Models/IContent'
import ContentLink from 'Episerver/Models/ContentLink'
import { ComponentProps } from 'Episerver/EpiComponent'

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
