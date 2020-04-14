import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from 'Episerver/Property'
import IContent from 'Episerver/Models/IContent'
import ContentLink from 'Episerver/Models/ContentLink'
import { ComponentProps } from 'Episerver/EpiComponent'

/**
 * Blog Comment Block
 *
 * Configures the frontend view properties of a blog comment block
 *
 * @GUID 656ff547-1c31-4fc1-99b9-93573d24de07
 */
export default interface BlogCommentBlockData extends IContent {
    /**
     * Padding top
     *
     * No description available
     */
    paddingTop: NumberProperty

    /**
     * Padding right
     *
     * No description available
     */
    paddingRight: NumberProperty

    /**
     * Padding bottom
     *
     * No description available
     */
    paddingBottom: NumberProperty

    /**
     * Padding left
     *
     * No description available
     */
    paddingLeft: NumberProperty

    /**
     * Comments per page
     *
     * Number of comments per page
     */
    commentsPerPage: NumberProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface BlogCommentBlockProps extends ComponentProps<BlogCommentBlockData> {}
