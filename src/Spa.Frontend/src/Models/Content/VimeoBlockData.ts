import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'Episerver/Property'
import IContent from 'Episerver/Models/IContent'
import ContentLink from 'Episerver/Models/ContentLink'
import { ComponentProps } from 'Episerver/EpiComponent'

/**
 * Vimeo Video
 *
 * Display Vimeo video
 *
 * @GUID a8172c33-e087-4e68-980e-a79b0e093675
 */
export default interface VimeoBlockData extends IContent {
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
     * Vimeo link
     *
     * URL link to Vimeo video
     */
    vimeoVideoLink: StringProperty

    /**
     * Cover image
     *
     * No description available
     */
    coverImage: ContentReferenceProperty

    /**
     * Heading
     *
     * No description available
     */
    heading: StringProperty

    /**
     * MainBody
     *
     * Descriptive text for the video
     */
    mainBody: StringProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface VimeoBlockProps extends ComponentProps<VimeoBlockData> {}
