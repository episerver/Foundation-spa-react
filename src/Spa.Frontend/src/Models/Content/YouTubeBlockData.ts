import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'Episerver/Property'
import IContent from 'Episerver/Models/IContent'
import ContentLink from 'Episerver/Models/ContentLink'
import { ComponentProps } from 'Episerver/EpiComponent'

/**
 * YouTube Block
 *
 * Display YouTube video
 *
 * @GUID 67429e0d-9365-407c-8a49-69489382bbdc
 */
export default interface YouTubeBlockData extends IContent {
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
     * YouTube link
     *
     * URL link to YouTube video
     */
    youTubeLink: StringProperty

    /**
     * Heading
     *
     * No description available
     */
    heading: StringProperty

    /**
     * Main body
     *
     * Descriptive text for the video
     */
    mainBody: StringProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface YouTubeBlockProps extends ComponentProps<YouTubeBlockData> {}
