import { ContentDelivery, Taxonomy, ComponentTypes } from '@episerver/spa-core'
/**
 * Exists Filter Block
 *
 * Filter product that has a value for the given field
 *
 * @GUID e93c9a50-4b62-4116-8e56-1df84ab93ef7
 */
export default interface ExistsFilterBlockData extends Taxonomy.IContent {
    /**
     * Name
     *
     * Name of field in index
     */
    fieldName: ContentDelivery.StringProperty

}

/**
 * Convenience interface for componentDidUpdate & componentDidMount methods.
 */
export interface ExistsFilterBlockProps extends ComponentTypes.AbstractComponentProps<ExistsFilterBlockData> {}

export class ExistsFilterBlockType extends Taxonomy.AbstractIContent<ExistsFilterBlockData> implements ExistsFilterBlockData {
    protected _typeName : string = "ExistsFilterBlock";
    /**
     * Map of all property types within this content type.
     */
    protected _propertyMap : { [propName: string]: string } = {
        'fieldName': 'LongString',
    }

    /**
     * Name
     *
     * Name of field in index
     */
    public get fieldName() : ExistsFilterBlockData["fieldName"] { return this.getProperty("fieldName"); }

}
