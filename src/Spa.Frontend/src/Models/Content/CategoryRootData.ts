import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * CategoryRoot
 *
 * No Description available.
 *
 * @GUID c29bf090-05bf-43eb-98d6-91575bce4441
 */
export default interface CategoryRootData extends Taxonomy.IContent {
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

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface CategoryRootProps extends ComponentTypes.AbstractComponentProps<CategoryRootData> {}

export class CategoryRootType extends Taxonomy.AbstractIContent<CategoryRootData> implements CategoryRootData {
    protected _typeName : string = "CategoryRoot";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'description': 'LongString',
        'isSelectable': 'Boolean',
    }

    /**
     * Description
     *
     * No description available
     */
    public get description() : CategoryRootData["description"] { return this.getProperty("description"); }

    /**
     * IsSelectable
     *
     * No description available
     */
    public get isSelectable() : CategoryRootData["isSelectable"] { return this.getProperty("isSelectable"); }

}
