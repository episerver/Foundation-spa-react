import Property, {StringProperty, NumberProperty, BooleanProperty, ContentReferenceProperty, ContentAreaProperty, LinkListProperty, LinkProperty} from '@episerver/spa-core/Property'
import IContent, { BaseIContent } from '@episerver/spa-core/Models/IContent'
import ContentLink from '@episerver/spa-core/Models/ContentLink'
import { ComponentProps } from '@episerver/spa-core/EpiComponent'

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

export class BlogCommentBlockType extends BaseIContent<BlogCommentBlockData> implements BlogCommentBlockData {
    protected _typeName : string = "BlogCommentBlock";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'paddingTop': 'Number',
        'paddingRight': 'Number',
        'paddingBottom': 'Number',
        'paddingLeft': 'Number',
        'commentsPerPage': 'Number',
    }

    /**
     * Padding top
     *
     * No description available
     */
    public paddingTop: NumberProperty;

    /**
     * Padding right
     *
     * No description available
     */
    public paddingRight: NumberProperty;

    /**
     * Padding bottom
     *
     * No description available
     */
    public paddingBottom: NumberProperty;

    /**
     * Padding left
     *
     * No description available
     */
    public paddingLeft: NumberProperty;

    /**
     * Comments per page
     *
     * Number of comments per page
     */
    public commentsPerPage: NumberProperty;

}
