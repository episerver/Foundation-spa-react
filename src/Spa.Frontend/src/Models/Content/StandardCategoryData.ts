import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * Standard Category
 *
 * Used to categorize content
 *
 * @GUID a9bbd7fc-27c5-4718-890a-e28acbe5ee26
 */
export default interface StandardCategoryData extends Taxonomy.IContent {
    /**
     * Description
     *
     * No description available
     */
    description: ContentDelivery.StringProperty

    /**
     * IsSelectable
     *
     * No description available
     */
    isSelectable: ContentDelivery.BooleanProperty

    /**
     * Hide site header
     *
     * No description available
     */
    hideSiteHeader: ContentDelivery.BooleanProperty

    /**
     * Hide site footer
     *
     * No description available
     */
    hideSiteFooter: ContentDelivery.BooleanProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface StandardCategoryProps extends ComponentTypes.AbstractComponentProps<StandardCategoryData> {}

export class StandardCategoryType extends Taxonomy.AbstractIContent<StandardCategoryData> implements StandardCategoryData {
    protected _typeName : string = "StandardCategory";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'description': 'LongString',
        'isSelectable': 'Boolean',
        'hideSiteHeader': 'Boolean',
        'hideSiteFooter': 'Boolean',
    }

    /**
     * Description
     *
     * No description available
     */
    public get description() : StandardCategoryData["description"] { return this.getProperty("description"); }

    /**
     * IsSelectable
     *
     * No description available
     */
    public get isSelectable() : StandardCategoryData["isSelectable"] { return this.getProperty("isSelectable"); }

    /**
     * Hide site header
     *
     * No description available
     */
    public get hideSiteHeader() : StandardCategoryData["hideSiteHeader"] { return this.getProperty("hideSiteHeader"); }

    /**
     * Hide site footer
     *
     * No description available
     */
    public get hideSiteFooter() : StandardCategoryData["hideSiteFooter"] { return this.getProperty("hideSiteFooter"); }

}
