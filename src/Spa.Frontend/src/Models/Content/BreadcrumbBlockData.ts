import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'Episerver/Property'
import IContent from 'Episerver/Models/IContent'
import ContentLink from 'Episerver/Models/ContentLink'
import { ComponentProps } from 'Episerver/EpiComponent'

/**
 * Breadcrumb Block
 *
 * Render normal navigation structures as a breadcrumb
 *
 * @GUID de43eb04-0d26-442a-91fc-e36e14a352b6
 */
export default interface BreadcrumbBlockData extends IContent {
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
     * Destination page
     *
     * No description available
     */
    destinationPage: ContentReferenceProperty

    /**
     * Breadcrumb separator
     *
     * No description available
     */
    separator: StringProperty

    /**
     * Alignment option
     *
     * No description available
     */
    alignment: StringProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface BreadcrumbBlockProps extends ComponentProps<BreadcrumbBlockData> {}
