import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * Linkedin Feed Block
 *
 * Display content from a Linkedin feed
 *
 * @GUID 419db9dd-44bc-4540-b446-fcb5f6d588fa
 */
export default interface LinkedInCompanyBlockData extends Taxonomy.IContent {
    /**
     * Categories
     *
     * Categories associated with this content
     */
    categories: ContentDelivery.ContentReferenceListProperty

    /**
     * Padding
     *
     * No description available
     */
    padding: ContentDelivery.StringProperty

    /**
     * Margin
     *
     * No description available
     */
    margin: ContentDelivery.StringProperty

    /**
     * Background color
     *
     * No description available
     */
    backgroundColor: ContentDelivery.StringProperty

    /**
     * Block opacity (0 to 1)
     *
     * No description available
     */
    blockOpacity: ContentDelivery.NumberProperty

    /**
     * Account name
     *
     * No description available
     */
    accountName: ContentDelivery.StringProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface LinkedInCompanyBlockProps extends ComponentTypes.AbstractComponentProps<LinkedInCompanyBlockData> {}

export class LinkedInCompanyBlockType extends Taxonomy.AbstractIContent<LinkedInCompanyBlockData> implements LinkedInCompanyBlockData {
    protected _typeName : string = "LinkedInCompanyBlock";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'categories': 'ContentReferenceList',
        'padding': 'LongString',
        'margin': 'LongString',
        'backgroundColor': 'LongString',
        'blockOpacity': 'FloatNumber',
        'accountName': 'LongString',
    }

    /**
     * Categories
     *
     * Categories associated with this content
     */
    public get categories() : LinkedInCompanyBlockData["categories"] { return this.getProperty("categories"); }

    /**
     * Padding
     *
     * No description available
     */
    public get padding() : LinkedInCompanyBlockData["padding"] { return this.getProperty("padding"); }

    /**
     * Margin
     *
     * No description available
     */
    public get margin() : LinkedInCompanyBlockData["margin"] { return this.getProperty("margin"); }

    /**
     * Background color
     *
     * No description available
     */
    public get backgroundColor() : LinkedInCompanyBlockData["backgroundColor"] { return this.getProperty("backgroundColor"); }

    /**
     * Block opacity (0 to 1)
     *
     * No description available
     */
    public get blockOpacity() : LinkedInCompanyBlockData["blockOpacity"] { return this.getProperty("blockOpacity"); }

    /**
     * Account name
     *
     * No description available
     */
    public get accountName() : LinkedInCompanyBlockData["accountName"] { return this.getProperty("accountName"); }

}
