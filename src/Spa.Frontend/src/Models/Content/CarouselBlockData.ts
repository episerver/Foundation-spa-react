import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'Episerver/Property'
import IContent from 'Episerver/Models/IContent'
import ContentLink from 'Episerver/Models/ContentLink'
import { ComponentProps } from 'Episerver/EpiComponent'

/**
 * Carousel Block
 *
 * Allows users to create a slider using a collection of Images or Hero blocks
 *
 * @GUID 980ead74-1d13-45d6-9c5c-16f900269ee6
 */
export default interface CarouselBlockData extends IContent {
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
     * Carousel items
     *
     * List of carousel items
     */
    carouselItems: ContentAreaProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface CarouselBlockProps extends ComponentProps<CarouselBlockData> {}
