import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'Episerver/Property'
import IContent from 'Episerver/Models/IContent'
import ContentLink from 'Episerver/Models/ContentLink'
import { ComponentProps } from 'Episerver/EpiComponent'

/**
 * Button Block
 *
 * Used to insert a link which is styled as a button
 *
 * @GUID 426cf12f-1f01-4ea0-922f-0778314ddaf0
 */
export default interface ButtonBlockData extends IContent {
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
     * Label
     *
     * No description available
     */
    buttonText: StringProperty

    /**
     * Link
     *
     * No description available
     */
    buttonLink: StringProperty

    /**
     * Style
     *
     * No description available
     */
    buttonStyle: StringProperty

    /**
     * Reassuring caption
     *
     * No description available
     */
    buttonCaption: StringProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface ButtonBlockProps extends ComponentProps<ButtonBlockData> {}