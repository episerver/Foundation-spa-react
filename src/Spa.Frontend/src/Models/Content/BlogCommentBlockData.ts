import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * Blog Comment Block
 *
 * Configures the frontend view properties of a blog comment block
 *
 * @GUID 656ff547-1c31-4fc1-99b9-93573d24de07
 */
export default interface BlogCommentBlockData extends Taxonomy.IContent {
    /**
     * Padding top
     *
     * No description available
     */
    paddingTop: ContentDelivery.NumberProperty

    /**
     * Padding right
     *
     * No description available
     */
    paddingRight: ContentDelivery.NumberProperty

    /**
     * Padding bottom
     *
     * No description available
     */
    paddingBottom: ContentDelivery.NumberProperty

    /**
     * Padding left
     *
     * No description available
     */
    paddingLeft: ContentDelivery.NumberProperty

    /**
     * Comments per page
     *
     * Number of comments per page
     */
    commentsPerPage: ContentDelivery.NumberProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface BlogCommentBlockProps extends ComponentTypes.AbstractComponentProps<BlogCommentBlockData> {}

export class BlogCommentBlockType extends Taxonomy.AbstractIContent<BlogCommentBlockData> implements BlogCommentBlockData {
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
    public get paddingTop() : BlogCommentBlockData["paddingTop"] { return this.getProperty("paddingTop"); }

    /**
     * Padding right
     *
     * No description available
     */
    public get paddingRight() : BlogCommentBlockData["paddingRight"] { return this.getProperty("paddingRight"); }

    /**
     * Padding bottom
     *
     * No description available
     */
    public get paddingBottom() : BlogCommentBlockData["paddingBottom"] { return this.getProperty("paddingBottom"); }

    /**
     * Padding left
     *
     * No description available
     */
    public get paddingLeft() : BlogCommentBlockData["paddingLeft"] { return this.getProperty("paddingLeft"); }

    /**
     * Comments per page
     *
     * Number of comments per page
     */
    public get commentsPerPage() : BlogCommentBlockData["commentsPerPage"] { return this.getProperty("commentsPerPage"); }

}
